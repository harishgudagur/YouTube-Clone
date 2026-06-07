// const mongoose =
//   require("mongoose");

// const videoSchema =
//   new mongoose.Schema(
//     {
//       title: {
//         type: String,
//         required: true,
//       },

//       description: {
//         type: String,
//       },

//       videoUrl: {
//         type: String,
//         required: true,
//       },

//       thumbnail: {
//         type: String,
//         default: "",
//       },

//       // NEW
//       type: {
//         type: String,
//         enum: [
//           "video",
//           "short",
//         ],
//         default:
//           "video",
//       },

//       // NEW
//       category: {
//         type: String,
//         default:
//           "All",
//       },

//       userId: {
//         type:
//           mongoose.Schema
//             .Types.ObjectId,

//         ref: "User",
//       },

//       views: {
//         type: Number,
//         default: 0,
//       },

//       category: {
//   type: String,
//   default: "All",
// },

//       likes: [
//         {
//           type:
//             mongoose.Schema
//               .Types.ObjectId,

//           ref: "User",
//         },
//       ],

//       watchLater: [
//   {
//     type:
//       mongoose.Schema
//         .Types.ObjectId,
//     ref: "User",
//   },
// ],
//     },
//     {
//       timestamps: true,
//     }
//   );

// module.exports =
//   mongoose.models.Video ||
//   mongoose.model(
//     "Video",
//     videoSchema
//   );



const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxLength: [200, "Title cannot exceed 200 characters"], // Prevent database abuse
    },

    description: {
      type: String,
      trim: true,
    },

    videoUrl: {
      type: String,
      required: [true, "Video URL is required"],
    },

    thumbnail: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      enum: ["video", "short"],
      default: "video",
    },

    category: {
      type: String,
      default: "All",
      index: true, // Optimized for the "Trending" and "Category" filters
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Optimized for "My Videos" and "Channel" pages
    },

    views: {
      type: Number,
      default: 0,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    watchLater: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt
  }
);

// Text Index for Search
// This allows the search API to find keywords inside the title efficiently
videoSchema.index({ title: "text" });

module.exports = mongoose.models.Video || mongoose.model("Video", videoSchema);
