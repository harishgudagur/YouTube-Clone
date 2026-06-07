// const Video =
//   require("./video.model");

// // Upload Video
// const uploadVideo =
//   async (
//     req,
//     res
//   ) => {
//     try {
//       const {
//         title,
//         description,
//         type,
//         category,
//       } = req.body;

//       const videoFile =
//         req.files
//           ?.video?.[0];

//       const thumbnailFile =
//         req.files
//           ?.thumbnail?.[0];

//       if (
//         !videoFile
//       ) {
//         return res
//           .status(400)
//           .json({
//             message:
//               "Video file required",
//           });
//       }

//       const videoUrl =
//         videoFile.path;

//       const thumbnail =
//         thumbnailFile
//           ? thumbnailFile.path
//           : "";

//       const newVideo =
//         await Video.create(
//           {
//             title,
//             description,
//             videoUrl,
//             thumbnail,
//             type:
//               type ||
//               "video",
//             category:
//               category ||
//               "All",
//             userId:
//               req.user.id,
//           }
//         );

//       res
//         .status(201)
//         .json(
//           newVideo
//         );
//     } catch (
//       error
//     ) {
//       console.log(
//         error
//       );

//       res
//         .status(500)
//         .json({
//           message:
//             "Upload failed",
//         });
//     }
//   };

// // Get All Videos
// const getAllVideos =
//   async (
//     req,
//     res
//   ) => {
//     try {
//       const {
//         type,
//         category,
//       } = req.query;

//       let filter = {};

//       if (type) {
//         filter.type =
//           type;
//       }

//       if (
//         category &&
//         category !==
//           "All"
//       ) {
//         filter.category =
//           category;
//       }

//       const videos =
//         await Video.find(
//           filter
//         )
//           .populate(
//             "userId",
//             "fullName username email profilePic subscribers"
//           )
//           .sort({
//             createdAt:
//               -1,
//           });

//       return res
//         .status(200)
//         .json(videos);
//     } catch (
//       error
//     ) {
//       console.log(
//         error
//       );

//       return res
//         .status(500)
//         .json({
//           message:
//             "Error fetching videos",
//         });
//     }
//   };

// // Get Video By ID + Increment Views
// const getVideoById =
//   async (
//     req,
//     res
//   ) => {
//     try {
//       const video =
//         await Video.findByIdAndUpdate(
//           req.params.id,
//           {
//             $inc: {
//               views: 1,
//             },
//           },
//           {
//             new: true,
//           }
//         ).populate(
//           "userId",
//           "fullName username profilePic subscribers"
//         );

//       if (
//         !video
//       ) {
//         return res
//           .status(404)
//           .json({
//             message:
//               "Video not found",
//           });
//       }

//       res.status(
//         200
//       ).json(video);
//     } catch (
//       error
//     ) {
//       console.log(
//         error
//       );

//       res
//         .status(500)
//         .json({
//           message:
//             "Server Error",
//         });
//     }
//   };

// // Like Video

// const likeVideo =
//   async (
//     req,
//     res
//   ) => {
//     try {
//       const video =
//         await Video.findById(
//           req.params.id
//         );

//       if (
//         !video
//       ) {
//         return res
//           .status(
//             404
//           )
//           .json({
//             message:
//               "Video not found",
//           });
//       }

//       const userId =
//         req.user.id;

//       const alreadyLiked =
//         video.likes.some(
//           (
//             id
//           ) =>
//             id.toString() ===
//             userId
//         );

//       if (
//         alreadyLiked
//       ) {
//         // Unlike
//         video.likes =
//           video.likes.filter(
//             (
//               id
//             ) =>
//               id.toString() !==
//               userId
//           );
//       } else {
//         // Like once
//         video.likes.push(
//           userId
//         );
//       }

//       await video.save();

//       res.status(
//         200
//       ).json({
//         likes:
//           video.likes,
//         liked:
//           !alreadyLiked,
//       });
//     } catch (
//       error
//     ) {
//       console.log(
//         error
//       );

//       res.status(
//         500
//       ).json({
//         message:
//           "Server error",
//       });
//     }
//   };



// // Get Liked Videos
// const getLikedVideos =
//   async (
//     req,
//     res
//   ) => {
//     try {
//       const videos =
//         await Video.find(
//           {
//             likes:
//               req.user.id,
//           }
//         ).populate(
//           "userId",
//           "username profilePic"
//         );

//       res.status(
//         200
//       ).json(
//         videos
//       );
//     } catch (
//       error
//     ) {
//       console.log(
//         error
//       );

//       res
//         .status(500)
//         .json({
//           message:
//             "Server Error",
//         });
//     }
//   };

// // Watch Later Toggle
// const toggleWatchLater =
//   async (
//     req,
//     res
//   ) => {
//     try {
//       const userId =
//         req.user.id;

//       const video =
//         await Video.findById(
//           req.params.id
//         );

