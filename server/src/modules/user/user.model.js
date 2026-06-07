// const mongoose =
//   require("mongoose");

// const userSchema =
//   new mongoose.Schema(
//     {
//       fullName: {
//         type:
//           String,
//         required:
//           true,
//       },

//       username: {
//         type:
//           String,
//         required:
//           true,
//         unique:
//           true,
//       },

//       email: {
//         type:
//           String,
//         required:
//           true,
//         unique:
//           true,
//       },

//       phone: {
//         type:
//           String,
//         unique:
//           true,
//         sparse:
//           true,
//       },

//       password: {
//         type:
//           String,
//         required:
//           true,
//       },

//       profilePic: {
//         type:
//           String,
//         default:
//           "",
//       },

//       // People who subscribed to me
//       subscribers:
//         [
//           {
//             type:
//               mongoose
//                 .Schema
//                 .Types
//                 .ObjectId,
//             ref:
//               "User",
//           },
//         ],

//       // Channels I subscribed to
//       subscribedChannels:
//         [
//           {
//             type:
//               mongoose
//                 .Schema
//                 .Types
//                 .ObjectId,
//             ref:
//               "User",
//           },
//         ],

//       // Watch history
//       watchHistory:
//         [
//           {
//             type:
//               mongoose
//                 .Schema
//                 .Types
//                 .ObjectId,
//             ref:
//               "Video",
//           },
//         ],

      
// // Notifications
// notifications: [
//   {
//     message: {
//       type: String,
//     },

//     videoId: {
//       type:
//         mongoose
//           .Schema
//           .Types
//           .ObjectId,
//       ref:
//         "Video",
//     },

//     channelId: {
//       type:
//         mongoose
//           .Schema
//           .Types
//           .ObjectId,
//       ref:
//         "User",
//     },

//     isRead: {
//       type:
//         Boolean,
//       default:
//         false,
//     },

//     createdAt: {
//       type:
//         Date,
//       default:
//         Date.now,
//     },
//   },
// ],


//       isVerified:
//         {
//           type:
//             Boolean,
//           default:
//             false,
//         },
//     },
//     {
//       timestamps:
//         true,
//     }
//   );

// module.exports =
//   mongoose.models
//     .User ||
//   mongoose.model(
//     "User",
//     userSchema
//   );

const mongoose =
  require("mongoose");

const bcrypt =
  require("bcryptjs");

const userSchema =
  new mongoose.Schema(
    {
      fullName: {
        type: String,
        required: true,
        trim: true,
      },

      username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },

      phone: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
      },

      password: {
        type: String,
        required: true,
        select: false,
      },

      profilePic: {
        type: String,
        default: "",
      },

      subscribers: [
        {
          type:
            mongoose
              .Schema
              .Types
              .ObjectId,
          ref: "User",
        },
      ],

      subscribedChannels:
        [
          {
            type:
              mongoose
                .Schema
                .Types
                .ObjectId,
            ref:
              "User",
          },
        ],

      watchHistory:
        [
          {
            type:
              mongoose
                .Schema
                .Types
                .ObjectId,
            ref:
              "Video",
          },
        ],

      notifications:
        [
          {
            message:
              String,

            videoId:
              {
                type:
                  mongoose
                    .Schema
                    .Types
                    .ObjectId,
                ref:
                  "Video",
              },

            channelId:
              {
                type:
                  mongoose
                    .Schema
                    .Types
                    .ObjectId,
                ref:
                  "User",
              },

            isRead:
              {
                type:
                  Boolean,
                default:
                  false,
              },

            createdAt:
              {
                type:
                  Date,
                default:
                  Date.now,
              },
          },
        ],

      isVerified:
        {
          type:
            Boolean,
          default:
            false,
        },
    },
    {
      timestamps:
        true,
    }
  );

// Hash password
userSchema.pre(
  "save",
  async function (
    next
  ) {
    if (
      !this.isModified(
        "password"
      )
    ) {
      return next();
    }

    const salt =
      await bcrypt.genSalt(
        10
      );

    this.password =
      await bcrypt.hash(
        this.password,
        salt
      );

    next();
  }
);

// Match password
userSchema.methods.matchPassword =
  async function (
    enteredPassword
  ) {
    return await bcrypt.compare(
      enteredPassword,
      this.password
    );
  };

module.exports =
  mongoose.models
    .User ||
  mongoose.model(
    "User",
    userSchema
  );
