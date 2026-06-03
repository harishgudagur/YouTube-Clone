const Comment =
  require(
    "./comment.model"
  );

const addComment =
  async (
    req,
    res
  ) => {
    try {
      const comment =
        await Comment.create({
          text:
            req.body.text,

          videoId:
            req.params.id,

          userId:
            req.user.id,
        });

      return res
        .status(201)
        .json(comment);
    } catch (
      error
    ) {
      console.log(
        error
      );

      return res
        .status(500)
        .json({
          message:
            "Failed to add comment",
        });
    }
  };

const getComments =
  async (
    req,
    res
  ) => {
    try {
      const comments =
        await Comment.find({
          videoId:
            req.params.id,
        })
          .populate(
            "userId",
            "fullName username"
          )
          .sort({
            createdAt:
              -1,
          });

      return res
        .status(200)
        .json(comments);
    } catch (
      error
    ) {
      console.log(
        error
      );

      return res
        .status(500)
        .json({
          message:
            "Failed to fetch comments",
        });
    }
  };

module.exports = {
  addComment,
  getComments,
};