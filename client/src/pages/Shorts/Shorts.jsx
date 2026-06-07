
// import {
//   useEffect,
//   useRef,
//   useState,
// } from "react";

// import {
//   FaHeart,
//   FaShare,
//   FaEye,
//   FaCommentDots,
//   FaVolumeUp,
//   FaVolumeMute,
// } from "react-icons/fa";

// import Navbar
// from "../../components/Navbar/Navbar";

// import Sidebar
// from "../../components/Sidebar/Sidebar";

// import API, {
//   getVideos,
//   getComments,
//   addComment,
//   subscribeChannel,
// } from "../../services/api";

// function Shorts() {
//   const [
//     videos,
//     setVideos,
//   ] = useState([]);

//   const [
//     activeVideo,
//     setActiveVideo,
//   ] = useState(0);

//   const [
//     showComments,
//     setShowComments,
//   ] = useState(false);

//   const [
//     comments,
//     setComments,
//   ] = useState([]);

//   const [
//     commentText,
//     setCommentText,
//   ] = useState("");

//   const [
//     selectedVideoId,
//     setSelectedVideoId,
//   ] = useState(null);

//   const [
//     muted,
//     setMuted,
//   ] = useState(true);

//   const [
//     paused,
//     setPaused,
//   ] = useState({});

//   const [
//     progress,
//     setProgress,
//   ] = useState({});

//   const [
//     showHeart,
//     setShowHeart,
//   ] = useState({});

//   const [
//     subscribed,
//     setSubscribed,
//   ] = useState({});

//   const videoRefs =
//     useRef([]);

//   const clickTimeout =
//     useRef(null);

//   const viewedVideos =
//     useRef(
//       new Set()
//     );

//   useEffect(() => {
//     fetchVideos();
//   }, []);


// useEffect(() => {
//   videoRefs.current.forEach(
//     (
//       video,
//       index
//     ) => {
//       if (!video)
//         return;

//       if (
//         index ===
//         activeVideo
//       ) {
//         video.pause();

//         video.currentTime =
//           0;

//         video.muted =
//           muted;

//         video
//           .play()
//           .then(() => {
//             // autoplay success
//           })
//           .catch(() => {
//             // browser blocked
//           });

//         const id =
//           videos[
//             index
//           ]?._id;

//         if (
//           id &&
//           !viewedVideos.current.has(
//             id
//           )
//         ) {
//           viewedVideos.current.add(
//             id
//           );

//           incrementView(
//             id
//           );
//         }
//       } else {
//         video.pause();
//       }
//     }
//   );
// }, [
//   activeVideo,
//   muted,
//   videos,
// ]);

//   const fetchVideos =
//     async () => {
//       try {
//         const res =
//           await getVideos();

//         const shorts =
//           res.data.filter(
//             (
//               video
//             ) =>
//               video.type ===
//               "short"
//           );

//         setVideos(shorts);

// const user =
//   JSON.parse(
//     localStorage.getItem(
//       "user"
//     ) || "null"
//   );

// const subscribedMap =
//   {};

// shorts.forEach(
//   (video) => {
//     const channelId =
//       video.userId?._id;

//     subscribedMap[
//       channelId
//     ] =
//       (
//   user?.subscribedChannels || []
// ).includes(channelId) || false;
//   }
// );

// setSubscribed(
//   subscribedMap
// );
//       } catch (
//         error
//       ) {
//         console.log(
//           error
//         );
//       }
//     };

//   const incrementView =
//     async (
//       videoId
//     ) => {
//       try {
//         await API.get(
//           `/video/${videoId}`
//         );

//         setVideos(
//           (
//             prev
//           ) =>
//             prev.map(
//               (
//                 item
//               ) =>
//                 item._id ===
//                 videoId
//                   ? {
//                       ...item,
//                       views:
//                         item.views +
//                         1,
//                     }
//                   : item
//             )
//         );
//       } catch (
//         error
//       ) {
//         console.log(
//           error
//         );
//       }
//     };


