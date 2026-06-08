
// import {
//   useEffect,
//   useState,
// } from "react";

// import {
//   useParams,
//   useNavigate,
//   Link,
// } from "react-router-dom";

// import toast from "react-hot-toast";

// import {
//   FaThumbsUp,
//   FaShare,
//   FaDownload,
//   FaClock,
//   FaTrash,
// } from "react-icons/fa";

// import Navbar
// from "../../components/Navbar/Navbar";

// import Sidebar
// from "../../components/Sidebar/Sidebar";

// import {
//   getVideo,
//   likeVideo,
//   deleteVideo,
//   addComment,
//   getComments,
//   subscribeChannel,
//   addToHistory,
//   getRelatedVideos,
//   toggleWatchLater,
// } from "../../services/api";

// function VideoDetails() {
//   const { id } =
//     useParams();

//   const navigate =
//     useNavigate();

//   const [
//     video,
//     setVideo,
//   ] = useState(null);

//   const [
//     relatedVideos,
//     setRelatedVideos,
//   ] = useState([]);

//   const [
//     comments,
//     setComments,
//   ] = useState([]);

//   const [
//     commentText,
//     setCommentText,
//   ] = useState("");

//   const [
//     subscribed,
//     setSubscribed,
//   ] = useState(false);

//   const [
//     saved,
//     setSaved,
//   ] = useState(false);

//   const [
//     liked,
//     setLiked,
//   ] = useState(false);

//   const user =
//     JSON.parse(
//       localStorage.getItem(
//         "user"
//       ) || "null"
//     );

//   useEffect(() => {
//   if (!id) return;

//   // Clear previous video
//   setVideo(null);
//   setComments([]);
//   setRelatedVideos([]);

//   const loadData =
//     async () => {
//       await fetchVideo();
//       await fetchComments();
//       await fetchRelatedVideos();

//       addToHistory(id);

//       // Scroll top when opening new video
//       window.scrollTo(
//         0,
//         0
//       );
//     };

//   loadData();
// }, [id]);

// const fetchVideo =
//   async () => {
//     try {
//       const res =
//         await getVideo(id);

//       const videoData =
//         res.data;

//       setVideo(
//         videoData
//       );

//       const storedUser =
//         JSON.parse(
//           localStorage.getItem(
//             "user"
//           )
//         );

//       // safe channel id
//       const channelId =
//         typeof videoData.userId ===
//         "object"
//           ? videoData
//               .userId
//               ?._id
//           : videoData.userId;

//       // subscribed state
//       const alreadySubscribed =
//         storedUser?.subscribedChannels?.includes(
//           channelId
//         );

//       setSubscribed(
//         alreadySubscribed ||
//           false
//       );

//       // watch later
//       setSaved(
//         (
//           videoData?.watchLater ||
//           []
//         ).includes(
//           storedUser?._id
//         )
//       );

//       // liked
//       setLiked(
//         (
//           videoData?.likes ||
//           []
//         ).includes(
//           storedUser?._id
//         )
//       );
//     } catch (
//       error
//     ) {
//       console.log(
//         error
//       );

//       toast.error(
//         "Video not found"
//       );

//       // redirect if deleted
//       navigate("/");
//     }
//   };

//   const fetchComments =
//     async () => {
//       try {
//         const res =
//           await getComments(id);

//         setComments(
//           res.data
//         );
//       } catch (
//         error
//       ) {
//         console.log(
//           error
//         );
//       }
//     };

//   const fetchRelatedVideos =
//     async () => {
//       try {
//         const res =
//           await getRelatedVideos(
//             id
//           );

//         setRelatedVideos(
//           res.data
//         );
//       } catch (
//         error
//       ) {
//         console.log(
//           error
//         );
//       }
//     };

//   const handleLike =
//     async () => {
//       try {
//         await likeVideo(
//           id
//         );

//         setLiked(
//           !liked
//         );

//         fetchVideo();

//         toast.success(
//           liked
//             ? "Unliked"
//             : "Liked"
//         );
//       } catch (
//         error
//       ) {
//         console.log(
//           error
//         );
//       }
//     };

//   const handleWatchLater =
//     async () => {
//       try {
//         await toggleWatchLater(
//           id
//         );

//         setSaved(
//           !saved
//         );

