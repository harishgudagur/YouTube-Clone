const express =
  require("express");

const router =
  express.Router();

const {
  signup,
  login,
  logout,
  getCurrentUser,
  googleAuth,
  githubAuth,
} = require(
  "./auth.controller"
);

const protect =
  require(
    "../../middlewares/auth.middleware"
  );

// Normal auth
router.post(
  "/signup",
  signup
);

router.post(
  "/login",
  login
);

router.post(
  "/logout",
  logout
);

// OAuth routes
router.post(
  "/google",
  googleAuth
);

router.post(
  "/github",
  githubAuth
);

// Current user
router.get(
  "/me",
  protect,
  getCurrentUser
);

module.exports =
  router;