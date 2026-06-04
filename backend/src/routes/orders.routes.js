import express from "express";
import fs from "fs";

import {
  createOrder,
  getOrdersByDevice,
  getOrderById,
  cancelOrder
} from "../db/orders.repo.js";

import { emitEvent } from "../services/events.service.js";

const router = express.Router();

const SETTINGS_PATH = "/app/config/settings.json";

function loadSettings() {
  try {
    if (fs.existsSync(SETTINGS_PATH)) {
      const raw = fs.readFileSync(SETTINGS_PATH, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("❌ Failed to load settings.json", err);
  }

  return {
    eggsAvailable: true,
    unitEggPrice: 5
  };
}

// 💰 PUBLIC SETTINGS
router.get("/settings", (req, res) => {
  res.json(loadSettings());
});

// 🥚 CREATE ORDER (CUSTOMER)
router.post("/all", async (req, res) => {
  try {
    const {
      name,
      phoneNumber,
      paymentType,
      pickupDate,
      dozenCount,
      eggCondition,
      orderNotes,
      deviceId
    } = req.body;

    if (
      !name ||
      !phoneNumber ||
      !paymentType ||
      !pickupDate ||
      !dozenCount ||
      !eggCondition ||
      !deviceId
    ) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const unitEggPrice = loadSettings().unitEggPrice ?? 5;

    const order = {
      name,
      phoneNumber,
      paymentType,
      pickupDate,
      dozenCount,
      eggCondition: eggCondition ?? "washed",
      orderNotes,
      deviceId,
      unitPrice: unitEggPrice,
      totalPrice: dozenCount * unitEggPrice,
      status: "requested",
      createdAt: new Date().toISOString()
    };

    const savedOrder = await createOrder(order);

    // Respond immediately
    res.json({
      success: true,
      totalPrice: order.totalPrice,
      orderId: savedOrder.id
    });

    // Fire-and-forget notifications
    emitEvent("order_created", {
      orderId: savedOrder.id,
      name: savedOrder.name,
      dozenCount: savedOrder.dozenCount
    }).catch((err) => {
      console.error("❌ emitEvent failed:", err);
    });

  } catch (err) {
    console.error("❌ CREATE ORDER FAILED:", err);

    return res.status(500).json({
      error: "Internal server error"
    });
  }
});

// 🥚 CANCEL ORDER (CUSTOMER)
router.post("/cancel/:id", async (req, res) => {
  try {
    const { deviceId } = req.body;

    const order = await getOrderById(req.params.id);

    if (!order) {
      return res.status(404).json({
        error: "Order not found"
      });
    }

    if (!deviceId || order.deviceId !== deviceId) {
      return res.status(403).json({
        error: "Not allowed"
      });
    }

    if (
      order.status === "completed" ||
      order.status === "cancelled"
    ) {
      return res.status(400).json({
        error: "Order cannot be cancelled"
      });
    }

    await cancelOrder(order.id);

    // Respond immediately
    res.json({
      success: true
    });

    // Fire-and-forget notifications
    emitEvent("order_cancelled", {
      orderId: order.id,
      name: order.name
    }).catch((err) => {
      console.error("❌ emitEvent failed:", err);
    });

  } catch (err) {
    console.error("❌ CANCEL ORDER FAILED:", err);

    return res.status(500).json({
      error: "Internal server error"
    });
  }
});

// 📱 DEVICE HISTORY (CUSTOMER)
router.get("/history", async (req, res) => {
  try {
    const { deviceId } = req.query;

    if (!deviceId) {
      return res.status(400).json({
        error: "Missing deviceId"
      });
    }

    const orders = await getOrdersByDevice(deviceId);

    res.json(orders);

  } catch (err) {
    console.error("❌ ORDER HISTORY FAILED:", err);

    return res.status(500).json({
      error: "Internal server error"
    });
  }
});

// 🔁 REORDER (CUSTOMER)
router.post("/reorder/:id", async (req, res) => {
  try {
    const original = await getOrderById(req.params.id);

    if (!original) {
      return res.status(404).json({
        error: "Order not found"
      });
    }

    const savedOrder = await createOrder({
      ...original,
      status: "requested",
      createdAt: new Date().toISOString()
    });

    res.json({
      success: true,
      orderId: savedOrder.id
    });

    // Treat reorder like a brand new order
    emitEvent("order_created", {
      orderId: savedOrder.id,
      name: savedOrder.name,
      dozenCount: savedOrder.dozenCount
    }).catch((err) => {
      console.error("❌ emitEvent failed:", err);
    });

  } catch (err) {
    console.error("❌ REORDER FAILED:", err);

    return res.status(500).json({
      error: "Internal server error"
    });
  }
});

export default router;