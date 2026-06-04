import express from "express";
import { getDb } from "../db/database.js";

import { requireAuth } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/roles.middleware.js";

const router = express.Router();

// GET VAPID PUBLIC KEY
router.get("/public-key", async (req, res) => {
  try {
    const db = getDb();

    const settings = await db.get(`
      SELECT vapidPublicKey
      FROM settings
      LIMIT 1
    `);

    return res.json({
      publicKey: settings?.vapidPublicKey
    });

  } catch (err) {
    console.error("❌ Failed to get VAPID key:", err);

    return res.status(500).json({
      error: "Failed to load public key"
    });
  }
});

// SUBSCRIBE
router.post("/subscribe", requireAuth, requireAdmin, async (req, res) => {
  try {
    const db = getDb();

    const { endpoint, keys } = req.body.subscription;

    await db.run(
      `
      INSERT OR IGNORE INTO push_subscriptions
      (userId, endpoint, p256dh, auth, enabled, createdAt)
      VALUES (?, ?, ?, ?, 1, ?)
      `,
      [
        req.user.sub,
        endpoint,
        keys.p256dh,
        keys.auth,
        new Date().toISOString()
      ]
    );

    return res.json({
      success: true
    });

  } catch (err) {
    console.error("❌ Push subscription failed:", err);

    return res.status(500).json({
      error: "Subscription failed"
    });
  }
});

// UNSUBSCRIBE ONE DEVICE
router.post("/unsubscribe", requireAuth, requireAdmin, async (req, res) => {
  const db = getDb();
  const { endpoint } = req.body;

  await db.run(
    `
    UPDATE push_subscriptions
    SET enabled = 0
    WHERE userId = ? AND endpoint = ?
    `,
    [req.user.sub, endpoint]
  );

  res.json({ success: true });
});

// UNSUBSCRIBE ALL DEVICES
router.post("/unsubscribe-all", requireAuth, requireAdmin, async (req, res) => {
  const db = getDb();

  await db.run(
    `
    UPDATE push_subscriptions
    SET enabled = 0
    WHERE userId = ?
    `,
    [req.user.sub]
  );

  res.json({ success: true });
});

// PUSH STATUS
router.get("/status", requireAuth, requireAdmin, async (req, res) => {
  const db = getDb();

  const subscription = await db.get(
    `
    SELECT COUNT(*) as count
    FROM push_subscriptions
    WHERE userId = ?
      AND enabled = 1
    `,
    [req.user.sub]
  );

  res.json({
    enabled: subscription.count > 0
  });
});

// TOGGLE DEVICE
router.post("/toggle", requireAuth, requireAdmin, async (req, res) => {
  const db = getDb();

  const { endpoint, enabled } = req.body;

  await db.run(
    `
    UPDATE push_subscriptions
    SET enabled = ?
    WHERE userId = ?
      AND endpoint = ?
    `,
    [enabled ? 1 : 0, req.user.sub, endpoint]
  );

  res.json({ success: true });
});

export default router;