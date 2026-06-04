import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { getDb } from "../db/database.js";

const router = express.Router();

// GET CURRENT USER INFO (HYDRATED)
router.get("/me", requireAuth, async (req, res) => {
  const db = getDb();

  const user = await db.get(
    `
    SELECT id, email, role, smsEnabled, smsPhoneNumber
    FROM users
    WHERE id = ?
    `,
    [req.user.sub]
  );

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({ user });
});

export default router;