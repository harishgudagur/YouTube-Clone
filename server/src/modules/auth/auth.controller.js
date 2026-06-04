const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const OTP = require('../models/OTP');
const PasswordReset = require('../models/PasswordReset');
const { sendEmailOTP, sendPhoneOTP, verifyOTP, sendPasswordResetEmail, sendWelcomeEmail } = require('../services/otpService');

// Generate JWT Token
const generateToken = (id, expiresIn = '1h') => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn });
};

// Generate Refresh Token
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { 
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d' 
  });
};

// Standardized cookie configuration for Production cross-origin usage
const getCookieOptions = () => {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: true, // Secure must be true for sameSite: 'none'
    sameSite: 'none', // Needed for cross-origin cookie transmission (Vercel -> Render)
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };
};

// ========== SEND EMAIL OTP ==========
exports.sendEmailOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid email format' 
      });
    }

    const result = await sendEmailOTP(email, 'signup');

    res.status(200).json({
      success: true,
      message: 'OTP sent to email',
      data: {
        email,
        expiryTime: result.expiryTime,
      },
    });
  } catch (error) {
    console.error('Send Email OTP Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to send OTP',
    });
  }
};

// ========== SEND PHONE OTP ==========
exports.sendPhoneOTP = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Phone number is required' 
      });
    }

    // Validate phone (10-15 digits)
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid phone number format' 
      });
    }

    const result = await sendPhoneOTP(phone, 'signup');

    res.status(200).json({
      success: true,
      message: 'OTP sent to phone',
      data: {
        phone,
        expiryTime: result.expiryTime,
      },
    });
  } catch (error) {
    console.error('Send Phone OTP Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to send OTP',
    });
  }
};

// ========== VERIFY OTP ==========
exports.verifyOTP = async (req, res) => {
  try {
    const { identifier, otp, otpType } = req.body;

    if (!identifier || !otp || !otpType) {
      return res.status(400).json({ 
        success: false, 
        message: 'Identifier, OTP, and type are required' 
      });
    }

    const result = await verifyOTP(identifier, otp, otpType);

    res.status(200).json({
      success: true,
      message: 'OTP verified successfully',
      data: {
        verified: true,
        identifierType: result.identifier,
      },
    });
  } catch (error) {
    console.error('Verify OTP Error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'OTP verification failed',
    });
  }
};

// ========== SIGNUP ==========
exports.signup = async (req, res) => {
  try {
    const { email, phone, firstName, lastName, password, confirmPassword } = req.body;

    // Validation
    if (!email || !firstName || !lastName || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'Passwords do not match' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 6 characters' 
      });
    }

    // Dynamic unique check query to prevent null unique key bugs
    const userSearchQuery = { email: email.toLowerCase() };
    if (phone) {
      const existingUser = await User.findOne({
        $or: [userSearchQuery, { phone }],
      });
      if (existingUser) {
        return res.status(400).json({ 
          success: false, 
          message: 'Email or phone already registered' 
        });
      }
    } else {
      const existingUser = await User.findOne(userSearchQuery);
      if (existingUser) {
        return res.status(400).json({ 
          success: false, 
          message: 'Email already registered' 
        });
      }
    }

    // Dynamic OTP verification query
    const otpSearchQuery = { type: 'signup', isVerified: true };
    if (phone) {
      otpSearchQuery.$or = [{ email: email.toLowerCase() }, { phone }];
    } else {
      otpSearchQuery.email = email.toLowerCase();
    }

    const otpRecord = await OTP.findOne(otpSearchQuery);
    if (!otpRecord) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please verify your email/phone with OTP first' 
      });
    }

    // Create new user
    const newUser = new User({
      email: email.toLowerCase(),
      phone: phone || undefined,
      firstName,
      lastName,
      password,
      isEmailVerified: true,
      isPhoneVerified: !!phone,
    });

    await newUser.save();

    // Send welcome email
    await sendWelcomeEmail(email, firstName);

    // Generate tokens
    const accessToken = generateToken(newUser._id, '1h');
    const refreshToken = generateRefreshToken(newUser._id);

    // Set refresh token in httpOnly cookie with cross-origin options
    res.cookie('refreshToken', refreshToken, getCookieOptions());

    // Clear verification OTP
    const otpDeleteQuery = { type: 'signup' };
    if (phone) {
      otpDeleteQuery.$or = [{ email: email.toLowerCase() }, { phone }];
    } else {
      otpDeleteQuery.email = email.toLowerCase();
    }
    await OTP.deleteMany(otpDeleteQuery);

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        user: {
          _id: newUser._id,
          email: newUser.email,
          phone: newUser.phone,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Signup failed',
    });
  }
};

