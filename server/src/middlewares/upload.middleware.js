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
          // VIDEO
          if (
            file.fieldname ===
            "video"
          ) {
            return {
              folder:
                "youtube-clone/videos",

              resource_type:
                "video",

              public_id:
                `${Date.now()}-video`,
            };
          }

          // IMAGES
          return {
            folder:
              "youtube-clone/images",

            resource_type:
              "image",

            public_id:
              `${Date.now()}-image`,
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
        100 *
        1024 *
        1024, // 100MB
    },
  });

module.exports =
  upload;