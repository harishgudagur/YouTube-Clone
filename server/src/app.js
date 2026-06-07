// const express =
//   require("express");

// const cors =
//   require("cors");

// const cookieParser =
//   require(
//     "cookie-parser"
//   );

// const helmet =
//   require("helmet");

// const morgan =
//   require("morgan");

// const videoRoutes =
//   require(
//     "./modules/video/video.routes"
//   );

// const authRoutes =
//   require(
//     "./modules/auth/auth.routes"
//   );

// const commentRoutes =
//   require(
//     "./modules/comment/comment.routes"
//   );

// const historyRoutes =
//   require(
//     "./modules/history/history.routes"
//   );

// const userRoutes =
//   require(
//     "./modules/user/user.routes"
//   );

// const app =
//   express();

// /* Middleware */
// app.use(
//   express.json({
//     limit:
//       "100mb",
//   })
// );

// app.use(
//   express.urlencoded(
//     {
//       extended:
//         true,
//       limit:
//         "100mb",
//     }
//   )
// );

// /* CORS FIX */
// app.use(
//   cors({
//     origin: function (
//       origin,
//       callback
//     ) {
//       const allowedOrigins =
//         [
//           "http://localhost:5173",

//           "https://you-tube-clone-delta-tan.vercel.app",
//         ];

//       // allow localhost
//       if (!origin) {
//         return callback(
//           null,
//           true
//         );
//       }

//       // allow fixed domains
//       if (
//         allowedOrigins.includes(
//           origin
//         )
//       ) {
//         return callback(
//           null,
//           true
//         );
//       }

//       // allow ALL vercel preview URLs
//       if (
//         origin.includes(
//           "vercel.app"
//         )
//       ) {
//         return callback(
//           null,
//           true
//         );
//       }

//       return callback(
//         new Error(
//           "Not allowed by CORS"
//         )
//       );
//     },

//     credentials:
//       true,

//     methods: [
//       "GET",
//       "POST",
//       "PUT",
//       "PATCH",
//       "DELETE",
//       "OPTIONS",
//     ],

//     allowedHeaders:
//       [
//         "Content-Type",
//         "Authorization",
//       ],
//   })
// );

// app.use(
//   cookieParser()
// );

// app.use(
//   helmet({
//     crossOriginResourcePolicy:
//       false,

//     crossOriginOpenerPolicy:
//       false,

//     crossOriginEmbedderPolicy:
//       false,
//   })
// );

// app.use(
//   morgan("dev")
// );

// /* Routes */
// app.use(
//   "/api/auth",
//   authRoutes
// );

// app.use(
//   "/api/video",
//   videoRoutes
// );

// app.use(
//   "/api/comment",
//   commentRoutes
// );

// app.use(
//   "/api/history",
//   historyRoutes
// );

// app.use(
//   "/api/user",
//   userRoutes
// );

// /* Root */
// app.get(
//   "/",
//   (
//     req,
//     res
//   ) => {
//     res.send(
//       "YouTube Clone API Running..."
//     );
//   }
// );

// /* Global Error Handler */
// app.use(
//   (
//     err,
//     req,
//     res,
//     next
//   ) => {
//     console.error(
//       err
//     );

//     res.status(
//       500
//     ).json({
//       success:
//         false,

//       message:
//         err.message ||
//         "Server Error",
//     });
//   }
// );

// module.exports =
//   app;


const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");

// Import Modular Routes
const videoRoutes = require("./modules/video/video.routes");
const authRoutes = require("./modules/auth/auth.routes");
const commentRoutes = require("./modules/comment/comment.routes");
const historyRoutes = require("./modules/history/history.routes");
const userRoutes = require("./modules/user/user.routes");

const app = express();

/* -------------------------------------------------------------------------- */
/*                                 MIDDLEWARE                                  */
/* -------------------------------------------------------------------------- */

// 1. Body Parsers: Handles JSON and URL-encoded data (100MB limit for large videos)
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

// 2. Dynamic CORS Configuration
// This allows your app to work on Localhost, your Vercel domain, and Vercel previews
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173",
        "https://you-tube-clone-delta-tan.vercel.app",
      ];

      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin) || origin.includes("vercel.app")) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 3. Cookie Parser: For handling cookies (if used)
app.use(cookieParser());

// 4. Helmet: Security headers to protect against common web vulnerabilities
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// 5. Morgan: Logs every request to the console (vital for debugging on Render)
app.use(morgan("dev"));

/* -------------------------------------------------------------------------- */
/*                                   ROUTES                                    */
/* -------------------------------------------------------------------------- */

// Root endpoint for health checks
app.get("/", (req, res) => {
  res.send("YouTube Clone API is running successfully...");
});

// All API routes are prefixed with /api
app.use("/api/auth", authRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/user", userRoutes);

/* -------------------------------------------------------------------------- */
/*                                ERROR HANDLING                               */
/* -------------------------------------------------------------------------- */

// 404 Handler: For routes that don't exist
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global Error Handler: Catches all server crashes and returns a clean JSON response
app.use((err, req, res, next) => {
  console.error("🚨 GLOBAL ERROR:", err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    // Only show stack trace in development mode
    stack: process.env.NODE_ENV === "development" ? err.stack : "HIDDEN",
  });
});

// ============================================================================
// CRITICAL: Exporting the 'app' object. 
// This is what allows server.js to call app.listen()
// ============================================================================
module.exports = app;
