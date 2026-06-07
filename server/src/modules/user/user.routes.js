const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require(
    "../../middlewares/auth.middleware"
  );

const upload =
  require(
    "../../middlewares/upload.middleware"
  );

const {
  updateProfile,
  subscribeChannel,
  getChannel,
  getSubscriptionsFeed,
} = require(
  "./user.controller"
);

// Subscribe / Unsubscribe
router.put(
  "/subscribe/:id",
  authMiddleware,
  subscribeChannel
);

// Get subscription feed
router.get(
  "/subscriptions",
  authMiddleware,
  getSubscriptionsFeed
);

// Update Profile
router.put(
  "/update-profile",
  authMiddleware,
  upload.single(
    "profilePic"
  ),
  updateProfile
);

// Get Channel
router.get(
  "/channel/:id",
  getChannel
);

module.exports =
  router;