//         toast.success(
//           saved
//             ? "Removed"
//             : "Saved"
//         );
//       } catch (
//         error
//       ) {
//         console.log(
//           error
//         );
//       }
//     };

//   const handleDelete =
//     async () => {
//       try {
//         await deleteVideo(
//           id
//         );

//         toast.success(
//           "Video Deleted"
//         );

//         navigate("/");
//       } catch (
//         error
//       ) {
//         console.log(
//           error
//         );
//       }
//     };

//   const handleComment =
//     async () => {
//       if (
//         !commentText.trim()
//       )
//         return;

//       try {
//         await addComment(
//           id,
//           commentText
//         );

//         setCommentText(
//           ""
//         );

//         fetchComments();

//         toast.success(
//           "Comment Added"
//         );
//       } catch (
//         error
//       ) {
//         console.log(
//           error
//         );
//       }
//     };


// const handleSubscribe =
//   async () => {
//     try {
//       const res =
//         await subscribeChannel(
//           video.userId._id
//         );

//       const updatedUser =
//         res.data.user;

//       localStorage.setItem(
//         "user",
//         JSON.stringify(
//           updatedUser
//         )
//       );

//       const subscribedNow =
//         updatedUser.subscribedChannels.includes(
//           video.userId._id
//         );

//       setSubscribed(
//         subscribedNow
//       );

//       // update count instantly
//       setVideo(
//         (
//           prev
//         ) => ({
//           ...prev,
//           userId: {
//             ...prev.userId,
//             subscribers:
//               subscribedNow
//                 ? [
//                     ...(prev
//                       .userId
//                       .subscribers ||
//                       []),
//                     updatedUser._id,
//                   ]
//                 : (
//                     prev
//                       .userId
//                       .subscribers ||
//                     []
//                   ).filter(
//                     (
//                       id
//                     ) =>
//                       id !==
//                       updatedUser._id
//                   ),
//           },
//         })
//       );

//       toast.success(
//         subscribedNow
//           ? "Subscribed"
//           : "Unsubscribed"
//       );
//     } catch (
//       error
//     ) {
//       console.log(
//         error
//       );

//       toast.error(
//         "Failed"
//       );
//     }
//   };


//   if (!video) {
//   return (
//     <>
//       <Navbar />
//       <Sidebar />

//       <div
//         style={{
//           marginLeft:
//             window.innerWidth <
//             768
//               ? "80px"
//               : "240px",

//           padding:
//             "120px 40px",

//           color:
//             "#fff",
//         }}
//       >
//         <h1>
//           Loading...
//         </h1>
//       </div>
//     </>
//   );
// }

// return (
//   <>
//     <Navbar />

//     <div
//       style={{
//         background:
//           "#0f0f0f",
//         minHeight:
//           "100vh",
//         color:
//           "#fff",
//       }}
//     >
//       <Sidebar />

//       <div
//         style={{
//           marginLeft:
//             window.innerWidth <
//             768
//               ? "80px"
//               : "240px",

//           padding:
//             "95px 30px",

//           display: "grid",

//           gridTemplateColumns:
//             window.innerWidth < 1100
//               ? "1fr"
//               : "minmax(0,1.8fr) 380px",

//           gap: "28px",

//           alignItems: "start",
//         }}
//       >
//         {/* LEFT */}
//         <div
//           style={{
//             width: "100%",
//             minWidth: 0,
//           }}
//         >
// {/* Video */}
// <div
//   style={{
//     width: "100%",
//     display: "flex",
//     justifyContent: "center",
//     marginBottom: "20px",
//   }}
// >
//   <div
//     style={{
//       width:
//         video.type === "short"
//           ? "380px"
//           : "100%",
//       maxWidth: "1000px",

//       aspectRatio:
//         video.type === "short"
//           ? "9 / 16"
//           : "16 / 9",

//       background: "#000",
//       borderRadius: "18px",
//       overflow: "hidden",

//       border:
//         "1px solid #272727",

//       boxShadow:
//         "0 10px 30px rgba(0,0,0,0.35)",
//     }}
//   >
//     <video
//       controls
//       playsInline
//       preload="metadata"
//       poster={video.thumbnail}
//       style={{
//         width: "100%",
//         height: "100%",
//         objectFit:
//           video.type === "short"
//             ? "cover"
//             : "contain",

