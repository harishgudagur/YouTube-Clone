const Video =
  require("./video.model");

// Upload Video
const uploadVideo =
  async (
    req,
    res
  ) => {
    try {
      const {
        title,
        description,
        type,
        category,
      } = req.body;

      const videoFile =
        req.files
          ?.video?.[0];

      const thumbnailFile =
        req.files
          ?.thumbnail?.[0];

      if (
        !videoFile
      ) {
        return res
          .status(400)
          .json({
            message:
              "Video file required",
          });
      }

      const baseUrl =
        `${req.protocol}://${req.get(
          "host"
        )}`;

      const videoUrl =
        `${baseUrl}/uploads/${videoFile.filename}`;

      const thumbnail =
        thumbnailFile
          ? `${baseUrl}/uploads/${thumbnailFile.filename}`
          : "";

      const newVideo =
        await Video.create(
          {
            title,
            description,
            videoUrl,
            thumbnail,
            type:
              type ||
              "video",
            category:
              category ||
              "All",
            userId:
              req.user.id,
          }
        );

      res
        .status(201)
        .json(
          newVideo
        );
    } catch (
      error
    ) {
      console.log(
        error
      );

      res
        .status(500)
        .json({
          message:
            "Upload failed",
        });
    }
  };

// Get All Videos
const getAllVideos =
  async (
    req,
    res
  ) => {
    try {
      const {
        type,
        category,
      } = req.query;

      let filter = {};

      if (type) {
        filter.type =
          type;
      }

      if (
        category &&
        category !==
          "All"
      ) {
        filter.category =
          category;
      }

      const videos =
        await Video.find(
          filter
        )
          .populate(
            "userId",
            "fullName username email profilePic subscribers"
          )
          .sort({
            createdAt:
              -1,
          });

      return res
        .status(200)
        .json(videos);
    } catch (
      error
    ) {
      console.log(
        error
      );

      return res
        .status(500)
        .json({
          message:
            "Error fetching videos",
        });
    }
  };

// Get Video By ID + Increment Views
const getVideoById =
  async (
    req,
    res
  ) => {
    try {
      const video =
        await Video.findByIdAndUpdate(
          req.params.id,
          {
            $inc: {
              views: 1,
            },
          },
          {
            new: true,
          }
        ).populate(
          "userId",
          "fullName username profilePic subscribers"
        );

      if (
        !video
      ) {
        return res
          .status(404)
          .json({
            message:
              "Video not found",
          });
      }

      res.status(
        200
      ).json(video);
    } catch (
      error
    ) {
      console.log(
        error
      );

      res
        .status(500)
        .json({
          message:
            "Server Error",
        });
    }
  };

// Like Video

const likeVideo =
  async (
    req,
    res
  ) => {
    try {
      const video =
        await Video.findById(
          req.params.id
        );

      if (
        !video
      ) {
        return res
          .status(
            404
          )
          .json({
            message:
              "Video not found",
          });
      }

      const userId =
        req.user.id;

      const alreadyLiked =
        video.likes.some(
          (
            id
          ) =>
            id.toString() ===
            userId
        );

      if (
        alreadyLiked
      ) {
        // Unlike
        video.likes =
          video.likes.filter(
            (
              id
            ) =>
              id.toString() !==
              userId
          );
      } else {
        // Like once
        video.likes.push(
          userId
        );
      }

      await video.save();

      res.status(
        200
      ).json({
        likes:
          video.likes,
        liked:
          !alreadyLiked,
      });
    } catch (
      error
    ) {
      console.log(
        error
      );

      res.status(
        500
      ).json({
        message:
          "Server error",
      });
    }
  };



// Get Liked Videos
const getLikedVideos =
  async (
    req,
    res
  ) => {
    try {
      const videos =
        await Video.find(
          {
            likes:
              req.user.id,
          }
        ).populate(
          "userId",
          "username profilePic"
        );

      res.status(
        200
      ).json(
        videos
      );
    } catch (
      error
    ) {
      console.log(
        error
      );

      res
        .status(500)
        .json({
          message:
            "Server Error",
        });
    }
  };

