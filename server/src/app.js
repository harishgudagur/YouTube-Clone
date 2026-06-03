
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

const path =
  require("path");

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

app.use(
  express.json()
);

app.use(cors());

app.use(
  cookieParser()
);

app.use(
  helmet({
    crossOriginResourcePolicy:
      false,
  })
);

app.use(
  morgan("dev")
);

// Serve uploads
app.use(
  "/uploads",
  express.static(
    path.join(
      process.cwd(),
      "uploads"
    )
  )
);

// Routes
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

module.exports =
  app;

