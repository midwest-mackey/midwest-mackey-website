import express from "express";
import { loginUser } from "../services/auth.service.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import bcrypt from "bcrypt";
import { findUserById, findUserByEmail, updateUserAccount } from "../db/users.repo.js";
import { getDb } from "../db/database.js";


const router = express.Router();

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await loginUser(email, password);

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    if (err.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

// GET CURRENT USER
router.get("/me", requireAuth, (req, res) => {
  res.json({
    user: req.user
  });
});

// LOGOUT
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.json({ success: true });
});

// =====================================================
// 🧱 PLACEHOLDER: CUSTOMER REGISTRATION
// =====================================================

router.post("/register", async (req, res) => {
  return res.status(501).json({
    success: false,
    error: "Not implemented yet",
    message: "Customer registration will be enabled later"
  });
});


// =====================================================
// 🧱 PLACEHOLDER: ADMIN REGISTRATION (DISABLED)
// =====================================================
router.post("/register-admin", async (req, res) => {
  return res.status(403).json({
    error: "Disabled",
    message: "Admin creation is restricted to server scripts only"
  });
});

// UPDATE ADMIN ACCOUNT
router.put("/account", requireAuth, async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    const db = getDb();

    const user = await db.get(
      "SELECT * FROM users WHERE id = ?",
      [req.user.sub]
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isValid = await bcrypt.compare(
      currentPassword,
      user.password_hash
    );

    if (!isValid) {
      return res.status(400).json({
        error: "Current password is incorrect"
      });
    }

    let finalPassword = user.password_hash;

    if (newPassword?.trim()) {
      finalPassword = await bcrypt.hash(newPassword, 10);
    }

    await db.run(
      `
      UPDATE users
      SET email = ?,
          password_hash = ?
      WHERE id = ?
      `,
      [email.trim(), finalPassword, req.user.sub]
    );

    res.json({
      success: true,
      message: "Admin account updated"
    });

  } catch (err) {
    console.error("Account update error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;