const express =
  require("express");

const router =
  express.Router();

const upload =
  require(
    "../../middlewares/upload.middleware"
  );

const {
  uploadVideo,
  getAllVideos,
  getVideoById,
  likeVideo,
  deleteVideo,
  searchVideos,
  getMyVideos,
  getRelatedVideos,
  getLikedVideos,
  toggleWatchLater,
  getWatchLater,
} = require(
  "./video.controller"
);

const authMiddleware =
  require(
    "../../middlewares/auth.middleware"
  );

// Use uploadVideos for the video upload route
router.post(
  "/upload",
  authMiddleware,
  uploadVideos.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  uploadVideo
);


// Get all videos
router.get(
  "/",
  getAllVideos
);

// Search videos
router.get(
  "/search",
  searchVideos
);

// Related videos
router.get(
  "/related/:id",
  getRelatedVideos
);

// My videos
router.get(
  "/my-videos",
  authMiddleware,
  getMyVideos
);

// Liked videos
router.get(
  "/liked",
  authMiddleware,
  getLikedVideos
);

// Watch later
router.get(
  "/watch-later",
  authMiddleware,
  getWatchLater
);

router.put(
  "/watch-later/:id",
  authMiddleware,
  toggleWatchLater
);

// Like / Unlike
router.put(
  "/like/:id",
  authMiddleware,
  likeVideo
);

// Delete
router.delete(
  "/:id",
  authMiddleware,
  deleteVideo
);

// Get video by ID
router.get(
  "/:id",
  getVideoById
);

module.exports =
  router;