const multer =
  require("multer");

const {
  CloudinaryStorage,
} = require(
  "multer-storage-cloudinary"
);

const cloudinary =
  require(
    "../config/cloudinary"
  );

const storage =
  new CloudinaryStorage(
    {
      cloudinary,

      params:
        async (
          req,
          file
        ) => {
          if (
            file.fieldname ===
            "video"
          ) {
            return {
              folder:
                "youtube-clone/videos",

              resource_type:
                "video",

              allowed_formats:
                [
                  "mp4",
                  "mov",
                  "webm",
                  "mkv",
                ],
            };
          }

          return {
            folder:
              "youtube-clone/images",

            resource_type:
              "image",

            allowed_formats:
              [
                "png",
                "jpg",
                "jpeg",
                "webp",
              ],
          };
        },
    }
  );

const fileFilter =
  (
    req,
    file,
    cb
  ) => {
    const allowedImageTypes =
      [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/webp",
      ];

    const allowedVideoTypes =
      [
        "video/mp4",
        "video/webm",
        "video/mkv",
        "video/quicktime",
      ];

    if (
      file.fieldname ===
        "thumbnail" ||
      file.fieldname ===
        "profilePic"
    ) {
      if (
        allowedImageTypes.includes(
          file.mimetype
        )
      ) {
        cb(
          null,
          true
        );
      } else {
        cb(
          new Error(
            "Only image files allowed"
          ),
          false
        );
      }
    } else if (
      file.fieldname ===
      "video"
    ) {
      if (
        allowedVideoTypes.includes(
          file.mimetype
        )
      ) {
        cb(
          null,
          true
        );
      } else {
        cb(
          new Error(
            "Only video files allowed"
          ),
          false
        );
      }
    } else {
      cb(
        null,
        true
      );
    }
  };

const upload =
  multer({
    storage,
    fileFilter,

    limits: {
      fileSize:
        500 *
        1024 *
        1024,
    },
  });

module.exports =
  upload;