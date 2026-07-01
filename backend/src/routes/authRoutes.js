import express from "express";

import {
  register,
  login,
  session,
  logout,
  changePassword,
} from "../controllers/authController.js";
import { protect, protectAdmin } from "../middleware/auth.js";

const router = express.Router();

// Public Routes
router.post("/register", register);
router.post("/login", login);

// Protected Routes
router.get("/session", protect, session);
router.post("/change-password", protect, changePassword);
router.post("/logout", protect, logout);

// Admin Only Routes (Example)
router.get("/admin", protect, protectAdmin, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome Admin!",
    user: req.user,
  });
});

export default router;