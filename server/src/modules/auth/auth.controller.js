// const jwt =
//   require(
//     "jsonwebtoken"
//   );

// const User =
//   require(
//     "../user/user.model"
//   );

// // Generate JWT
// const generateToken =
//   (id) => {
//     return jwt.sign(
//       { id },
//       process.env
//         .JWT_SECRET,
//       {
//         expiresIn:
//           "7d",
//       }
//     );
//   };

// // ==================
// // SIGNUP
// // ==================
// const signup =
//   async (
//     req,
//     res
//   ) => {
//     try {
//       const {
//         email,
//         password,
//         fullName,
//       } = req.body;

//       if (
//         !email ||
//         !password
//       ) {
//         return res
//           .status(400)
//           .json({
//             success:
//               false,
//             message:
//               "Email and password are required",
//           });
//       }

//       const existingUser =
//         await User.findOne(
//           {
//             email:
//               email.toLowerCase(),
//           }
//         );

//       if (
//         existingUser
//       ) {
//         return res
//           .status(400)
//           .json({
//             success:
//               false,
//             message:
//               "User already exists",
//           });
//       }

//       const username =
//         email.split(
//           "@"
//         )[0];

//       const user =
//         await User.create(
//           {
//             email:
//               email.toLowerCase(),

//             password,

//             fullName:
//               fullName ||
//               username,

//             username,
//           }
//         );

//       const token =
//         generateToken(
//           user._id
//         );

//       res.status(
//         201
//       ).json({
//         success:
//           true,
//         token,
//         user,
//       });
//     } catch (
//       error
//     ) {
//       console.log(
//         error
//       );

//       res.status(
//         500
//       ).json({
//         success:
//           false,
//         message:
//           error.message,
//       });
//     }
//   };

// // ==================
// // LOGIN
// // ==================
// const login =
//   async (
//     req,
//     res
//   ) => {
//     try {
//       const {
//         email,
//         password,
//       } = req.body;

//       if (
//         !email ||
//         !password
//       ) {
//         return res
//           .status(400)
//           .json({
//             success:
//               false,
//             message:
//               "Email and password are required",
//           });
//       }

//       const user =
//         await User.findOne(
//           {
//             email:
//               email.toLowerCase(),
//           }
//         ).select(
//           "+password"
//         );

//       if (
//         !user
//       ) {
//         return res
//           .status(401)
//           .json({
//             success:
//               false,
//             message:
//               "Invalid credentials",
//           });
//       }

//       const isMatch =
//         await user.matchPassword(
//           password
//         );

//       if (
//         !isMatch
//       ) {
//         return res
//           .status(401)
//           .json({
//             success:
//               false,
//             message:
//               "Invalid credentials",
//           });
//       }

//       const token =
//         generateToken(
//           user._id
//         );

//       res.status(
//         200
//       ).json({
//         success:
//           true,
//         token,
//         user,
//       });
//     } catch (
//       error
//     ) {
//       console.log(
//         error
//       );

//       res.status(
//         500
//       ).json({
//         success:
//           false,
//         message:
//           error.message,
//       });
//     }
//   };

// // ==================
// // OAUTH LOGIN
// // ==================
// const oauthLogin =
//   async (
//     req,
//     res
//   ) => {
//     try {
//       const {
//         email,
//         fullName,
//         profilePic,
//       } = req.body;

//       if (
//         !email
//       ) {
//         return res
//           .status(400)
//           .json({
//             success:
//               false,
//             message:
//               "Email required",
//           });
//       }

//       let user =
//         await User.findOne(
//           {
//             email:
//               email.toLowerCase(),
//           }
//         );

//       // Create new user if not exists
//       if (
//         !user
//       ) {
//         const username =
//           email.split(
//             "@"
//           )[0];

//         user =
//           await User.create(
//             {
//               email:
//                 email.toLowerCase(),

//               fullName:
//                 fullName ||
//                 username,

//               username,

//               profilePic,

//               password:
//                 "oauth-user",
//             }
//           );
//       }

//       const token =
//         generateToken(
//           user._id
//         );

//       res.status(
//         200
//       ).json({
//         success:
//           true,
//         token,
//         user,
//       });
//     } catch (
//       error
//     ) {
//       console.log(
//         error
//       );

//       res.status(
//         500
//       ).json({
//         success:
//           false,
//         message:
//           error.message,
//       });
//     }
//   };

// // ==================
// // PROFILE
// // ==================
// const profile =
//   async (
//     req,
//     res
//   ) => {
//     try {
//       const user =
//         await User.findById(
//           req.user.id
//         ).select(
//           "-password"
//         );

//       if (
//         !user
//       ) {
//         return res
//           .status(404)
//           .json({
//             success:
//               false,
//             message:
//               "User not found",
//           });
//       }

//       res.status(
//         200
//       ).json({
//         success:
//           true,
//         user,
//       });
//     } catch (
//       error
//     ) {
//       console.log(
//         error
//       );

//       res.status(
//         500
//       ).json({
//         success:
//           false,
//         message:
//           error.message,
//       });
//     }
//   };

// module.exports =
//   {
//     signup,
//     login,
//     oauthLogin,
//     profile,
//   };

const jwt = require("jsonwebtoken");
const User = require("./user.model");
const crypto = require("crypto"); // Built-in Node module for random strings

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ==================
// SIGNUP
// ==================
const signup = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // FIX: Ensure username is unique by adding a random string
    const baseUsername = email.split("@")[0];
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const username = `${baseUsername}_${randomId}`;

    const user = await User.create({
      email: email.toLowerCase(),
      password, // Ensure bcrypt is used in user.model.js pre-save hook!
      fullName: fullName || baseUsername,
      username,
    });

    const token = generateToken(user._id);

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================
// LOGIN
// ==================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      success: true,
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================
// OAUTH LOGIN
// ==================
const oauthLogin = async (req, res) => {
  try {
    const { email, fullName, profilePic } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email required" });
    }

    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      const baseUsername = email.split("@")[0];
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const username = `${baseUsername}_${randomId}`;

      user = await User.create({
        email: email.toLowerCase(),
        fullName: fullName || baseUsername,
        username,
        profilePic,
        // FIX: Set password to a random long string so it's impossible to guess
        password: crypto.randomBytes(32).toString("hex"), 
      });
    }

    const token = generateToken(user._id);

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      success: true,
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error("OAuth Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================
// PROFILE
// ==================
const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Profile Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { signup, login, oauthLogin, profile };
