const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: false, // Optional for phone OTP
    },
    phone: {
      type: String,
      required: false, // Optional for email OTP
    },
    otp: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['signup', 'forgot-password'],
      default: 'signup',
    },
    isVerified: {
      type: Boolean,
      default: false,
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

// Add TTL index for automatic expiration deletion
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model(
  "OTP",
  otpSchema
);