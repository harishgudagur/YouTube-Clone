const mongoose =
  require("mongoose");

const historySchema =
  new mongoose.Schema(
    {
      userId: {
        type:
          mongoose.Schema
            .Types.ObjectId,
        ref: "User",
        required: true,
      },

      videoId: {
        type:
          mongoose.Schema
            .Types.ObjectId,
        ref: "Video",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.models
    .History ||
  mongoose.model(
    "History",
    historySchema
  );