// ========== LOGIN ==========
exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email/Phone and password are required' 
      });
    }

    // Find user by email or phone
    const user = await User.findOne({
      $or: [
        { email: identifier.toLowerCase() },
        { phone: identifier },
      ],
    }).select('+password');

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Check password
    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Generate tokens
    const accessToken = generateToken(user._id, '1h');
    const refreshToken = generateRefreshToken(user._id);

    // Set refresh token cookie with cross-origin options
    res.cookie('refreshToken', refreshToken, getCookieOptions());

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          _id: user._id,
          email: user.email,
          phone: user.phone,
          firstName: user.firstName,
          lastName: user.lastName,
          profilePicture: user.profilePicture,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Login failed',
    });
  }
};

// ========== FORGOT PASSWORD ==========
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // Don't reveal if email exists or not for security
      return res.status(200).json({
        success: true,
        message: 'If email exists, reset link has been sent',
      });
    }

    // Delete existing reset tokens
    await PasswordReset.deleteMany({ userId: user._id });

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Save reset token
    const passwordReset = new PasswordReset({
      userId: user._id,
      resetToken: resetTokenHash,
      resetTokenExpiry,
    });

    await passwordReset.save();

    // Create reset link
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Send email
    await sendPasswordResetEmail(email, resetLink);

    res.status(200).json({
      success: true,
      message: 'Password reset email sent',
      data: {
        email,
      },
    });
  } catch (error) {
    console.error('Forgot Password Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to send reset email',
    });
  }
};

// ========== RESET PASSWORD ==========
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;

    if (!token || !newPassword || !confirmPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'Token and new password are required' 
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'Passwords do not match' 
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 6 characters' 
      });
    }

    // Hash token
    const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // Find reset record
    const resetRecord = await PasswordReset.findOne({
      resetToken: resetTokenHash,
      resetTokenExpiry: { $gt: Date.now() },
      isUsed: false,
    });

    if (!resetRecord) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid or expired reset token' 
      });
    }

    // Find user
    const user = await User.findById(resetRecord.userId).select('+password');

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    // Mark reset token as used
    resetRecord.isUsed = true;
    await resetRecord.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successful',
      data: {
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to reset password',
    });
  }
};

// ========== REFRESH TOKEN ==========
exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({ 
        success: false, 
        message: 'Refresh token not found' 
      });
    }

    // Verify refresh token
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ 
          success: false, 
          message: 'Invalid refresh token' 
        });
      }

      // Generate new access token
      const newAccessToken = generateToken(decoded.id, '1h');

      res.status(200).json({
        success: true,
        message: 'New access token generated',
        data: {
          accessToken: newAccessToken,
        },
      });
    });
  } catch (error) {
    console.error('Refresh Token Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to refresh token',
    });
  }
};

// ========== LOGOUT ==========
exports.logout = async (req, res) => {
  try {
    // Clear cookie passing the same cross-origin parameters
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Logout Error:', error);
    res.status(500).json({
      success: false,
      message: 'Logout failed',
    });
  }
};

// ========== GET CURRENT USER ==========
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    console.error('Get Current User Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch user',
    });
  }
};