// Watch Later Toggle
const toggleWatchLater =
  async (
    req,
    res
  ) => {
    try {
      const userId =
        req.user.id;

      const video =
        await Video.findById(
          req.params.id
        );

      if (
        !video
      ) {
        return res
          .status(404)
          .json({
            message:
              "Video not found",
          });
      }

      const exists =
        video.watchLater.includes(
          userId
        );

      if (
        exists
      ) {
        video.watchLater =
          video.watchLater.filter(
            (
              id
            ) =>
              id.toString() !==
              userId
          );
      } else {
        video.watchLater.push(
          userId
        );
      }

      await video.save();

      res.json({
        success:
          true,
      });
    } catch (
      error
    ) {
      console.log(
        error
      );

      res
        .status(500)
        .json({
          message:
            "Server Error",
        });
    }
  };

// Get Watch Later
const getWatchLater =
  async (
    req,
    res
  ) => {
    try {
      const videos =
        await Video.find(
          {
            watchLater:
              req.user.id,
          }
        ).populate(
          "userId",
          "username profilePic"
        );

      res.json(
        videos
      );
    } catch (
      error
    ) {
      console.log(
        error
      );

      res
        .status(500)
        .json({
          message:
            "Server Error",
        });
    }
  };

// Delete Video
const deleteVideo =
  async (
    req,
    res
  ) => {
    try {
      const video =
        await Video.findById(
          req.params.id
        );

      if (
        !video
      ) {
        return res
          .status(404)
          .json({
            message:
              "Video not found",
          });
      }

      if (
        video.userId.toString() !==
        req.user.id
      ) {
        return res
          .status(403)
          .json({
            message:
              "Unauthorized",
          });
      }

      await Video.findByIdAndDelete(
        req.params.id
      );

      res.status(
        200
      ).json({
        message:
          "Deleted successfully",
      });
    } catch (
      error
    ) {
      console.log(
        error
      );

      res
        .status(500)
        .json({
          message:
            "Delete failed",
        });
    }
  };

// Search Videos
const searchVideos =
  async (
    req,
    res
  ) => {
    try {
      const query =
        req.query.q;

      const videos =
        await Video.find({
          title: {
            $regex:
              query,
            $options:
              "i",
          },
          type:
            "video",
        })
          .populate(
            "userId",
            "username profilePic"
          )
          .sort({
            createdAt:
              -1,
          });

      res.status(
        200
      ).json(
        videos
      );
    } catch (
      error
    ) {
      console.log(
        error
      );

      res
        .status(500)
        .json({
          message:
            "Search failed",
        });
    }
  };

// My Videos
const getMyVideos =
  async (
    req,
    res
  ) => {
    try {
      const videos =
        await Video.find({
          userId:
            req.user.id,
        })
          .populate(
            "userId",
            "fullName username profilePic"
          )
          .sort({
            createdAt:
              -1,
          });

      res.status(
        200
      ).json(
        videos
      );
    } catch (
      error
    ) {
      console.log(
        error
      );

      res
        .status(500)
        .json({
          message:
            "Failed to fetch videos",
        });
    }
  };

// Related Videos
const getRelatedVideos =
  async (
    req,
    res
  ) => {
    try {
      const video =
        await Video.findById(
          req.params.id
        );

      // video deleted or not found
      if (
        !video
      ) {
        return res
          .status(404)
          .json({
            message:
              "Video not found",
          });
      }

      const relatedVideos =
        await Video.find({
          category:
            video.category,

          _id: {
            $ne:
              video._id,
          },
        })
          .populate(
            "userId",
            "fullName username profilePic"
          )
          .limit(10);

      res
        .status(200)
        .json(
          relatedVideos
        );
    } catch (
      error
    ) {
      console.log(
        error
      );

      res
        .status(500)
        .json({
          message:
            "Server Error",
        });
    }
  };

module.exports = {
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
};