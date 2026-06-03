const mongoose =
  require("mongoose");

const videoSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
      },

      videoUrl: {
        type: String,
        required: true,
      },

      thumbnail: {
        type: String,
        default: "",
      },

      // NEW
      type: {
        type: String,
        enum: [
          "video",
          "short",
        ],
        default:
          "video",
      },

      // NEW
      category: {
        type: String,
        default:
          "All",
      },

      userId: {
        type:
          mongoose.Schema
            .Types.ObjectId,

        ref: "User",
      },

      views: {
        type: Number,
        default: 0,
      },

      category: {
  type: String,
  default: "All",
},

      likes: [
        {
          type:
            mongoose.Schema
              .Types.ObjectId,

          ref: "User",
        },
      ],

      watchLater: [
  {
    type:
      mongoose.Schema
        .Types.ObjectId,
    ref: "User",
  },
],
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.models.Video ||
  mongoose.model(
    "Video",
    videoSchema
  );