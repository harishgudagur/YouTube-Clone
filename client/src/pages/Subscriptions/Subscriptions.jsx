
// import {
//   useEffect,
//   useState,
// } from "react";

// import {
//   Link,
// } from "react-router-dom";

// import Navbar
// from "../../components/Navbar/Navbar";

// import Sidebar
// from "../../components/Sidebar/Sidebar";

// import API
// from "../../services/api";

// function Subscriptions() {
//   const [
//     videos,
//     setVideos,
//   ] = useState([]);

//   const [
//     loading,
//     setLoading,
//   ] = useState(
//     true
//   );

//   useEffect(() => {
//     fetchSubscriptions();
//   }, []);


// const fetchSubscriptions =
//   async () => {
//     try {
//       const res =
//         await API.get(
//           "/user/subscriptions"
//         );

//       setVideos(
//         res.data
//       );
//     } catch (
//       error
//     ) {
//       console.log(
//         error
//       );
//     } finally {
//       setLoading(
//         false
//       );
//     }
//   };



//   return (
//     <>
//       <Navbar />

//       <div
//         style={{
//           display:
//             "flex",
//           background:
//             "#0f0f0f",
//           minHeight:
//             "100vh",
//           color:
//             "#fff",
//         }}
//       >
//         <Sidebar />

//         <div
//           style={{
//             flex: 1,

//             marginLeft:
//               window.innerWidth <
//               768
//                 ? "80px"
//                 : "240px",

//             padding:
//               "95px 30px",
//           }}
//         >
//           <h1
//             style={{
//               marginBottom:
//                 "30px",
//               fontSize:
//                 "32px",
//             }}
//           >
//             📺 Subscriptions
//           </h1>

//           {loading ? (
//             <h2>
//               Loading...
//             </h2>
//           ) : videos.length ===
//             0 ? (
//             <div
//               style={{
//                 textAlign:
//                   "center",
//                 marginTop:
//                   "100px",
//               }}
//             >
//               <h2>
//                 No
//                 subscriptions
//                 yet 😕
//               </h2>

//               <p
//                 style={{
//                   color:
//                     "#aaa",
//                 }}
//               >
//                 Subscribe to
//                 channels to
//                 see videos
//                 here.
//               </p>
//             </div>
//           ) : (
//             <div
//               style={{
//                 display:
//                   "grid",

//                 gridTemplateColumns:
//                   "repeat(auto-fill, minmax(340px,1fr))",

//                 gap:
//                   "28px",
//               }}
//             >
//               {videos.map(
//                 (
//                   video
//                 ) => (
//                   <Link
//                     key={
//                       video._id
//                     }
//                     to={`/video/${video._id}`}
//                     style={{
//                       textDecoration:
//                         "none",

//                       color:
//                         "#fff",
//                     }}
//                   >
//                     <div
//                       style={{
//                         cursor:
//                           "pointer",
//                       }}
//                     >
//                       {/* Thumbnail */}
//                       <div
//                         style={{
//                           width:
//                             "100%",

//                           height:
//                             "220px",

//                           borderRadius:
//                             "18px",

//                           overflow:
//                             "hidden",

//                           background:
//                             "#181818",
//                         }}
//                       >
//                         <img
//                           src={
//                             video.thumbnail ||
//                             "https://via.placeholder.com/500x280"
//                           }
//                           alt=""
//                           style={{
//                             width:
//                               "100%",

//                             height:
//                               "100%",

//                             objectFit:
//                               "cover",
//                           }}
//                         />
//                       </div>

//                       {/* Info */}
//                       <div
//                         style={{
//                           display:
//                             "flex",

//                           gap:
//                             "12px",

//                           marginTop:
//                             "14px",
//                         }}
//                       >
//                         {/* Channel Pic */}
//                         <img
//                           src={
//                             video
//                               .userId
//                               ?.profilePic ||
//                             "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//                           }
//                           alt=""
//                           style={{
//                             width:
//                               "42px",

//                             height:
//                               "42px",

//                             borderRadius:
//                               "50%",

//                             objectFit:
//                               "cover",
//                           }}
//                         />

//                         <div>
//                           <h3
//                             style={{
//                               margin:
//                                 0,

//                               fontSize:
//                                 "17px",

//                               lineHeight:
//                                 "1.4",
//                             }}
//                           >
//                             {
//                               video.title
//                             }
//                           </h3>

//                           <p
//                             style={{
//                               color:
//                                 "#aaa",

//                               margin:
//                                 "6px 0 0",

//                               fontSize:
//                                 "14px",
//                             }}
//                           >
//                             {
//                               video
//                                 .userId
//                                 ?.username
//                             }
//                           </p>

//                           <p
//                             style={{
//                               color:
//                                 "#aaa",

//                               fontSize:
//                                 "14px",

//                               margin:
//                                 "4px 0",
//                             }}
//                           >
//                             👁️{" "}
//                             {
//                               video.views
//                             }{" "}
//                             views •{" "}
//                             {new Date(
//                               video.createdAt
//                             ).toLocaleDateString()}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 )
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default
// Subscriptions;


import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import VideoCard from "../../components/VideoCard/VideoCard"; // Import the reusable component
import API from "../../services/api";

function Subscriptions() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const res = await API.get("/user/subscriptions");
      setVideos(res.data);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          display: "flex",
          background: "#0f0f0f",
          minHeight: "100vh",
          color: "#fff",
        }}
      >
        <Sidebar />

        <div
          style={{
            flex: 1,
            // Fixed the responsiveness bug: use a fixed margin
            marginLeft: "240px", 
            padding: "95px 30px",
          }}
        >
          <h1 style={{ marginBottom: "30px", fontSize: "32px" }}>
            📺 Subscriptions
          </h1>

          {loading ? (
            <div style={{ color: "#aaa", marginTop: "40px" }}>
              <h2>Loading your feed...</h2>
            </div>
          ) : videos.length === 0 ? (
            <div style={{ textAlign: "center", marginTop: "100px" }}>
              <h2 style={{ color: "#fff" }}>No subscriptions yet 😕</h2>
              <p style={{ color: "#aaa" }}>Subscribe to channels to see videos here.</p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: "28px",
              }}
            >
              {videos.map((video) => (
                /* Use the VideoCard component instead of manual HTML for consistency */
                <VideoCard key={video._id} video={video} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Subscriptions;

