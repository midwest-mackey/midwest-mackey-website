import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

// STOREFRONT SETTINGS
router.get("/settings", (req, res) => {
  res.json({
    userId: req.user.sub,
    settings: {}
  });
});

// GET CURRENT USER INFO
router.get("/me", (req, res) => {
  res.json({
    user: req.user
  });
});

export default router;