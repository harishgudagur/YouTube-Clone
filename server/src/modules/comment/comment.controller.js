// const Comment =
//   require(
//     "./comment.model"
//   );

// const addComment =
//   async (
//     req,
//     res
//   ) => {
//     try {
//       const comment =
//         await Comment.create({
//           text:
//             req.body.text,

//           videoId:
//             req.params.id,

//           userId:
//             req.user.id,
//         });

//       return res
//         .status(201)
//         .json(comment);
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
//             "Failed to add comment",
//         });
//     }
//   };

// const getComments =
//   async (
//     req,
//     res
//   ) => {
//     try {
//       const comments =
//         await Comment.find({
//           videoId:
//             req.params.id,
//         })
//           .populate(
//             "userId",
//             "fullName username"
//           )
//           .sort({
//             createdAt:
//               -1,
//           });

//       return res
//         .status(200)
//         .json(comments);
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
//             "Failed to fetch comments",
//         });
//     }
//   };

// module.exports = {
//   addComment,
//   getComments,
// }; 


const Comment = require("./comment.model");

// ==========================================
// ADD COMMENT
// ==========================================
const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    // VALIDATION: Prevent empty comments or comments with only spaces
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Comment text cannot be empty" 
      });
    }

    // Limit comment length to prevent database abuse (e.g., 1000 chars)
    if (text.length > 1000) {
      return res.status(400).json({ 
        success: false, 
        message: "Comment is too long (max 1000 characters)" 
      });
    }

    const comment = await Comment.create({
      text: text.trim(), // Remove accidental spaces at start/end
      videoId: req.params.id,
      userId: req.user.id,
    });

    return res.status(201).json({
      success: true,
      comment,
    });
  } catch (error) {
    console.error("Add Comment Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add comment",
    });
  }
};

// ==========================================
// GET COMMENTS (With Pagination)
// ==========================================
const getComments = async (req, res) => {
  try {
    // We add a limit to prevent the server from crashing on viral videos
    const limit = 50; 
    
    const comments = await Comment.find({
      videoId: req.params.id,
    })
      .populate("userId", "fullName username profilePic") // Added profilePic for UI
      .sort({ createdAt: -1 })
      .limit(limit) // Only fetch the 50 most recent comments
      .lean(); // Performance boost: returns plain JS objects

    return res.status(200).json({
      success: true,
      count: comments.length,
      comments,
    });
  } catch (error) {
    console.error("Fetch Comments Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch comments",
    });
  }
};

module.exports = {
  addComment,
  getComments,
};