// const handleLike =
//   async (
//     videoId
//   ) => {
//     try {
//       const res =
//         await API.put(
//           `/video/like/${videoId}`
//         );

//       setVideos(
//         (
//           prev
//         ) =>
//           prev.map(
//             (
//               item
//             ) =>
//               item._id ===
//               videoId
//                 ? {
//                     ...item,
//                     likes:
//                       res
//                         .data
//                         .likes,
//                   }
//                 : item
//           )
//       );
//     } catch (
//       error
//     ) {
//       console.log(
//         error
//       );
//     }
//   };


//   const handleDoubleTap =
//     (
//       videoId
//     ) => {
//       handleLike(
//         videoId
//       );

//       setShowHeart(
//         (
//           prev
//         ) => ({
//           ...prev,
//           [videoId]:
//             true,
//         })
//       );

//       setTimeout(
//         () => {
//           setShowHeart(
//             (
//               prev
//             ) => ({
//               ...prev,
//               [videoId]:
//                 false,
//             })
//           );
//         },
//         900
//       );
//     };

//   const handleTap =
//     (
//       index,
//       videoId
//     ) => {
//       if (
//         clickTimeout.current
//       ) {
//         clearTimeout(
//           clickTimeout.current
//         );

//         clickTimeout.current =
//           null;

//         handleDoubleTap(
//           videoId
//         );
//       } else {
//         clickTimeout.current =
//           setTimeout(
//             () => {
//               const video =
//                 videoRefs
//                   .current[
//                   index
//                 ];

//               if (
//                 video.paused
//               ) {
//                 video.play();

//                 setPaused(
//                   (
//                     prev
//                   ) => ({
//                     ...prev,
//                     [videoId]:
//                       false,
//                   })
//                 );
//               } else {
//                 video.pause();

//                 setPaused(
//                   (
//                     prev
//                   ) => ({
//                     ...prev,
//                     [videoId]: true,
//                   })
//                 );
//               }

//               clickTimeout.current =
//                 null;
//             },
//             250
//           );
//       }
//     };

//   const openComments =
//     async (
//       videoId
//     ) => {
//       try {
//         const res =
//           await getComments(
//             videoId
//           );

//         setComments(
//           res.data
//         );

//         setSelectedVideoId(
//           videoId
//         );

//         setShowComments(
//           true
//         );
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
//           selectedVideoId,
//           commentText
//         );

//         const res =
//           await getComments(
//             selectedVideoId
//           );

//         setComments(
//           res.data
//         );

//         setCommentText(
//           ""
//         );
//       } catch (
//         error
//       ) {
//         console.log(
//           error
//         );
//       }
//     };

//   const handleSubscribe =
//     async (
//       channelId
//     ) => {
//       try {
//         const res =
//           await subscribeChannel(
//             channelId
//           );

//         setSubscribed(
//           (prev) => ({
//             ...prev,
//             [channelId]:
//               res.data
//                 .subscribed,
//           })
//         );

//         // update localStorage
//         localStorage.setItem(
//           "user",
//           JSON.stringify(
//             res.data.user
//           )
//         );
//       } catch (
//         error
//       ) {
//         console.log(
//           error
//         );
//       }
//     };

//   const handleScroll =
//     (
//       e
//     ) => {
//       const scrollTop =
//         e.target
//           .scrollTop;

//       const height =
//         window.innerHeight;

//       const index =
//         Math.round(
//           scrollTop /
//             height
//         );

//       setActiveVideo(
//         index
//       );
//     };

//   return (
//     <>
//       <Navbar />

//       <div
//         style={{
//           display:
//             "flex",
//           background:
//             "#000",
//           color:
//             "#fff",
//           height:
//             "100vh",
//           overflow:
//             "hidden",
//         }}
//       >
//         <Sidebar />

//         <div
//           onScroll={
//             handleScroll
//           }
//           style={{
//             flex: 1,

//             marginLeft:
//               window.innerWidth <
//               768
//                 ? "80px"
//                 : "240px",

//             overflowY:
//               "scroll",

//             height:"100vh",