//         background: "#000",
//       }}
//     >
//       <source
//         src={video.videoUrl?.trim()}
//         type="video/mp4"
//       />
//     </video>
//   </div>
// </div>

//           {/* Title */}
//           <h1
//             style={{
//               marginTop: "18px",
//               marginBottom: "12px",
//               fontSize: "28px",
//               fontWeight: "700",
//               color: "#fff",
//               lineHeight: "1.4",
//             }}
//           >
//             {
//               video.title
//             }
//           </h1>

//           {/* Buttons */}
//           <div
//             style={{
//               display:
//                 "flex",

//               gap:
//                 "12px",

//               flexWrap:
//                 "wrap",

//               margin:
//                 "20px 0",
//             }}
//           >
//             <button
//               onClick={
//                 handleLike
//               }
//               style={{
//                 ...buttonStyle,
//                 background:
//                   liked
//                     ? "#fff"
//                     : "#272727",

//                 color:
//                   liked
//                     ? "#000"
//                     : "#fff",
//               }}
//             >
//               <FaThumbsUp />
//               {" "}
//               {
//                 video.likes
//                   ?.length ||
//                 0
//               }
//             </button>

//             <button
//               onClick={
//                 handleWatchLater
//               }
//               style={{
//                 ...buttonStyle,
//                 background:
//                   saved
//                     ? "#fff"
//                     : "#272727",

//                 color:
//                   saved
//                     ? "#000"
//                     : "#fff",
//               }}
//             >
//               <FaClock />
//               {" "}
//               {saved
//                 ? "Saved"
//                 : "Watch Later"}
//             </button>

//             <button
//               onClick={() => {
//                 navigator.clipboard.writeText(
//                   window.location.href
//                 );

//                 toast.success(
//                   "Copied"
//                 );
//               }}
//               style={
//                 buttonStyle
//               }
//             >
//               <FaShare />
//               {" "}
//               Share
//             </button>

//             <a
//               href={
//                 video.videoUrl
//               }
//               download
//             >
//               <button
//                 style={
//                   buttonStyle
//                 }
//               >
//                 <FaDownload />
//                 {" "}
//                 Download
//               </button>
//             </a>

//             {user?._id ===
//               video.userId
//                 ?._id && (
//               <button
//                 onClick={
//                   handleDelete
//                 }
//                 style={{
//                   ...buttonStyle,
//                   background:
//                     "#ff0000",
//                 }}
//               >
//                 <FaTrash />
//                 {" "}
//                 Delete
//               </button>
//             )}
//           </div>

          
//           {/* Channel */}
//           <div
//             style={{
//               background:
//                 "#181818",
//               border:
//                 "1px solid #272727",
//               borderRadius:
//                 "18px",
//               padding:
//                 "18px 24px",
//               display:
//                 "flex",
//               justifyContent:
//                 "space-between",
//               alignItems:
//                 "center",
//               marginBottom:
//                 "28px",
//             }}
//           >
//             {/* Left */}
//             <div
//               style={{
//                 display:
//                   "flex",
//                 alignItems:
//                   "center",
//                 gap: "16px",
//               }}
//             >
//               <img
//                 src={
//                   video?.userId?.profilePic?.trim()
//                     ? video.userId.profilePic
//                     : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//                 }
//                 alt=""
//                 style={{
//                   width:
//                     "58px",
//                   height:
//                     "58px",
//                   borderRadius:
//                     "50%",
//                   objectFit:
//                     "cover",
//                 }}
//               />

//               <div>
//                 <h3
//                   style={{
//                     margin: 0,
//                     fontSize:
//                       "18px",
//                     fontWeight:
//                       "600",
//                     color:
//                       "#fff",
//                   }}
//                 >
//                   {video?.userId
//                     ?.fullName ||
//                     "Unknown"}
//                 </h3>

//                 <p
//                   style={{
//                     margin:
//                       "4px 0",
//                     color:
//                       "#aaa",
//                     fontSize:
//                       "14px",
//                   }}
//                 >
//                   @
//                   {video?.userId
//                     ?.username ||
//                     "unknown"}
//                 </p>

//                 <span
//                   style={{
//                     color:
//                       "#888",
//                     fontSize:
//                       "13px",
//                   }}
//                 >
//                   {video?.userId
//                     ?.subscribers
//                     ?.length ||
//                     0}{" "}
//                   subscribers
//                 </span>
//               </div>
//             </div>

