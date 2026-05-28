import express from "express";
import fs from "fs";

import {
  createOrder,
  getOrdersByDevice,
  getOrderById
} from "../db/orders.repo.js";

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

// =====================================================
// 💰 PUBLIC SETTINGS
// =====================================================

router.get("/settings", (req, res) => {
  res.json(loadSettings());
});

// =====================================================
// 🥚 CREATE ORDER (CUSTOMER)
// =====================================================
router.post("/all", async (req, res) => {
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

  if (!name || !phoneNumber || !paymentType || !pickupDate || !dozenCount || !eggCondition || !deviceId) {
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

  await createOrder(order);

  res.json({
    success: true,
    totalPrice: order.totalPrice
  });
});

// =====================================================
// 📱 DEVICE HISTORY (CUSTOMER)
// =====================================================
router.get("/history", async (req, res) => {
  const { deviceId } = req.query;

  if (!deviceId) {
    return res.status(400).json({ error: "Missing deviceId" });
  }

  const orders = await getOrdersByDevice(deviceId);
  res.json(orders);
});

// =====================================================
// 🔁 REORDER (CUSTOMER)
// =====================================================
router.post("/reorder/:id", async (req, res) => {
  const original = await getOrderById(req.params.id);

  if (!original) {
    return res.status(404).json({ error: "Order not found" });
  }

  await createOrder({
    ...original,
    status: "requested",
    createdAt: new Date().toISOString()
  });

  res.json({ success: true });
});

export default router;