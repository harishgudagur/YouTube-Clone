const History =
  require(
    "./history.model"
  );

const addToHistory =
  async (
    req,
    res
  ) => {
    try {
      await History.create({
        userId:
          req.user.id,

        videoId:
          req.params.id,
      });

      return res
        .status(200)
        .json({
          message:
            "Added to history",
        });
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
            "History failed",
        });
    }
  };

const getHistory =
  async (
    req,
    res
  ) => {
    try {
      const history =
        await History.find({
          userId:
            req.user.id,
        })
          .populate(
            "videoId"
          )
          .sort({
            createdAt:
              -1,
          });

      return res
        .status(200)
        .json(history);
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
            "Failed to fetch history",
        });
    }
  };

module.exports = {
  addToHistory,
  getHistory,
};