// const mongoose =
//   require("mongoose");

// const commentSchema =
//   new mongoose.Schema(
//     {
//       text: {
//         type: String,
//         required: true,
//       },

//       videoId: {
//         type:
//           mongoose.Schema
//             .Types.ObjectId,
//         ref: "Video",
//         required: true,
//       },

//       userId: {
//         type:
//           mongoose.Schema
//             .Types.ObjectId,
//         ref: "User",
//         required: true,
//       },
//     },
//     {
//       timestamps: true,
//     }
//   );

// module.exports =
//   mongoose.models
//     .Comment ||
//   mongoose.model(
//     "Comment",
//     commentSchema
//   );

const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Comment text is required"],
      trim: true, // Automatically removes accidental spaces at the start/end
      maxLength: [1000, "Comment cannot exceed 1000 characters"],
    },

    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
      index: true, // CRITICAL: Makes fetching comments for a video lightning fast
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Optimized: Allows you to quickly find all comments by a specific user
    },
  },
  {
    timestamps: true,
  }
);

// Compound Index: In case you ever want to check if a user has already 
// commented on a specific video (to prevent spamming)
commentSchema.index({ userId: 1, videoId: 1 });

module.exports = mongoose.models.Comment || mongoose.model("Comment", commentSchema);
