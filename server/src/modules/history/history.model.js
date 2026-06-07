// const mongoose =
//   require("mongoose");

// const historySchema =
//   new mongoose.Schema(
//     {
//       userId: {
//         type:
//           mongoose.Schema
//             .Types.ObjectId,
//         ref: "User",
//         required: true,
//       },

//       videoId: {
//         type:
//           mongoose.Schema
//             .Types.ObjectId,
//         ref: "Video",
//         required: true,
//       },
//     },
//     {
//       timestamps: true,
//     }
//   );

// module.exports =
//   mongoose.models
//     .History ||
//   mongoose.model(
//     "History",
//     historySchema
//   );

const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Optimized: Makes "Get My History" lightning fast
    },

    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
  },
  {
    timestamps: true, // Crucial for sorting by 'most recent'
  }
);

// THE PRO MOVE: COMPOUND INDEX
// This ensures that a specific user can only have a specific video 
// in their history ONCE. MongoDB will block any attempt to create a 
// duplicate pair of userId + videoId.
historySchema.index({ userId: 1, videoId: 1 }, { unique: true });

module.exports = mongoose.models.History || mongoose.model("History", historySchema);