//             scrollSnapType:
//               "y mandatory",

//             scrollbarWidth:
//               "none",
//           }}
//         >
//           {videos.map(
//             (
//               video,
//               index
//             ) => (
//               <div
//                 key={
//                   video._id
//                 }
//                 style={{
//                   height: "100vh",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   scrollSnapAlign: "start",
//                   paddingTop: "70px",
//                   boxSizing: "border-box",
//                 }}
//               >
//                 <div
//                   style={{
//                     position: "relative",
//                     width: "420px",
//                     maxWidth: "90vw",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   {/* Progress */}
//                   <div
//                     style={{
//                       position:
//                         "absolute",

//                       top:
//                         "10px",

//                       left:
//                         "10px",

//                       right:
//                         "10px",

//                       height:
//                         "4px",

//                       background:
//                         "rgba(255,255,255,0.2)",

//                       borderRadius:
//                         "20px",

//                       overflow:
//                         "hidden",

//                       zIndex:
//                         10,
//                     }}
//                   >
//                     <div
//                       style={{
//                         width:
//                           `${
//                             progress[
//                               video._id
//                             ] || 0
//                           }%`,

//                         height:
//                           "100%",

//                         background:
//                           "#ff0000",
//                       }}
//                     />
//                   </div>

//                   {/* Heart */}
//                   {showHeart[
//                     video._id
//                   ] && (
//                     <div
//                       style={{
//                         position:
//                           "absolute",

//                         top:
//                           "50%",

//                         left:
//                           "50%",

//                         transform:
//                           "translate(-50%,-50%)",

//                         fontSize:
//                           "120px",

//                         zIndex:
//                           100,

//                         animation:
//                           "pop 0.8s ease",

//                         pointerEvents:
//                           "none",
//                       }}
//                     >
//                       ❤️
//                     </div>
//                   )}

//                   <video
//   ref={(el) =>
//     (videoRefs.current[
//       index
//     ] = el)
//   }
//   autoPlay
//   muted={
//     index ===
//     activeVideo
//       ? muted
//       : true
//   }
//   loop
//   playsInline
//   preload="auto"
//   webkit-playsinline="true"
//   controls={false}
//   onLoadedMetadata={(
//     e
//   ) => {
//     const videoEl =
//       e.target;

//     if (
//       index ===
//       activeVideo
//     ) {
//       videoEl
//         .play()
//         .catch(
//           () => {}
//         );
//     }
//   }}
//   onClick={() =>
//     handleTap(
//       index,
//       video._id
//     )
//   }
//   onTimeUpdate={(
//     e
//   ) => {
//     const current =
//       e.target
//         .currentTime;

//     const duration =
//       e.target
//         .duration;

//     setProgress(
//       (prev) => ({
//         ...prev,
//         [video._id]:
//           duration
//             ? (
//                 current /
//                 duration
//               ) *
//               100
//             : 0,
//       })
//     );
//   }}
//   style={{
//     width: "100%",
//     maxWidth:
//       "420px",

//     height:
//       "84vh",

//     borderRadius:
//       "24px",

//     objectFit:
//       "contain",

//     background:
//       "#000",

//     cursor:
//       "pointer",

//     boxShadow:
//       "0 0 30px rgba(0,0,0,0.5)",
//   }}
// >
//   <source
//     src={video.videoUrl?.trim()}
//     type="video/mp4"
//   />

//   Your browser
//   does not
//   support video.
// </video>
//                   {/* Pause */}
//                   {paused[
//                     video._id
//                   ] && (
//                     <div
//                       style={{
//                         position:
//                           "absolute",

//                         top:
//                           "50%",

//                         left:
//                           "50%",

//                         transform:
//                           "translate(-50%,-50%)",

//                         fontSize:
//                           "70px",

//                         zIndex:
//                           20,
//                       }}
//                     >
//                       ⏸️
//                     </div>
//                   )}

//                   {/* Bottom */}
//                   <div
//                     style={{
//                       position: "absolute",
//                       bottom: "30px",
//                       left: "18px",
//                       zIndex: 10,
//                       width: "85%",
//                     }}
//                   >
//                     <div
//                       style={{
//                         display:
//                           "flex",

