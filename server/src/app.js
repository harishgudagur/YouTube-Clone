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
    origin: process.env.FRONTEND_URL ? process.env.FRONTEND_URL.replace(/\/$/, "") : "http://localhost:5173",
    credentials: true,
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

/* Serve uploads */
app.use(
  "/uploads",
  express.static(
    path.join(
      process.cwd(),
      "uploads"
    )
  )
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