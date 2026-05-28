import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/roles.middleware.js";
import { getDb } from "../db/database.js";

const router = express.Router();

router.get("/admins", requireAuth, requireAdmin, async (req, res) => {
  try {
    const db = getDb();

    const admins = await db.all(`
      SELECT id, email, role, createdAt
      FROM users
      WHERE role = 'admin'
      ORDER BY createdAt DESC
    `);

    res.json({ admins });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;