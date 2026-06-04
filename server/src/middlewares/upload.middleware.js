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
          // Video Upload
          if (
            file.fieldname ===
            "video"
          ) {
            return {
              folder:
                "youtube-clone/videos",

              resource_type:
                "auto",

              format:
                "mp4",
            };
          }

          // Images
          return {
            folder:
              "youtube-clone/images",

            resource_type:
              "image",
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

    // Thumbnail/Profile
    if (
      [
        "thumbnail",
        "profilePic",
      ].includes(
        file.fieldname
      )
    ) {
      if (
        allowedImageTypes.includes(
          file.mimetype
        )
      ) {
        return cb(
          null,
          true
        );
      }

      return cb(
        new Error(
          "Only image files allowed"
        ),
        false
      );
    }

    // Video
    if (
      file.fieldname ===
      "video"
    ) {
      if (
        allowedVideoTypes.includes(
          file.mimetype
        )
      ) {
        return cb(
          null,
          true
        );
      }

      return cb(
        new Error(
          "Only video files allowed"
        ),
        false
      );
    }

    cb(
      null,
      true
    );
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