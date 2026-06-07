// const mongoose = require("mongoose");

// const resetTokenSchema =
//   new mongoose.Schema(
//     {
//       email: {
//         type: String,
//         required: true,
//       },

//       token: {
//         type: String,
//         required: true,
//       },

//       expiresAt: {
//         type: Date,
//         required: true,
//       },
//     },
//     {
//       timestamps: true,
//     }
//   );

// module.exports =
//   mongoose.model(
//     "ResetToken",
//     resetTokenSchema
//   );


const mongoose = require("mongoose");

const resetTokenSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true, // Optimized for finding tokens by email
    },

    token: {
      type: String,
      required: true,
      unique: true, // A token must be unique to a specific request
      index: true, // CRITICAL: Makes the reset-password page load instantly
    },

    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// THE PRO MOVE: TTL (Time-To-Live) Index
// This tells MongoDB to automatically delete the document the moment 
// the current time passes the 'expiresAt' date. 
// No need to write a manual cleanup script!
resetTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.models.ResetToken || mongoose.model("ResetToken", resetTokenSchema);
