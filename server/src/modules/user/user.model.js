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


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },

    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true, // Ensures consistency in URLs (e.g., /channel/john vs /channel/John)
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true, // Standardizes emails to lowercase
    },

    phone: {
      type: String,
      unique: true,
      sparse: true, // Correctly handles optional unique fields
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    profilePic: {
      type: String,
      default: "",
    },

    // People who subscribed to me
    subscribers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Channels I subscribed to
    subscribedChannels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Watch history
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],

    /* 
       NOTE: For a small project, this nested array is fine.
       For a production app, move this to its own 'Notification' Model.
    */
    notifications: [
      {
        message: { type: String },
        videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video" },
        channelId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        isRead: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexing for fast lookups
userSchema.index({ username: 1, email: 1 });

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
