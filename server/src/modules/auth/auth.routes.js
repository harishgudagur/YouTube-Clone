const express =
  require(
    "express"
  );

const router =
  express.Router();

const {
  signup,
  login,
  oauthLogin,
  profile,
} = require(
  "./auth.controller"
);

const protect =
  require(
    "../../middlewares/auth.middleware"
  );

// ====================
// PUBLIC ROUTES
// ====================

// Signup
router.post(
  "/signup",
  signup
);

// Login
router.post(
  "/login",
  login
);

// Google / GitHub OAuth
router.post(
  "/oauth",
  oauthLogin
);

// ====================
// PROTECTED ROUTES
// ====================

// Get current user
router.get(
  "/profile",
  protect,
  profile
);

module.exports =
  router;