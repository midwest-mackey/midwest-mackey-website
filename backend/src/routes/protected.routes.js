import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/settings", (req, res) => {
  res.json({
    userId: req.user.sub,
    settings: {}
  });
});

router.get("/me", (req, res) => {
  res.json({
    user: req.user
  });
});

export default router;