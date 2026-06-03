const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require(
    "../../middlewares/auth.middleware"
  );

const {
  addToHistory,
  getHistory,
} = require(
  "./history.controller"
);

router.post(
  "/:id",
  authMiddleware,
  addToHistory
);

router.get(
  "/",
  authMiddleware,
  getHistory
);

module.exports =
  router;