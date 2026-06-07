// const User =
//   require(
//     "./user.model"
//   );

// const Video =
//   require(
//     "../video/video.model"
//   );

// // Update Profile
// const updateProfile =
//   async (
//     req,
//     res
//   ) => {
//     try {
//       const user =
//         await User.findById(
//           req.user.id
//         );

//       if (!user) {
//         return res
//           .status(404)
//           .json({
//             message:
//               "User not found",
//           });
//       }

//       // Update text fields
//       if (
//         req.body.fullName
//       ) {
//         user.fullName =
//           req.body.fullName;
//       }

//       if (
//         req.body.username
//       ) {
//         user.username =
//           req.body.username;
//       }

//       // Remove profile pic
//       if (
//         req.body
//           .removeProfilePic ===
//         "true"
//       ) {
//         user.profilePic =
//           "";
//       }

//       // Cloudinary profile upload
//       if (
//         req.file
//       ) {
//         user.profilePic =
//           req.file.path;
//       }

//       await user.save();

//       return res
//         .status(200)
//         .json(user);
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
//             "Profile update failed",
//         });
//     }
//   };

// // Subscribe / Unsubscribe
// const subscribeChannel =
//   async (
//     req,
//     res
//   ) => {
//     try {
//       const currentUser =
//         await User.findById(
//           req.user.id
//         );

//       const channelId =
//         req.params.id;

//       if (
//         currentUser._id.toString() ===
//         channelId
//       ) {
//         return res
//           .status(400)
//           .json({
//             message:
//               "You cannot subscribe to yourself",
//           });
//       }

//       const channel =
//         await User.findById(
//           channelId
//         );

//       if (
//         !channel
//       ) {
//         return res
//           .status(404)
//           .json({
//             message:
//               "Channel not found",
//           });
//       }

//       const alreadySubscribed =
//         currentUser.subscribedChannels.some(
//           (id) =>
//             id.toString() ===
//             channelId
//         );

//       if (
//         alreadySubscribed
//       ) {
//         // Unsubscribe
//         currentUser.subscribedChannels =
//           currentUser.subscribedChannels.filter(
//             (id) =>
//               id.toString() !==
//               channelId
//           );

//         channel.subscribers =
//           channel.subscribers.filter(
//             (id) =>
//               id.toString() !==
//               req.user.id
//           );
//       } else {
//         // Subscribe
//         currentUser.subscribedChannels.push(
//           channelId
//         );

//         channel.subscribers.push(
//           req.user.id
//         );
//       }

//       await currentUser.save();
//       await channel.save();

//       const updatedUser =
//         await User.findById(
//           req.user.id
//         ).select(
//           "-password"
//         );

//       res.status(
//         200
//       ).json({
//         subscribed:
//           !alreadySubscribed,
//         user:
//           updatedUser,
//       });
//     } catch (
//       error
//     ) {
//       console.log(
//         error
//       );

//       res.status(
//         500
//       ).json({
//         message:
//           "Subscription failed",
//       });
//     }
//   };

// // Get subscription feed
// const getSubscriptionsFeed =
//   async (
//     req,
//     res
//   ) => {
//     try {
//       const user =
//         await User.findById(
//           req.user.id
//         );

//       if (
//         !user
//       ) {
//         return res
//           .status(
//             404
//           )
//           .json({
//             message:
//               "User not found",
//           });
//       }

//       const videos =
//         await Video.find(
//           {
//             userId: {
//               $in:
//                 user.subscribedChannels,
//             },

//             type: {
//               $ne:
//                 "short",
//             },
//           }
//         )
//           .populate(
//             "userId",
//             "username profilePic"
//           )
//           .sort({
//             createdAt:
//               -1,
//           });

//       res.status(
//         200
//       ).json(
//         videos
//       );
//     } catch (
//       error
//     ) {
//       console.log(
//         error
//       );

//       res.status(
//         500
//       ).json({
//         message:
//           "Failed to load subscriptions",
//       });
//     }
//   };

