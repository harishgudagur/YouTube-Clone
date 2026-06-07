// const multer =
//   require("multer");

// const {
//   CloudinaryStorage,
// } = require(
//   "multer-storage-cloudinary"
// );

// const cloudinary =
//   require(
//     "../config/cloudinary"
//   );

// const storage =
//   new CloudinaryStorage(
//     {
//       cloudinary,

//       params:
//         async (
//           req,
//           file
//         ) => {
//           // VIDEO
//           if (
//             file.fieldname ===
//             "video"
//           ) {
//             return {
//               folder:
//                 "youtube-clone/videos",

//               resource_type:
//                 "video",

//               public_id:
//                 `${Date.now()}-video`,
//             };
//           }

//           // IMAGES
//           return {
//             folder:
//               "youtube-clone/images",

//             resource_type:
//               "image",

//             public_id:
//               `${Date.now()}-image`,
//           };
//         },
//     }
//   );

// const fileFilter =
//   (
//     req,
//     file,
//     cb
//   ) => {
//     const allowedImageTypes =
//       [
//         "image/png",
//         "image/jpeg",
//         "image/jpg",
//         "image/webp",
//       ];

//     const allowedVideoTypes =
//       [
//         "video/mp4",
//         "video/webm",
//         "video/mkv",
//         "video/quicktime",
//       ];

//     // Thumbnail/Profile
//     if (
//       [
//         "thumbnail",
//         "profilePic",
//       ].includes(
//         file.fieldname
//       )
//     ) {
//       if (
//         allowedImageTypes.includes(
//           file.mimetype
//         )
//       ) {
//         return cb(
//           null,
//           true
//         );
//       }

//       return cb(
//         new Error(
//           "Only image files allowed"
//         ),
//         false
//       );
//     }

//     // Video
//     if (
//       file.fieldname ===
//       "video"
//     ) {
//       if (
//         allowedVideoTypes.includes(
//           file.mimetype
//         )
//       ) {
//         return cb(
//           null,
//           true
//         );
//       }

//       return cb(
//         new Error(
//           "Only video files allowed"
//         ),
//         false
//       );
//     }

//     cb(
//       null,
//       true
//     );
//   };

// const upload =
//   multer({
//     storage,
//     fileFilter,

//     limits: {
//       fileSize:
//         100 *
//         1024 *
//         1024, // 100MB
//     },
//   });

// module.exports =
//   upload;

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const path = require("path");

// 1. Storage for IMAGES (Direct to Cloudinary)
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "youtube-clone/images",
    resource_type: "image",
  },
});

// 2. Storage for VIDEOS (Temporary Disk Storage)
// We save to disk first so we can launder/stream the 1GB file 
// to the cloud without crashing the server's RAM.
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedImageTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
  const allowedVideoTypes = ["video/mp4", "video/webm", "video/mkv", "video/quicktime"];

  if (["thumbnail", "profilePic"].includes(file.fieldname)) {
    if (allowedImageTypes.includes(file.mimetype)) return cb(null, true);
    return cb(new Error("Only image files allowed"), false);
  }

  if (file.fieldname === "video") {
    if (allowedVideoTypes.includes(file.mimetype)) return cb(null, true);
    return cb(new Error("Only video files allowed"), false);
  }

  cb(null, true);
};

// Create separate Multer instances for Images and Videos
const uploadImages = multer({ 
  storage: imageStorage, 
  fileFilter, 
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit for images
});

const uploadVideos = multer({ 
  storage: videoStorage, 
  fileFilter, 
  limits: { fileSize: 1024 * 1024 * 1024 } // 1 GB Limit
});

module.exports = {
  uploadImages,
  uploadVideos,
};
