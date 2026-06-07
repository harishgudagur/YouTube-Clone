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
const path = require("path");

// Local disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname)
    );
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedVideoTypes = [
    "video/mp4",
    "video/webm",
    "video/mkv",
    "video/quicktime",
  ];

  const allowedImageTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
  ];

  // Video
  if (file.fieldname === "video") {
    if (
      allowedVideoTypes.includes(
        file.mimetype
      )
    ) {
      return cb(null, true);
    }

    return cb(
      new Error(
        "Only video files allowed"
      ),
      false
    );
  }

  // Thumbnail/Profile
  if (
    ["thumbnail", "profilePic"].includes(
      file.fieldname
    )
  ) {
    if (
      allowedImageTypes.includes(
        file.mimetype
      )
    ) {
      return cb(null, true);
    }

    return cb(
      new Error(
        "Only image files allowed"
      ),
      false
    );
  }

  cb(null, true);
};

// Multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize:
      1024 * 1024 * 1024, // 1GB
  },
});

// IMPORTANT
module.exports = upload;