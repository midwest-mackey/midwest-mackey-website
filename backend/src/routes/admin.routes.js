import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/roles.middleware.js";
import { getDb } from "../db/database.js";
import bcrypt from "bcrypt";

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

router.post("/admins", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const db = getDb();

    // check existing user
    const existing = await db.get(
      "SELECT id FROM users WHERE email = ?",
      [email.trim()]
    );

    if (existing) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await db.run(
      `
      INSERT INTO users (email, password_hash, role, createdAt)
      VALUES (?, ?, 'admin', datetime('now'))
      `,
      [email.trim(), hashed]
    );

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/admins/:id", requireAuth, requireAdmin, async (req, res) => {
  const db = getDb();

  const adminId = Number(req.params.id);
  const requesterId = req.user.sub;

  // 🚫 block default root admin
  if (adminId === 1) {
    return res.status(400).json({ error: "Cannot delete root admin" });
  }

  // 🚫 prevent self-delete
  if (adminId === requesterId) {
    return res.status(400).json({ error: "You cannot delete yourself" });
  }

  // 🚫 prevent deleting last admin
  const count = await db.get(
    "SELECT COUNT(*) as total FROM users WHERE role = 'admin'"
  );

  if (count.total <= 1) {
    return res.status(400).json({ error: "Cannot delete last admin" });
  }

  await db.run("DELETE FROM users WHERE id = ?", [adminId]);

  return res.json({ success: true });
});

export default router;