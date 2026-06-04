const express = require("express");

const router = express.Router();

const {
  sendEmailOTP,
  sendPhoneOTP,
  verifyOTP,
  signup,
  login,
  forgotPassword,
  resetPassword,
  refreshToken,
  logout,
  getCurrentUser,
} = require("./auth.controller");

const protect = require("../../middlewares/auth.middleware");

// Public Routes

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Protected Routes
router.get("/me", protect, getCurrentUser);

module.exports = router;