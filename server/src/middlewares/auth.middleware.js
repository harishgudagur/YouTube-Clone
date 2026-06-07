// const jwt = require("jsonwebtoken");
// const User = require("../modules/user/user.model"); // Or User model if we need to query user in verify

// const protect = async (req, res, next) => {
//   try {
//     let token;

//     // Check Authorization header
//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith("Bearer")
//     ) {
//       token = req.headers.authorization.split(" ")[1];
//     }

//     // No token
//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Not authorized, token missing",
//       });
//     }

//     // Verify token synchronously
//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET
//     );

//     req.user = decoded;
//     req.userId = decoded.id;

//     next();
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: "Invalid token",
//     });
//   }
// };

// const optionalAuth = async (req, res, next) => {
//   try {
//     let token;
//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith("Bearer")
//     ) {
//       token = req.headers.authorization.split(" ")[1];
//     }

//     if (token) {
//       try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         req.userId = decoded.id;
//       } catch (err) {
//         // Suppress verification errors for optional auth
//       }
//     }
//     next();
//   } catch (error) {
//     next();
//   }
// };

// const authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!req.user) {
//       return res.status(401).json({
//         success: false,
//         message: "Not authorized",
//       });
//     }

//     if (roles && !roles.includes(req.user.role)) {
//       return res.status(403).json({
//         success: false,
//         message: "Access denied",
//       });
//     }

//     next();
//   };
// };

// // Smart CommonJS Trick: export protect directly but attach optionalAuth and authorize as properties
// protect.protect = protect;
// protect.optionalAuth = optionalAuth;
// protect.authorize = authorize;

// module.exports = protect;

const jwt =
  require(
    "jsonwebtoken"
  );

const User =
  require(
    "../user/user.model"
  );

const protect =
  async (
    req,
    res,
    next
  ) => {
    try {
      let token;

      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith(
          "Bearer"
        )
      ) {
        token =
          req.headers.authorization.split(
            " "
          )[1];
      }

      if (!token) {
        return res
          .status(401)
          .json({
            success:
              false,
            message:
              "Not authorized, no token",
          });
      }

      const decoded =
        jwt.verify(
          token,
          process.env.JWT_SECRET
        );

      req.user =
        await User.findById(
          decoded.id
        ).select(
          "-password"
        );

      next();
    } catch (
      error
    ) {
      console.log(
        error
      );

      return res
        .status(401)
        .json({
          success:
            false,
          message:
            "Not authorized",
        });
    }
  };

module.exports =
  protect;