const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const otpGenerator = require("otp-generator");

const transporter = require("../../config/mailer");

const User = require("../user/user.model");
const OTP = require("./auth.model");
const ResetToken = require("./resetToken.model");

const {
  findUserByEmail,
  findUserById,
  createUser,
} = require("../user/user.repository");

// Signup
const signupService = async (data) => {
  const {
    fullName,
    username,
    email,
    password,
  } = data;

  const existingEmail =
    await User.findOne({ email });

  if (existingEmail) {
    throw new Error(
      "Email already exists"
    );
  }

  const existingUsername =
    await User.findOne({
      username,
    });

  if (existingUsername) {
    throw new Error(
      "Username already taken"
    );
  }

  const salt =
    await bcrypt.genSalt(10);

  const hashedPassword =
    await bcrypt.hash(
      password,
      salt
    );

  const user =
    await createUser({
      fullName,
      username,
      email,
      password:
        hashedPassword,
    });

  return user;
};

// Login
const loginService = async (
  email,
  password
) => {
  const user =
    await findUserByEmail(
      email
    );

  if (!user) {
    throw new Error(
      "User not found"
    );
  }

  const isMatch =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isMatch) {
    throw new Error(
      "Invalid credentials"
    );
  }

  return user;
};

// Profile
const getProfileService =
  async (userId) => {
    const user =
      await findUserById(
        userId
      );

    if (!user) {
      throw new Error(
        "User not found"
      );
    }

    return user;
  };

// Send OTP
const sendOtpService =
  async (email) => {
    const otp =
      otpGenerator.generate(
        6,
        {
          upperCaseAlphabets:
            false,
          specialChars: false,
        }
      );

    await OTP.deleteMany({
      email,
    });

    await OTP.create({
      email,
      otp,
      expiresAt: new Date(
        Date.now() +
          5 * 60 * 1000
      ),
    });

    const info =
      await transporter.sendMail({
        from:
          "YouTube <youtubeclone066@gmail.com>",
        to: email,
        subject:
          "Email Verification OTP",
        html: `
          <h2>YouTube Clone Verification</h2>
          <p>Your OTP is:</p>
          <h1>${otp}</h1>
          <p>Valid for 5 minutes</p>
        `,
      });

    return true;
  };

// Verify OTP
const verifyOtpService =
  async (
    email,
    otp
  ) => {
    const otpRecord =
      await OTP.findOne({
        email,
        otp,
      });

    if (!otpRecord) {
      throw new Error(
        "Invalid OTP"
      );
    }

    if (
      new Date() >
      otpRecord.expiresAt
    ) {
      throw new Error(
        "OTP expired"
      );
    }

    const user =
      await User.findOne({
        email,
      });

    user.isVerified =
      true;

    await user.save();

    await OTP.deleteMany({
      email,
    });

    return user;
  };

// Forgot Password
const forgotPasswordService =
  async (email) => {
    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      throw new Error(
        "User not found"
      );
    }

    const token =
      crypto.randomBytes(
        32
      ).toString("hex");

    await ResetToken.deleteMany(
      {
        email,
      }
    );

    await ResetToken.create({
      email,
      token,
      expiresAt: new Date(
        Date.now() +
          10 * 60 * 1000
      ),
    });

    const resetLink = `http://localhost:5173/reset-password/${token}`;

    const info =
      await transporter.sendMail({
        from:
          "YouTube <youtubeclone066@gmail.com>",
        to: email,
        subject:
          "Reset Password",
        html: `
          <h2>Password Reset</h2>
          <p>Click below to reset password:</p>
          <a href="${resetLink}">
            Reset Password
          </a>
          <p>Valid for 10 minutes</p>
        `,
      });
      console.log(info);


    return true;
  };

// Reset Password
const resetPasswordService =
  async (
    token,
    newPassword
  ) => {
    const tokenRecord =
      await ResetToken.findOne(
        {
          token,
        }
      );

    if (!tokenRecord) {
      throw new Error(
        "Invalid token"
      );
    }

    if (
      new Date() >
      tokenRecord.expiresAt
    ) {
      throw new Error(
        "Token expired"
      );
    }

    const salt =
      await bcrypt.genSalt(
        10
      );

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        salt
      );

    await User.findOneAndUpdate(
      {
        email:
          tokenRecord.email,
      },
      {
        password:
          hashedPassword,
      }
    );

    await ResetToken.deleteOne(
      {
        token,
      }
    );

    return true;
  };


const oauthLoginService =
  async (
    data
  ) => {
    const {
      email,
      fullName,
      profilePic,
    } = data;

    let user =
      await User.findOne(
        {
          email,
        }
      );

    if (!user) {
      const username =
        email.split(
          "@"
        )[0];

      user =
        await User.create(
          {
            fullName,
            username,
            email,
            password:
              "oauth-user",

            profilePic,
            isVerified:
              true,
          }
        );
    }

    return user;
  };


module.exports = {
  signupService,
  loginService,
  getProfileService,
  sendOtpService,
  verifyOtpService,
  forgotPasswordService,
  resetPasswordService,
  oauthLoginService,
};