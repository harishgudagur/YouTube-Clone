const express = require("express");

const router = express.Router();

const {
  signup,
  login,
  profile,
  sendOtp,
  verifyOtp,
  forgotPassword,
  resetPassword,
  oauthLogin,
} = require("./auth.controller");

const protect = require("../../middlewares/auth.middleware");

router.post("/signup", signup);
router.post("/login", login);
router.post("/otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post(
  "/forgot-password",
  forgotPassword
);

router.post(
  "/reset-password/:token",
  resetPassword
);

router.post(
  "/oauth",
  oauthLogin
);

// Protected Route
router.get("/profile", protect, profile);

module.exports = router;