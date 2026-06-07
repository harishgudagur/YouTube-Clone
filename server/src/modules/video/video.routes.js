const express = require("express");

const router = express.Router();

const protect = require("../../middlewares/auth.middleware");

const upload = require("../../middlewares/upload.middleware");

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
} = require("./video.controller");

// Upload Video
router.post(
  "/upload",
  protect,
  upload.fields([
    {
      name: "video",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  uploadVideo
);

// Get all videos
router.get("/", getAllVideos);

// Get my videos
router.get(
  "/my-videos",
  protect,
  getMyVideos
);

// Search
router.get(
  "/search",
  searchVideos
);

// Liked videos
router.get(
  "/liked",
  protect,
  getLikedVideos
);

// Watch later
router.get(
  "/watch-later",
  protect,
  getWatchLater
);

router.put(
  "/watch-later/:id",
  protect,
  toggleWatchLater
);

// Related videos
router.get(
  "/related/:id",
  getRelatedVideos
);

// Single video
router.get(
  "/:id",
  getVideoById
);

// Like video
router.put(
  "/like/:id",
  protect,
  likeVideo
);

// Delete video
router.delete(
  "/:id",
  protect,
  deleteVideo
);

module.exports = router;