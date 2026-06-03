const multer =
  require("multer");

const path =
  require("path");

const fs =
  require("fs");

// uploads folder
const uploadPath =
  path.join(
    __dirname,
    "../../uploads"
  );

if (
  !fs.existsSync(
    uploadPath
  )
) {
  fs.mkdirSync(
    uploadPath,
    {
      recursive:
        true,
    }
  );
}

// storage config
const storage =
  multer.diskStorage({
    destination:
      (
        req,
        file,
        cb
      ) => {
        cb(
          null,
          uploadPath
        );
      },

    filename:
      (
        req,
        file,
        cb
      ) => {
        const uniqueName =
          Date.now() +
          "-" +
          Math.round(
            Math.random() *
              1e9
          ) +
          path.extname(
            file.originalname
          );

        cb(
          null,
          uniqueName
        );
      },
  });

// file filter
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
      "thumbnail"
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
            "Only image files allowed for thumbnail"
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
    } else if (
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
            "Only image allowed for profile picture"
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
    }, // 500MB
  });

module.exports =
  upload;