// // Get Channel
// const getChannel =
//   async (
//     req,
//     res
//   ) => {
//     try {
//       const user =
//         await User.findById(
//           req.params.id
//         ).select(
//           "-password"
//         );

//       if (
//         !user
//       ) {
//         return res
//           .status(404)
//           .json({
//             message:
//               "Channel not found",
//           });
//       }

//       const videos =
//         await Video.find(
//           {
//             userId:
//               user._id,
//           }
//         );

//       res.status(
//         200
//       ).json({
//         user,
//         videos,
//       });
//     } catch (
//       error
//     ) {
//       console.log(
//         error
//       );

//       res.status(
//         500
//       ).json({
//         message:
//           "Failed to load channel",
//       });
//     }
//   };

// module.exports =
//   {
//     updateProfile,
//     subscribeChannel,
//     getChannel,
//     getSubscriptionsFeed,
//   };


const User = require("./user.model");
const Video = require("../video/video.model");

// ==========================================
// UPDATE PROFILE
// ==========================================
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update text fields using a clean object
    if (req.body.fullName) user.fullName = req.body.fullName;
    if (req.body.username) user.username = req.body.username;

    // Handle Profile Picture logic
    if (req.body.removeProfilePic === "true") {
      user.profilePic = "";
    } else if (req.file) {
      user.profilePic = req.file.path;
    }

    await user.save();

    // IMPORTANT: Remove password before sending to frontend
    const updatedUser = await User.findById(user._id).select("-password");

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Profile Update Error:", error);
    return res.status(500).json({ message: "Profile update failed" });
  }
};

// ==========================================
// SUBSCRIBE / UNSUBSCRIBE (Atomic Version)
// ==========================================
const subscribeChannel = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const channelId = req.params.id;

    if (currentUserId === channelId) {
      return res.status(400).json({ message: "You cannot subscribe to yourself" });
    }

    const channel = await User.findById(channelId);
    if (!channel) return res.status(404).json({ message: "Channel not found" });

    const isAlreadySubscribed = currentUser.subscribedChannels.includes(channelId); // Simplified check

    if (isAlreadySubscribed) {
      // ATOMIC UNSUBSCRIBE
      await User.findByIdAndUpdate(currentUserId, { $pull: { subscribedChannels: channelId } });
      await User.findByIdAndUpdate(channelId, { $pull: { subscribers: currentUserId } });
    } else {
      // ATOMIC SUBSCRIBE
      await User.findByIdAndUpdate(currentUserId, { $addToSet: { subscribedChannels: channelId } });
      await User.findByIdAndUpdate(channelId, { $addToSet: { subscribers: currentUserId } });
    }

    // Fetch updated user without password
    const updatedUser = await User.findById(currentUserId).select("-password");

    res.status(200).json({
      subscribed: !isAlreadySubscribed,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Subscription Error:", error);
    res.status(500).json({ message: "Subscription failed" });
  }
};

// ==========================================
// SUBSCRIPTION FEED
// ==========================================
const getSubscriptionsFeed = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const videos = await Video.find({
      userId: { $in: user.subscribedChannels },
      type: { $ne: "short" },
    })
    .populate("userId", "username profilePic")
    .sort({ createdAt: -1 });

    res.status(200).json(videos);
  } catch (error) {
    console.error("Feed Error:", error);
    res.status(500).json({ message: "Failed to load subscriptions" });
  }
};

// ==========================================
// GET CHANNEL
// ==========================================
const getChannel = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "Channel not found" });

    const videos = await Video.find({ userId: user._id }).sort({ createdAt: -1 });

    res.status(200).json({ user, videos });
  } catch (error) {
    console.error("Channel Error:", error);
    res.status(500).json({ message: "Failed to load channel" });
  }
};

module.exports = {
  updateProfile,
  subscribeChannel,
  getChannel,
  getSubscriptionsFeed,
};
