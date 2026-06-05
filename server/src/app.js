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

// CREATE APP FIRST
const app =
  express();

/* Middleware */
app.use(
  express.json({
    limit:
      "500mb",
  })
);

app.use(
  express.urlencoded(
    {
      extended:
        true,
      limit:
        "500mb",
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

/* Health route */
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