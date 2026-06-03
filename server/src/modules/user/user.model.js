const mongoose =
  require("mongoose");

const userSchema =
  new mongoose.Schema(
    {
      fullName: {
        type:
          String,
        required:
          true,
      },

      username: {
        type:
          String,
        required:
          true,
        unique:
          true,
      },

      email: {
        type:
          String,
        required:
          true,
        unique:
          true,
      },

      phone: {
        type:
          String,
        unique:
          true,
        sparse:
          true,
      },

      password: {
        type:
          String,
        required:
          true,
      },

      profilePic: {
        type:
          String,
        default:
          "",
      },

      // People who subscribed to me
      subscribers:
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

      // Channels I subscribed to
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

      // Watch history
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

      
// Notifications
notifications: [
  {
    message: {
      type: String,
    },

    videoId: {
      type:
        mongoose
          .Schema
          .Types
          .ObjectId,
      ref:
        "Video",
    },

    channelId: {
      type:
        mongoose
          .Schema
          .Types
          .ObjectId,
      ref:
        "User",
    },

    isRead: {
      type:
        Boolean,
      default:
        false,
    },

    createdAt: {
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

module.exports =
  mongoose.models
    .User ||
  mongoose.model(
    "User",
    userSchema
  );