import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/roles.middleware.js";
import { getDb } from "../db/database.js";
import bcrypt from "bcrypt";
import fs from "fs";

const router = express.Router();
const SETTINGS_PATH = "/app/config/settings.json";

function loadSettings() {
  try {
    if (fs.existsSync(SETTINGS_PATH)) {
      const raw = fs.readFileSync(
        SETTINGS_PATH,
        "utf-8"
      );

      return JSON.parse(raw);
    }
  } catch (err) {
    console.error(
      "❌ Failed to load settings.json",
      err
    );
  }

  return {
    eggsAvailable: true,
    unitEggPrice: 5
  };
}

function saveSettings(settings) {
  try {
    fs.writeFileSync(
      SETTINGS_PATH,
      JSON.stringify(settings, null, 2),
      "utf-8"
    );

    console.log("✅ Settings saved");
  } catch (err) {
    console.error(
      "❌ Failed to save settings.json",
      err
    );
  }
}

// 🔐 ALL ADMIN ROUTES PROTECTED
// GET ALL ADMINS
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

// CREATE NEW ADMIN
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

// DELETE ADMIN
router.delete("/admins/:id", requireAuth, requireAdmin, async (req, res) => {
  const db = getDb();

  const adminId = Number(req.params.id);
  const requesterId = req.user.sub;

  // 🚫 block root/system admin
  if (adminId === 1) {
    return res.status(400).json({
      error: "Cannot delete system admin"
    });
  }

  // 🚫 prevent self-delete
  if (adminId === requesterId) {
    return res.status(400).json({
      error: "You cannot delete yourself"
    });
  }

  // 🚫 ensure target is actually an admin
  const target = await db.get(
    "SELECT id FROM users WHERE id = ? AND role = 'admin'",
    [adminId]
  );

  if (!target) {
    return res.status(404).json({
      error: "Admin not found"
    });
  }

  await db.run(
    "DELETE FROM users WHERE id = ?",
    [adminId]
  );

  return res.json({ success: true });
});

// GET SETTINGS
router.get("/settings", requireAuth, requireAdmin, (req, res) => {
  const current = loadSettings();
  res.json(current);
});

// UPDATE SETTINGS
router.patch("/settings", requireAuth, requireAdmin, (req, res) => {
  const current = loadSettings();

  const updated = {
    ...current,
    eggsAvailable:
      typeof req.body.eggsAvailable === "boolean"
        ? req.body.eggsAvailable
        : current.eggsAvailable,

    unitEggPrice:
      req.body.unitEggPrice !== undefined &&
      !isNaN(Number(req.body.unitEggPrice))
        ? Number(req.body.unitEggPrice)
        : current.unitEggPrice
  };

  saveSettings(updated);

  res.json({
    success: true,
    settings: updated
  });
});

export default router;