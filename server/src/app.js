const express =
  require("express");

const cors =
  require("cors");

const cookieParser =
  require(
    "cookie-parser"
  );

const helmet =
  require("helmet");

const morgan =
  require("morgan");

const videoRoutes =
  require(
    "./modules/video/video.routes"
  );

const authRoutes =
  require(
    "./modules/auth/auth.routes"
  );

const commentRoutes =
  require(
    "./modules/comment/comment.routes"
  );

const historyRoutes =
  require(
    "./modules/history/history.routes"
  );

const userRoutes =
  require(
    "./modules/user/user.routes"
  );

const app =
  express();

/* Middleware */
app.use(
  express.json({
    limit:
      "100mb",
  })
);

app.use(
  express.urlencoded(
    {
      extended:
        true,
      limit:
        "100mb",
    }
  )
);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://you-tube-clone-delta-tan.vercel.app",
      "https://you-tube-clone-enzarplln-harishgudagurs-projects.vercel.app",
    ],

    credentials:
      true,
  })
);

app.use(
  cookieParser()
);

app.use(
  helmet({
    crossOriginResourcePolicy:
      false,
    crossOriginOpenerPolicy:
      false,
    crossOriginEmbedderPolicy:
      false,
  })
);

app.use(
  morgan("dev")
);

/* Routes */
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/video",
  videoRoutes
);

app.use(
  "/api/comment",
  commentRoutes
);

app.use(
  "/api/history",
  historyRoutes
);

app.use(
  "/api/user",
  userRoutes
);

/* Root */
app.get(
  "/",
  (
    req,
    res
  ) => {
    res.send(
      "YouTube Clone API Running..."
    );
  }
);

/* Global Error Handler */
app.use(
  (
    err,
    req,
    res,
    next
  ) => {
    console.error(
      err
    );

    res.status(
      500
    ).json({
      success:
        false,
      message:
        err.message ||
        "Server Error",
    });
  }
);

module.exports =
  app;