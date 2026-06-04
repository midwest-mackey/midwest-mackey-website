import express from "express";
import { getDb } from "../db/database.js";

import {
  getOrderById,
  getOrdersByDevice,
  createOrder
} from "../db/orders.repo.js";

import { requireAuth } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/roles.middleware.js";

const router = express.Router();

// 🔐 ALL ADMIN ROUTES PROTECTED
router.use(requireAuth);
router.use(requireAdmin);

// 📦 GET ALL ORDERS (ADMIN DASHBOARD)
router.get("/all", async (req, res) => {
  const db = getDb();

  const orders = await db.all(
    `SELECT * FROM egg_orders ORDER BY id DESC`
  );

  res.json(orders);
});


// 🔁 UPDATE ORDER (STATUS / QUANTITY)
router.patch("/:id/update", async (req, res) => {
  const db = getDb();

  const { id } = req.params;
  const { status, dozenCount } = req.body;

  const allowedStatuses = [
    "requested",
    "approved",
    "modified",
    "ready",
    "completed",
    "cancelled"
  ];

  const existing = await getOrderById(id);

  if (!existing) {
    return res.status(404).json({ error: "Order not found" });
  }

  const newStatus =
    status !== undefined ? status : existing.status;

  const newDozenCount =
    dozenCount !== undefined ? dozenCount : existing.dozenCount;

  if (status && !allowedStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  if (newDozenCount < 1 || isNaN(newDozenCount)) {
    return res.status(400).json({ error: "Invalid dozenCount" });
  }

  const totalPrice = existing.unitPrice * newDozenCount;

  await db.run(
    `
    UPDATE egg_orders
    SET status = ?,
        dozenCount = ?,
        totalPrice = ?
    WHERE id = ?
    `,
    [newStatus, newDozenCount, totalPrice, id]
  );

  res.json({
    success: true,
    updated: {
      status: newStatus,
      dozenCount: newDozenCount,
      totalPrice
    }
  });
});

// 📩 MARK NOTIFIED (ADMIN INTERNAL TRACKING)
router.patch("/:id/notified", async (req, res) => {
  const db = getDb();

  const { id } = req.params;
  const { status } = req.body;

  const column = `${status}NotifiedAt`;

  await db.run(
    `
    UPDATE egg_orders
    SET ${column} = ?
    WHERE id = ?
    `,
    [new Date().toISOString(), id]
  );

  res.json({ success: true });
});

// 🔁 FORCE RECREATE ORDER (ADMIN TOOL)
router.post("/recreate/:id", async (req, res) => {
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

// 📱 OPTIONAL: GET ORDERS BY DEVICE (ADMIN VIEW)
router.get("/device/:deviceId", async (req, res) => {
  const db = getDb();

  const orders = await db.all(
    `
    SELECT * FROM egg_orders
    WHERE deviceId = ?
    ORDER BY id DESC
    `,
    [req.params.deviceId]
  );

  res.json(orders);
});

export default router;