//       if (
//         !video
//       ) {
//         return res
//           .status(404)
//           .json({
//             message:
//               "Video not found",
//           });
//       }

//       const exists =
//         video.watchLater.includes(
//           userId
//         );

//       if (
//         exists
//       ) {
//         video.watchLater =
//           video.watchLater.filter(
//             (
//               id
//             ) =>
//               id.toString() !==
//               userId
//           );
//       } else {
//         video.watchLater.push(
//           userId
//         );
//       }

//       await video.save();

//       res.json({
//         success:
//           true,
//       });
//     } catch (
//       error
//     ) {
//       console.log(
//         error
//       );

//       res
//         .status(500)
//         .json({
//           message:
//             "Server Error",
//         });
//     }
//   };

// // Get Watch Later
// const getWatchLater =
//   async (
//     req,
//     res
//   ) => {
//     try {
//       const videos =
//         await Video.find(
//           {
//             watchLater:
//               req.user.id,
//           }
//         ).populate(
//           "userId",
//           "username profilePic"
//         );

//       res.json(
//         videos
//       );
//     } catch (
//       error
//     ) {
//       console.log(
//         error
//       );

//       res
//         .status(500)
//         .json({
//           message:
//             "Server Error",
//         });
//     }
//   };

// // Delete Video
// const deleteVideo =
//   async (
//     req,
//     res
//   ) => {
//     try {
//       const video =
//         await Video.findById(
//           req.params.id
//         );

//       if (
//         !video
//       ) {
//         return res
//           .status(404)
//           .json({
//             message:
//               "Video not found",
//           });
//       }

//       if (
//         video.userId.toString() !==
//         req.user.id
//       ) {
//         return res
//           .status(403)
//           .json({
//             message:
//               "Unauthorized",
//           });
//       }

//       await Video.findByIdAndDelete(
//         req.params.id
//       );

//       res.status(
//         200
//       ).json({
//         message:
//           "Deleted successfully",
//       });
//     } catch (
//       error
//     ) {
//       console.log(
//         error
//       );

//       res
//         .status(500)
//         .json({
//           message:
//             "Delete failed",
//         });
//     }
//   };

// // Search Videos
// const searchVideos =
//   async (
//     req,
//     res
//   ) => {
//     try {
//       const query =
//         req.query.q;

//       const videos =
//         await Video.find({
//           title: {
//             $regex:
//               query,
//             $options:
//               "i",
//           },
//           type:
//             "video",
//         })
//           .populate(
//             "userId",
//             "username profilePic"
//           )
//           .sort({
//             createdAt:
//               -1,
//           });

//       res.status(
//         200
//       ).json(
//         videos
//       );
//     } catch (
//       error
//     ) {
//       console.log(
//         error
//       );

//       res
//         .status(500)
//         .json({
//           message:
//             "Search failed",
//         });
//     }
//   };

// // My Videos
// const getMyVideos =
//   async (
//     req,
//     res
//   ) => {
//     try {
//       const videos =
//         await Video.find({
//           userId:
//             req.user.id,
//         })
//           .populate(
//             "userId",
//             "fullName username profilePic"
//           )
//           .sort({
//             createdAt:
//               -1,
//           });

//       res.status(
//         200
//       ).json(
//         videos
//       );
//     } catch (
//       error
//     ) {
//       console.log(
//         error
//       );

//       res
//         .status(500)
//         .json({
//           message:
//             "Failed to fetch videos",
//         });
//     }
//   };

// // Related Videos
// const getRelatedVideos =
//   async (
//     req,
//     res
//   ) => {
//     try {
//       const video =
//         await Video.findById(
//           req.params.id
//         );

//       // video deleted or not found
//       if (
//         !video
//       ) {
//         return res
//           .status(404)
//           .json({
//             message:
//               "Video not found",
//           });
//       }

//       const relatedVideos =
//         await Video.find({
//           category:
//             video.category,

//           _id: {
//             $ne:
//               video._id,
//           },
//         })
//           .populate(
//             "userId",
//             "fullName username profilePic"
//           )
//           .limit(10);

//       res
//         .status(200)
//         .json(
//           relatedVideos
//         );
//     } catch (
//       error
//     ) {
//       console.log(
//         error
//       );

//       res
//         .status(500)
//         .json({
//           message:
//             "Server Error",
//         });
//     }
//   };

// module.exports = {
//   uploadVideo,
//   getAllVideos,
//   getVideoById,
//   likeVideo,
//   deleteVideo,
//   searchVideos,
//   getMyVideos,
//   getRelatedVideos,
//   getLikedVideos,
//   toggleWatchLater,
//   getWatchLater,
// };



const Video = require("./video.model");
const cloudinary = require("cloudinary").v2; 
const fs = require("fs");