//             {/* Subscribe */}
//             {user?._id !==
//               video?.userId
//                 ?._id && (
//               <button
//                 onClick={
//                   handleSubscribe
//                 }
//                 style={{
//                   background:
//                     subscribed
//                       ? "#2f2f2f"
//                       : "#ff0000",

//                   color:
//                     "#fff",

//                   border:
//                     subscribed
//                       ? "1px solid #444"
//                       : "none",

//                   padding:
//                     "12px 24px",

//                   borderRadius:
//                     "999px",

//                   fontWeight:
//                     "600",

//                   fontSize:
//                     "15px",

//                   cursor:
//                     "pointer",

//                   transition:
//                     "0.25s ease",

//                   minWidth:
//                     "145px",

//                   height:
//                     "48px",

//                   boxShadow:
//                     subscribed
//                       ? "none"
//                       : "0 6px 18px rgba(255,0,0,0.25)",
//                 }}
//                 onMouseEnter={(
//                   e
//                 ) => {
//                   e.target.style.transform =
//                     "scale(1.04)";
//                 }}
//                 onMouseLeave={(
//                   e
//                 ) => {
//                   e.target.style.transform =
//                     "scale(1)";
//                 }}
//               >
//                 {subscribed
//                   ? "✓ Subscribed"
//                   : "Subscribe"}
//               </button>
//             )}
//           </div>

//           {/* Comments */}
//           <div
//             style={{
//               background:
//                 "#181818",

//               border:
//                 "1px solid #272727",

//               borderRadius:
//                 "18px",

//               padding:
//                 "20px",
//             }}
//           >
//             <h2>
//               Comments (
//               {
//                 comments.length
//               }
//               )
//             </h2>

//             <div
//               style={{
//                 display:
//                   "flex",

//                 gap:
//                   "10px",

//                 margin:
//                   "20px 0",
//               }}
//             >
//               <input
//                 value={
//                   commentText
//                 }
//                 onChange={(
//                   e
//                 ) =>
//                   setCommentText(
//                     e.target
//                       .value
//                   )
//                 }
//                 placeholder="Add a comment..."
//                 style={{
//                   flex: 1,

//                   padding:
//                     "15px 18px",

//                   borderRadius:
//                     "999px",

//                   border:
//                     "1px solid #333",

//                   background:
//                     "#272727",

//                   color:
//                     "#fff",

//                   outline:
//                     "none",

//                   fontSize:
//                     "15px",
//                 }}
//               />

//               <button
//                 onClick={
//                   handleComment
//                 }
//                 style={{
//                   ...buttonStyle,
//                   background:
//                     "#ff0000",
//                   color:
//                     "#fff",
//                 }}
//               >
//                 Comment
//               </button>
//             </div>

//             {comments.map(
//               (
//                 comment
//               ) => (
//                 <div
//                   key={
//                     comment._id
//                   }
//                   style={{
//                     display: "flex",

//                     gap: "14px",

//                     padding: "18px 0",

//                     borderBottom:
//                       "1px solid #272727",
//                   }}
//                 >
//                   {/* Profile */}
//                   <img
//                     src={
//                       comment
//                         .userId
//                         ?.profilePic ||
//                       "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//                     }
//                     alt=""
//                     style={{
//                       width: "42px",

//                       height: "42px",

//                       borderRadius:
//                         "50%",

//                       objectFit:
//                         "cover",

//                       flexShrink: 0,
//                     }}
//                   />

//                   {/* Comment Content */}
//                   <div
//                     style={{
//                       flex: 1,
//                     }}
//                   >
//                     <div
//                       style={{
//                         display:
//                           "flex",

//                         alignItems:
//                           "center",

//                         gap: "10px",

//                         marginBottom:
//                           "6px",
//                       }}
//                     >
//                       <h4
//                         style={{
//                           margin: 0,

//                           fontSize:
//                             "14px",

//                           fontWeight:
//                             "600",

//                           color:
//                             "#fff",
//                         }}
//                       >
//                         @
//                         {
//                           comment
//                             .userId
//                             ?.username
//                         }
//                       </h4>

//                       <span
//                         style={{
//                           color:
//                             "#888",