//                         alignItems:
//                           "center",

//                         gap:
//                           "12px",
//                       }}
//                     >
//                       <img
//                         src={
//                           video
//                             .userId
//                             ?.profilePic ||
//                           "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//                         }
//                         alt=""
//                         style={{
//                           width:
//                             "45px",

//                           height:
//                             "45px",

//                           borderRadius:
//                             "50%",

//                           objectFit:
//                             "contain",

//                           border:
//                             "2px solid #fff",
//                         }}
//                       />

//                       <div>
//                         <h3
//                           style={{
//                             margin: 0,
//                             fontSize: "18px",
//                             fontWeight: "600",
//                           }}
//                         >
//                                                   @
//                           {
//                             video
//                               .userId
//                               ?.username
//                           }
//                         </h3>

//                         <button
//                           onClick={() =>
//                             handleSubscribe(
//                               video
//                                 .userId
//                                 ?._id
//                             )
//                           }
//                           style={{
//                             background:
//                               subscribed[
//                                 video
//                                   .userId
//                                   ?._id
//                               ]
//                                 ? "#272727"
//                                 : "#ff0000",

//                             color:
//                               "#fff",

//                             border:
//                               "none",

//                             padding:
//                               "7px 16px",

//                             borderRadius:
//                               "999px",

//                             cursor:
//                               "pointer",

//                             marginTop:
//                               "5px",
//                           }}
//                         >
//                           {subscribed[
//                             video
//                               .userId
//                               ?._id
//                           ]
//                             ? "Subscribed"
//                             : "Subscribe"}
//                         </button>
//                       </div>
//                     </div>

//                     <p
//                       style={{
//                         marginTop: "10px",
//                         maxWidth: "280px",
//                         fontSize: "14px",
//                         lineHeight: "20px",
//                         color: "#f1f1f1",
//                       }}
//                     >
//                       {
//                         video.title
//                       }
//                     </p>
//                   </div>

//                   {/* Right Actions */}
//                   <div
//                     style={{
//                       position: "absolute",
//                       right:
//                         window.innerWidth < 768
//                           ? "-55px"
//                           : "-85px",

//                       bottom: "120px",

//                       display: "flex",
//                       flexDirection: "column",
//                       gap: "24px",
//                       alignItems: "center",
//                     }}
//                   >
//                     <div
//                       onClick={() =>
//                         handleLike(
//                           video._id
//                         )
//                       }
//                       style={{
//                         cursor:
//                           "pointer",

//                         textAlign:
//                           "center",
//                       }}
//                     >
//                       <FaHeart
//                         size={
//                           28
//                         }
//                       />

//                       <p>
//                         {
//                           video
//                             .likes
//                             ?.length
//                         }
//                       </p>
//                     </div>

//                     <div
//                       style={{
//                         textAlign:
//                           "center",
//                       }}
//                     >
//                       <FaEye
//                         size={
//                           28
//                         }
//                       />

//                       <p>
//                         {
//                           video.views
//                         }
//                       </p>
//                     </div>

//                     <div
//                       onClick={() =>
//                         openComments(
//                           video._id
//                         )
//                       }
//                       style={{
//                         cursor:
//                           "pointer",

//                         textAlign:
//                           "center",
//                       }}
//                     >
//                       <FaCommentDots
//                         size={
//                           28
//                         }
//                       />

//                       <p>
//                         Comment
//                       </p>
//                     </div>

//                     <div
//                       onClick={() => {
//                         navigator.clipboard.writeText(
//                           `${window.location.origin}/video/${video._id}`
//                         );

//                         alert(
//                           "Link copied!"
//                         );
//                       }}
//                       style={{
//                         cursor:
//                           "pointer",

//                         textAlign:
//                           "center",
//                       }}
//                     >
//                       <FaShare
//                         size={
//                           28
//                         }
//                       />

//                       <p>
//                         Share
//                       </p>
//                     </div>