// Configure Cloudinary (Ensure these are in your .env)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// ==========================================
// UPLOAD VIDEO (Optimized for 1GB+)
// ==========================================
const uploadVideo = async (req, res) => {
  try {
    const { title, description, type, category } = req.body;

    const videoFile = req.files?.video?.[0];
    const thumbnailFile = req.files?.thumbnail?.[0];

    if (!videoFile) {
      return res.status(400).json({ message: "Video file required" });
    }

    // 1. STREAMING UPLOAD TO CLOUDINARY
    // We use a Promise and a stream to avoid loading the 1GB file into RAM
    const videoUploadPromise = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { 
          resource_type: "video", 
          folder: "youtube_clone/videos",
          chunk_size: 6000000 // 6MB chunks for stability
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      // Read file from disk and pipe it directly to Cloudinary
      const fileStream = fs.createReadStream(videoFile.path);
      fileStream.pipe(uploadStream);
    });

    const videoResult = await videoUploadPromise;

    // 2. UPLOAD THUMBNAIL
    let thumbnailUrl = "";
    if (thumbnailFile) {
      const thumbRes = await cloudinary.uploader.upload(thumbnailFile.path, {
        folder: "youtube_clone/thumbnails",
      });
      thumbnailUrl = thumbRes.secure_url;
    } else {
      // Fallback to the video's own URL if no thumbnail is provided
      thumbnailUrl = videoResult.secure_url; 
    }

    // 3. SAVE TO DATABASE
    const newVideo = await Video.create({
      title,
      description,
      videoUrl: videoResult.secure_url, // Save the CLOUD URL, not the local path
      thumbnail: thumbnailUrl,
      type: type || "video",
      category: category || "All",
      userId: req.user.id,
    });

    // 4. CLEANUP: Delete the temporary files from your server disk immediately
    if (videoFile) fs.unlinkSync(videoFile.path);
    if (thumbnailFile) fs.unlinkSync(thumbnailFile.path);

    res.status(201).json(newVideo);
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

// ==========================================
// GET ALL VIDEOS
// ==========================================
const getAllVideos = async (req, res) => {
  try {
    const { type, category } = req.query;
    let filter = {};

    if (type) filter.type = type;
    if (category && category !== "All") filter.category = category;

    const videos = await Video.find(filter)
      .populate("userId", "fullName username email profilePic subscribers")
      .sort({ createdAt: -1 });

    return res.status(200).json(videos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching videos" });
  }
};

// ==========================================
// GET VIDEO BY ID + VIEW COUNT
// ==========================================
const getVideoById = async (req, res) => {
  try {
    // Atomic increment of views
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate("userId", "fullName username profilePic subscribers");

    if (!video) return res.status(404).json({ message: "Video not found" });

    res.status(200).json(video);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ==========================================
// LIKE VIDEO (Toggle)
// ==========================================
const likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const userId = req.user.id;
    const alreadyLiked = video.likes.some(id => id.toString() === userId);

    if (alreadyLiked) {
      video.likes = video.likes.filter(id => id.toString() !== userId);
    } else {
      video.likes.push(userId);
    }

    await video.save();
    res.status(200).json({ likes: video.likes, liked: !alreadyLiked });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==========================================
// GET LIKED VIDEOS
// ==========================================
const getLikedVideos = async (req, res) => {
  try {
    const videos = await Video.find({ likes: req.user.id })
      .populate("userId", "username profilePic");
    res.status(200).json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ==========================================
// WATCH LATER TOGGLE
// ==========================================
const toggleWatchLater = async (req, res) => {
  try {
    const userId = req.user.id;
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const exists = video.watchLater.includes(userId);

    if (exists) {
      video.watchLater = video.watchLater.filter(id => id.toString() !== userId);
    } else {
      video.watchLater.push(userId);
    }

    await video.save();
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ==========================================
// GET WATCH LATER
// ==========================================
const getWatchLater = async (req, res) => {
  try {
    const videos = await Video.find({ watchLater: req.user.id })
      .populate("userId", "username profilePic");
    res.json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ==========================================
// DELETE VIDEO
// ==========================================
const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    if (video.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Optional: Add logic here to delete the video from Cloudinary too
    await Video.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete failed" });
  }
};

// ==========================================
// SEARCH VIDEOS
// ==========================================
const searchVideos = async (req, res) => {
  try {
    const query = req.query.q;
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
      type: "video",
    })
    .populate("userId", "username profilePic")
    .sort({ createdAt: -1 });

    res.status(200).json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Search failed" });
  }
};

// ==========================================
// MY VIDEOS
// ==========================================
const getMyVideos = async (req, res) => {
  try {
    const videos = await Video.find({ userId: req.user.id })
      .populate("userId", "fullName username profilePic")
      .sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch videos" });
  }
};

// ==========================================
// RELATED VIDEOS
// ==========================================
const getRelatedVideos = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const relatedVideos = await Video.find({
      category: video.category,
      _id: { $ne: video._id },
    })
    .populate("userId", "fullName username profilePic")
    .limit(10);

    res.status(200).json(relatedVideos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
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
