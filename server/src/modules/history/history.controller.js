// const History =
//   require(
//     "./history.model"
//   );

// const addToHistory =
//   async (
//     req,
//     res
//   ) => {
//     try {
//       await History.create({
//         userId:
//           req.user.id,

//         videoId:
//           req.params.id,
//       });

//       return res
//         .status(200)
//         .json({
//           message:
//             "Added to history",
//         });
//     } catch (
//       error
//     ) {
//       console.log(
//         error
//       );

//       return res
//         .status(500)
//         .json({
//           message:
//             "History failed",
//         });
//     }
//   };

// const getHistory =
//   async (
//     req,
//     res
//   ) => {
//     try {
//       const history =
//         await History.find({
//           userId:
//             req.user.id,
//         })
//           .populate(
//             "videoId"
//           )
//           .sort({
//             createdAt:
//               -1,
//           });

//       return res
//         .status(200)
//         .json(history);
//     } catch (
//       error
//     ) {
//       console.log(
//         error
//       );

//       return res
//         .status(500)
//         .json({
//           message:
//             "Failed to fetch history",
//         });
//     }
//   };

// module.exports = {
//   addToHistory,
//   getHistory,
// };


const History = require("./history.model");

// ==========================================
// ADD TO HISTORY (Optimized to prevent duplicates)
// ==========================================
const addToHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const videoId = req.params.id;

    // la "Upsert" logic: Update existing entry or create new one
    // This ensures the history list stays clean and a video only appears once
    await History.findOneAndUpdate(
      { userId: userId, videoId: videoId }, // Look for this specific user-video pair
      { createdAt: new Date() },            // Update timestamp to move it to the top
      { 
        upsert: true,                        // If not found, create it
        new: true 
      }
    );

    return res.status(200).json({
      success: true,
      message: "History updated",
    });
  } catch (error) {
    console.error("History Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update history",
    });
  }
};

// ==========================================
// GET HISTORY (Performance Optimized)
// ==========================================
const getHistory = async (req, res) => {
  try {
    const history = await History.find({ userId: req.user.id })
      .populate("videoId") // Get the actual video data
      .sort({ createdAt: -1 }) // Newest first
      .lean(); // Converts Mongoose docs to plain JS objects (3x faster)

    return res.status(200).json(history);
  } catch (error) {
    console.error("Fetch History Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch history",
    });
  }
};

module.exports = {
  addToHistory,
  getHistory,
};