//                     <div
//                       onClick={() => {
//                         const currentVideo =
//                           videoRefs.current[
//                             activeVideo
//                           ];

//                         if (
//                           currentVideo
//                         ) {
//                           currentVideo.muted =
//                             !muted;

//                           currentVideo
//                             .play();
//                         }

//                         setMuted(
//                           !muted
//                         );
//                       }}
//                       style={{
//                         cursor:
//                           "pointer",

//                         textAlign:
//                           "center",
//                       }}
//                     >
//                       {muted ? (
//                         <FaVolumeMute
//                           size={
//                             28
//                           }
//                         />
//                       ) : (
//                         <FaVolumeUp
//                           size={
//                             28
//                           }
//                         />
//                       )}

//                       <p>
//                         {muted
//                           ? "Muted"
//                           : "Sound"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )
//           )}
//         </div>

//         {/* Comments */}
//         {showComments && (
//           <div
//             style={{
//               width:
//                 window.innerWidth < 768
//                   ? "100%"
//                   : "380px",

//               background:
//                 "#181818",

//               borderLeft:
//                 "1px solid #333",

//               padding:
//                 "20px",

//               overflowY:
//                 "auto",
//             }}
//           >
//             <div
//               style={{
//                 display:
//                   "flex",

//                 justifyContent:
//                   "space-between",

//                 marginBottom:
//                   "20px",
//               }}
//             >
//               <h2>
//                 Comments
//               </h2>

//               <button
//                 onClick={() =>
//                   setShowComments(
//                     false
//                   )
//                 }
//                 style={{
//                   background:
//                     "none",

//                   border:
//                     "none",

//                   color:
//                     "#fff",

//                   fontSize:
//                     "24px",

//                   cursor:
//                     "pointer",
//                 }}
//               >
//                 ✕
//               </button>
//             </div>

//             <div
//               style={{
//                 display:
//                   "flex",

//                 gap:
//                   "10px",

//                 marginBottom:
//                   "20px",
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
//                 placeholder="Add comment..."
//                 style={{
//                   flex: 1,

//                   padding:
//                     "12px",

//                   border:
//                     "none",

//                   borderRadius:
//                     "10px",

//                   background:
//                     "#2b2b2b",

//                   color:
//                     "#fff",
//                 }}
//               />

//               <button
//                 onClick={
//                   handleComment
//                 }
//                 style={{
//                   border:
//                     "none",

//                   background:
//                     "#ff0000",

//                   color:
//                     "#fff",

//                   padding:
//                     "0 18px",

//                   borderRadius:
//                     "10px",

//                   cursor:
//                     "pointer",
//                 }}
//               >
//                 Post
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
//                     borderBottom:
//                       "1px solid #333",

//                     padding:
//                       "12px 0",
//                   }}
//                 >
//                   <h4>
//                     @
//                     {
//                       comment
//                         .userId
//                         ?.username
//                     }
//                   </h4>

//                   <p>
//                     {
//                       comment.text
//                     }
//                   </p>
//                 </div>
//               )
//             )}
//           </div>
//         )}
//       </div>

//       <style>
//         {`
//           @keyframes pop {
//             0% {
//               transform: translate(-50%,-50%) scale(0.3);
//               opacity: 0;
//             }

//             50% {
//               transform: translate(-50%,-50%) scale(1.2);
//               opacity: 1;
//             }

//             100% {
//               transform: translate(-50%,-50%) scale(1);
//               opacity: 0;
//             }
//           }
//         `}
//       </style>
//     </>
//   );
// }

// export default
// Shorts;