//                           fontSize:
//                             "13px",
//                         }}
//                       >
//                         {new Date(
//                           comment.createdAt
//                         ).toLocaleDateString()}
//                       </span>
//                     </div>

//                     <p
//                       style={{
//                         margin: 0,

//                         color:
//                           "#ddd",

//                         fontSize:
//                           "15px",

//                         lineHeight:
//                           "1.6",
//                       }}
//                     >
//                       {
//                         comment.text
//                       }
//                     </p>
//                   </div>
//                 </div>
//               )
//             )}
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div
//           style={{
//             width: "100%",
//             maxWidth: "400px",

//             position: "sticky",
//             top: "90px",

//             alignSelf: "start",
//           }}
//         >
//           <h2>
//             Recommended
//           </h2>

//           {relatedVideos.map(
//             (
//               item
//             ) => (
//               <Link
//                 key={item._id}
//                 to={`/video/${item._id}`}
//                 onClick={() => {
//                   setVideo(
//                     null
//                   );
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",

//                     gap: "12px",

//                     marginBottom: "16px",

//                     padding: "10px",

//                     borderRadius: "14px",

//                     background: "#181818",

//                     transition: "0.2s",

//                     cursor: "pointer",
//                   }}
//                 >
//                   <img
//   src={
//     item.thumbnail ||
//     "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1000"
//   }
//   alt=""
//   onError={(e) => {
//     e.target.src =
//       "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1000";
//   }}
//   style={{
//     width: "170px",
//     height: "96px",
//     objectFit: "cover",
//     borderRadius: "12px",
//     flexShrink: 0,
//   }}
// />

//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <h4
//                       style={{
//                         margin: 0,
//                         color: "#fff",
//                         fontSize: "15px",
//                         lineHeight: "1.4",
//                       }}
//                     >
//                       {
//                         item.title
//                       }
//                     </h4>

//                     <p
//                       style={{
//                         color:
//                           "#aaa",
//                       }}
//                     >
//                       {
//                         item.views
//                       }{" "}
//                       views
//                     </p>
//                   </div>
//                 </div>
//               </Link>
//             )
//           )}
//         </div>
//       </div>
//     </div>
//   </>
// );

// }

// const buttonStyle = {
//   border: "none",

//   padding: "12px 18px",

//   borderRadius: "999px",

//   cursor: "pointer",

//   background: "#272727",

//   color: "#fff",

//   fontWeight: "600",

//   display: "flex",

//   alignItems: "center",

//   gap: "8px",

//   transition: "0.2s",
// };

// export default
// VideoDetails;
import React, {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
  Link,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  FaThumbsUp,
  FaShare,
  FaDownload,
  FaClock,
  FaTrash,
} from "react-icons/fa";

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

import {
  getVideo,
  likeVideo,
  deleteVideo,
  addComment,
  getComments,
  subscribeChannel,
  addToHistory,
  getRelatedVideos,
  toggleWatchLater,
} from "../../services/api";

