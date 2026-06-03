const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require(
    "../../middlewares/auth.middleware"
  );

const {
  addComment,
  getComments,
} = require(
  "./comment.controller"
);

router.post(
  "/:id",
  authMiddleware,
  addComment
);

router.get(
  "/:id",
  getComments
);

module.exports =
  router;