import { useEffect, useRef, useState } from "react";
import { FaHeart, FaShare, FaEye, FaCommentDots, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import API, { getVideos, getComments, addComment, subscribeChannel } from "../../services/api";

// --- SUB-COMPONENT: Individual Short Video ---
// Moving this to a separate component prevents the entire page from re-rendering 10x per second
const ShortVideo = ({ video, index, activeVideo, muted, onLike, onComment, onSubscribe, subscribed, setMuted }) => {
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const videoRef = useRef(null);

  // Handle Play/Pause/Mute logic based on the activeVideo index
  useEffect(() => {
    if (!videoRef.current) return;

    if (index === activeVideo) {
      videoRef.current.muted = muted;
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [activeVideo, muted, index]);

  const handleTap = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPaused(false);
    } else {
      videoRef.current.pause();
      setPaused(true);
    }
  };

  const handleDoubleTap = () => {
    onLike(video._id);
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 900);
  };

  // We use a custom double-tap detector
  const lastTap = useRef(0);
  const handleInteraction = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      handleDoubleTap();
    } else {
      handleTap();
    }
    lastTap.current = now;
  };

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", scrollSnapAlign: "start", paddingTop: "70px", boxSizing: "border-box" }}>
      <div style={{ position: "relative", width: "420px", maxWidth: "90vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
        
        {/* Progress Bar */}
        <div style={{ position: "absolute", top: "10px", left: "10px", right: "10px", height: "4px", background: "rgba(255,255,255,0.2)", borderRadius: "20px", overflow: "hidden", zIndex: 10 }}>
          <div style={{ width: `${progress}%`, height: "100%", background: "#ff0000", transition: "width 0.1s linear" }} />
        </div>

        {/* Heart Animation */}
        {showHeart && <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: "120px", zIndex: 100, animation: "pop 0.8s ease", pointerEvents: "none" }}>❤️</div>}

        <video
          ref={videoRef}
          loop playsInline preload="auto"
          onClick={handleInteraction}
          onTimeUpdate={(e) => {
            const { currentTime, duration } = e.target;
            setProgress(duration ? (currentTime / duration) * 100 : 0);
          }}
          style={{ width: "100%", maxWidth: "420px", height: "84vh", borderRadius: "24px", objectFit: "contain", background: "#000", cursor: "pointer", boxShadow: "0 0 30px rgba(0,0,0,0.5)" }}
        >
          <source src={video.videoUrl?.trim()} type="video/mp4" />
        </video>

        {paused && <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: "70px", zIndex: 20 }}>⏸️</div>}

        {/* Bottom Info */}
        <div style={{ position: "absolute", bottom: "30px", left: "18px", zIndex: 10, width: "85%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <img src={video.userId?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="" style={{ width: "45px", height: "45px", borderRadius: "50%", objectFit: "cover", border: "2px solid #fff" }} />
            <div>
              <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>@{video.userId?.username}</h3>
              <button onClick={() => onSubscribe(video.userId?._id)} style={{ background: subscribed[video.userId?._id] ? "#272727" : "#ff0000", color: "#fff", border: "none", padding: "7px 16px", borderRadius: "999px", cursor: "pointer", marginTop: "5px" }}>
                {subscribed[video.userId?._id] ? "Subscribed" : "Subscribe"}
              </button>
            </div>
          </div>
          <p style={{ marginTop: "10px", maxWidth: "280px", fontSize: "14px", color: "#f1f1f1" }}>{video.title}</p>
        </div>

        {/* Right Actions */}
        <div style={{ position: "absolute", right: "-60px", bottom: "120px", display: "flex", flexDirection: "column", gap: "24px", alignItems: "center" }}>
          <div onClick={() => onLike(video._id)} style={{ cursor: "pointer", textAlign: "center" }}><FaHeart size={28} /><p>{video.likes?.length || 0}</p></div>
          <div style={{ textAlign: "center" }}><FaEye size={28} /><p>{video.views}</p></div>
          <div onClick={() => onComment(video._id)} style={{ cursor: "pointer", textAlign: "center" }}><FaCommentDots size={28} /><p>Comment</p></div>
          <div onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/video/${video._id}`); alert("Link copied!"); }} style={{ cursor: "pointer", textAlign: "center" }}><FaShare size={28} /><p>Share</p></div>
          <div onClick={() => setMuted(!muted)} style={{ cursor: "pointer", textAlign: "center" }}>
            {muted ? <FaVolumeMute size={28} /> : <FaVolumeUp size={28} />}
            <p>{muted ? "Muted" : "Sound"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT: Shorts Page ---
function Shorts() {
  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [muted, setMuted] = useState(true);
  const [subscribed, setSubscribed] = useState({});

  useEffect(() => { fetchVideos(); }, []);

  const fetchVideos = async () => {
    try {
      const res = await getVideos();
      const shorts = res.data.filter(v => v.type === "short");
      setVideos(shorts);

      const user = JSON.parse(localStorage.getItem("user") || "null");
      const subscribedMap = {};
      shorts.forEach(v => {
        subscribedMap[v.userId?._id] = (user?.subscribedChannels || []).includes(v.userId?._id);
      });
      setSubscribed(subscribedMap);
    } catch (error) { console.error(error); }
  };

  const handleLike = async (videoId) => {
    try {
      const res = await API.put(`/video/like/${videoId}`);
      setVideos(prev => prev.map(v => v._id === videoId ? { ...v, likes: res.data.likes } : v));
    } catch (error) { console.error(error); }
  };

  const handleSubscribe = async (channelId) => {
    try {
      const res = await subscribeChannel(channelId);
      setSubscribed(prev => ({ ...prev, [channelId]: res.data.subscribed }));
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (error) { console.error(error); }
  };

  const openComments = async (videoId) => {
    try {
      const res = await getComments(videoId);
      setComments(res.data);
      setSelectedVideoId(videoId);
      setShowComments(true);
    } catch (error) { console.error(error); }
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;
    try {
      await addComment(selectedVideoId, commentText);
      const res = await getComments(selectedVideoId);
      setComments(res.data);
      setCommentText("");
    } catch (error) { console.error(error); }
  };

  const handleScroll = (e) => {
    const index = Math.round(e.target.scrollTop / window.innerHeight);
    if (index !== activeVideo) setActiveVideo(index);
  };

  return (
    <>
      <Navbar />
      <div style={{ display: "flex", background: "#000", color: "#fff", height: "100vh", overflow: "hidden" }}>
        <Sidebar />
        <div 
          onScroll={handleScroll} 
          style={{ flex: 1, marginLeft: "240px", overflowY: "scroll", height: "100vh", scrollSnapType: "y mandatory", scrollbarWidth: "none" }}
        >
          {videos.map((video, index) => (
            <ShortVideo 
              key={video._id} 
              video={video} 
              index={index} 
              activeVideo={activeVideo} 
              muted={muted} 
              setMuted={setMuted} 
              onLike={handleLike} 
              onComment={openComments} 
              onSubscribe={handleSubscribe} 
              subscribed={subscribed} 
            />
          ))}
        </div>

        {showComments && (
          <div style={{ width: "380px", background: "#181818", borderLeft: "1px solid #333", padding: "20px", overflowY: "auto", position: "absolute", right: 0, top: 0, height: "100vh", zIndex: 100 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
              <h2>Comments</h2>
              <button onClick={() => setShowComments(false)} style={{ background: "none", border: "none", color: "#fff", fontSize: "24px", cursor: "pointer" }}>✕</button>
            </div>
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              <input value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Add comment..." style={{ flex: 1, padding: "12px", border: "none", borderRadius: "10px", background: "#2b2b2b", color: "#fff" }} />
              <button onClick={handleComment} style={{ border: "none", background: "#ff0000", color: "#fff", padding: "0 18px", borderRadius: "10px", cursor: "pointer" }}>Post</button>
            </div>
            {comments.map(comment => (
              <div key={comment._id} style={{ borderBottom: "1px solid #333", padding: "12px 0" }}>
                <h4>@{comment.userId?.username}</h4>
                <p>{comment.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <style>{` @keyframes pop { 0% { transform: translate(-50%,-50%) scale(0.3); opacity: 0; } 50% { transform: translate(-50%,-50%) scale(1.2); opacity: 1; } 100% { transform: translate(-50%,-50%) scale(1); opacity: 0; } }`}</style>
    </>
  );
}

export default Shorts;