function VideoDetails() {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [
    video,
    setVideo,
  ] = useState(null);

  const [
    relatedVideos,
    setRelatedVideos,
  ] = useState([]);

  const [
    comments,
    setComments,
  ] = useState([]);

  const [
    commentText,
    setCommentText,
  ] = useState("");

  const [
    subscribed,
    setSubscribed,
  ] = useState(false);

  const [
    saved,
    setSaved,
  ] = useState(false);

  const [
    liked,
    setLiked,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      ) || "null"
    );

  useEffect(() => {
    if (!id) return;

    loadPageData();
  }, [id]);

  const loadPageData =
    async () => {
      setLoading(true);

      try {
        const [
          videoRes,
          commentsRes,
          relatedRes,
        ] =
          await Promise.all(
            [
              getVideo(id),
              getComments(
                id
              ),
              getRelatedVideos(
                id
              ),
            ]
          );

        const videoData =
          videoRes.data;

        setVideo(
          videoData
        );

        // FIX COMMENTS
        const commentsData =
          Array.isArray(
            commentsRes.data
          )
            ? commentsRes.data
            : commentsRes
                .data
                ?.comments ||
              [];

        setComments(
          commentsData
        );

        // FIX RELATED VIDEOS
        const relatedData =
          Array.isArray(
            relatedRes.data
          )
            ? relatedRes.data
            : relatedRes
                .data
                ?.videos ||
              [];

        setRelatedVideos(
          relatedData
        );

        await addToHistory(
          id
        );

        const channelId =
          typeof videoData.userId ===
          "object"
            ? videoData
                .userId
                ?._id
            : videoData.userId;

        setSubscribed(
          (
            user?.subscribedChannels ||
            []
          ).includes(
            channelId
          )
        );

        setSaved(
          (
            videoData?.watchLater ||
            []
          ).includes(
            user?._id
          )
        );

        setLiked(
          (
            videoData?.likes ||
            []
          ).includes(
            user?._id
          )
        );
      } catch (
        error
      ) {
        console.log(
          error
        );

        toast.error(
          "Video not found"
        );

        navigate("/");
      } finally {
        setLoading(
          false
        );

        window.scrollTo(
          0,
          0
        );
      }
    };

  const handleLike =
    async () => {
      try {
        await likeVideo(
          id
        );

        setLiked(
          !liked
        );

        toast.success(
          liked
            ? "Unliked"
            : "Liked"
        );

        const res =
          await getVideo(
            id
          );

        setVideo(
          res.data
        );
      } catch (
        error
      ) {
        console.log(
          error
        );
      }
    };

  const handleWatchLater =
    async () => {
      try {
        await toggleWatchLater(
          id
        );

        setSaved(
          !saved
        );

        toast.success(
          saved
            ? "Removed"
            : "Saved"
        );
      } catch (
        error
      ) {
        console.log(
          error
        );
      }
    };

  const handleDelete =
    async () => {
      try {
        await deleteVideo(
          id
        );

        toast.success(
          "Video Deleted"
        );

        navigate("/");
      } catch (
        error
      ) {
        console.log(
          error
        );
      }
    };

  const handleComment =
    async () => {
      if (
        !commentText.trim()
      )
        return;

      try {
        await addComment(
          id,
          commentText
        );

        setCommentText(
          ""
        );

        const res =
          await getComments(
            id
          );

        const updatedComments =
          Array.isArray(
            res.data
          )
            ? res.data
            : res.data
                ?.comments ||
              [];

        setComments(
          updatedComments
        );

        toast.success(
          "Comment Added"
        );
      } catch (
        error
      ) {
        console.log(
          error
        );
      }
    };

  const handleSubscribe =
    async () => {
      try {
        const res =
          await subscribeChannel(
            video.userId
              ._id
          );

        const updatedUser =
          res.data.user;

        localStorage.setItem(
          "user",
          JSON.stringify(
            updatedUser
          )
        );

        const subscribedNow =
          updatedUser.subscribedChannels.includes(
            video.userId
              ._id
          );

        setSubscribed(
          subscribedNow
        );

        toast.success(
          subscribedNow
            ? "Subscribed"
            : "Unsubscribed"
        );
      } catch (
        error
      ) {
        console.log(
          error
        );
      }
    };

  if (
    loading ||
    !video
  ) {
    return (
      <>
        <Navbar />
        <Sidebar />

        <div
          style={{
            marginLeft:
              "240px",
            padding:
              "120px 40px",
            color:
              "#fff",
          }}
        >
          <h1>
            Loading...
          </h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          background:
            "#0f0f0f",
          minHeight:
            "100vh",
          color:
            "#fff",
        }}
      >
        <Sidebar />

        <div
          style={{
            marginLeft:
              "240px",
            padding:
              "95px 30px",
          }}
        >
          <h1>
            {
              video.title
            }
          </h1>

          {/* COMMENTS */}
          <div>
            <h2>
              Comments (
              {
                comments.length
              }
              )
            </h2>

            <input
              value={
                commentText
              }
              onChange={(
                e
              ) =>
                setCommentText(
                  e
                    .target
                    .value
                )
              }
              placeholder="Add comment"
            />

            <button
              onClick={
                handleComment
              }
            >
              Comment
            </button>

            {Array.isArray(
              comments
            ) &&
              comments.map(
                (
                  comment
                ) => (
                  <div
                    key={
                      comment._id
                    }
                  >
                    <h4>
                      @
                      {comment
                        ?.userId
                        ?.username ||
                        "User"}
                    </h4>

                    <p>
                      {
                        comment.text
                      }
                    </p>
                  </div>
                )
              )}
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoDetails;