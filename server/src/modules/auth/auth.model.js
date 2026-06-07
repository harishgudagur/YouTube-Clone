const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: function() { 
        return !this.phone; // Required if phone is missing
      },
    },
    phone: {
      type: String,
      trim: true,
      required: function() { 
        return !this.email; // Required if email is missing
      },
    },
    otp: {
      type: String,
      required: [true, "OTP code is required"],
      index: true, // Optimized for the verification check
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

// 1. TTL INDEX: Automatically deletes the document when expiresAt is reached
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// 2. COMPOUND INDEX: Makes the verification process (email + otp) lightning fast
otpSchema.index({ email: 1, otp: 1 });
otpSchema.index({ phone: 1, otp: 1 });

module.exports = mongoose.models.OTP || mongoose.model("OTP", otpSchema);
