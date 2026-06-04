const express =
  require(
    "express"
  );

const router =
  express.Router();

const {
  signup,
  login,
  profile,
  oauthLogin,
} = require(
  "./auth.controller"
);

const authMiddleware =
  require(
    "../../middlewares/auth.middleware"
  );

// Public Routes
router.post(
  "/signup",
  signup
);

router.post(
  "/login",
  login
);

router.post(
  "/oauth-login",
  oauthLogin
);

// Protected Route
router.get(
  "/profile",
  authMiddleware,
  profile
);

module.exports =
  router;