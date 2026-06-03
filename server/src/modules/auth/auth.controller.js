const {
  signupService,
  loginService,
  getProfileService,
  sendOtpService,
  verifyOtpService,
  forgotPasswordService,
  resetPasswordService,
} = require("./auth.service");

const {
  generateToken,
} = require("../../common/helpers");

const {
  oauthLoginService,
} = require(
  "./auth.service"
);

// Signup
const signup = async (req, res) => {
  try {
    const user = await signupService(req.body);

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "Signup successful",
      token,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await loginService(
      email,
      password
    );

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

const profile = async (req, res) => {
  try {
    const user = await getProfileService(
      req.user.id
    );

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const sendOtp = async (
  req,
  res
) => {
  try {
    const { email } = req.body;

    await sendOtpService(email);

    res.status(200).json({
      success: true,
      message:
        "OTP sent successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyOtp = async (
  req,
  res
) => {
  try {
    const { email, otp } =
      req.body;

    const user =
      await verifyOtpService(
        email,
        otp
      );

    res.status(200).json({
      success: true,
      message:
        "Email verified successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const forgotPassword =
  async (req, res) => {
    try {
      const { email } =
        req.body;

      await forgotPasswordService(
        email
      );

      res.status(200).json({
        success: true,
        message:
          "Reset link sent",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error.message,
      });
    }
  };

const resetPassword =
  async (req, res) => {
    try {
      const { token } =
        req.params;

      const {
        password,
      } = req.body;

      await resetPasswordService(
        token,
        password
      );

      res.status(200).json({
        success: true,
        message:
          "Password reset successful",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error.message,
      });
    }
  };

const oauthLogin =
  async (
    req,
    res
  ) => {
    try {
      const {
        email,
        fullName,
        profilePic,
      } = req.body;

      const user =
        await oauthLoginService(
          {
            email,
            fullName,
            profilePic,
          }
        );

      const token =
        generateToken(
          user._id
        );

      res.status(
        200
      ).json({
        success:
          true,
        token,
        user,
      });
    } catch (
      error
    ) {
      res.status(
        400
      ).json({
        success:
          false,
        message:
          error.message,
      });
    }
  };

module.exports = {
  signup,
  login,
  profile,
  sendOtp,
  verifyOtp,
  forgotPassword,
  resetPassword,
  oauthLogin,
};