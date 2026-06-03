const mongoose =
  require("mongoose");

const commentSchema =
  new mongoose.Schema(
    {
      text: {
        type: String,
        required: true,
      },

      videoId: {
        type:
          mongoose.Schema
            .Types.ObjectId,
        ref: "Video",
        required: true,
      },

      userId: {
        type:
          mongoose.Schema
            .Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.models
    .Comment ||
  mongoose.model(
    "Comment",
    commentSchema
  );