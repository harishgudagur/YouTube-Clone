// import {
//   useEffect,
//   useState,
// } from "react";

// import Navbar
// from "../../components/Navbar/Navbar";

// import Sidebar
// from "../../components/Sidebar/Sidebar";

// import VideoCard
// from "../../components/VideoCard/VideoCard";

// import {
//   getWatchLater,
// } from "../../services/api";

// function WatchLater() {
//   const [
//     videos,
//     setVideos,
//   ] = useState([]);

//   useEffect(() => {
//     fetchVideos();
//   }, []);

//   const fetchVideos =
//     async () => {
//       try {
//         const res =
//           await getWatchLater();

//         setVideos(
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
//           <h1>
//             ⏰ Watch Later
//           </h1>

//           {videos.length ===
//           0 ? (
//             <p
//               style={{
//                 color:
//                   "#aaa",
//               }}
//             >
//               No videos
//               saved
//             </p>
//           ) : (
//             <div
//               style={{
//                 display:
//                   "grid",

//                 gridTemplateColumns:
//                   "repeat(auto-fill,minmax(320px,1fr))",

//                 gap:
//                   "25px",

//                 marginTop:
//                   "30px",
//               }}
//             >
//               {videos.map(
//                 (
//                   video
//                 ) => (
//                   <VideoCard
//                     key={
//                       video._id
//                     }
//                     video={
//                       video
//                     }
//                   />
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
// WatchLater;


import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import VideoCard from "../../components/VideoCard/VideoCard";
import { getWatchLater } from "../../services/api";

function WatchLater() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state to prevent flickering

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const res = await getWatchLater();
      setVideos(res.data);
    } catch (error) {
      console.error("Error fetching watch later videos:", error);
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
            // Fixed the responsiveness bug: use a stable margin
            marginLeft: "240px", 
            padding: "95px 30px",
          }}
        >
          <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
            ⏰ Watch Later
          </h1>

          {loading ? (
            <div style={{ color: "#aaa", marginTop: "40px" }}>
              <h2>Loading your saved videos...</h2>
            </div>
          ) : videos.length === 0 ? (
            <div style={{ textAlign: "center", marginTop: "100px" }}>
              <h2 style={{ color: "#fff" }}>No videos saved 😕</h2>
              <p style={{ color: "#aaa" }}>Videos you save for later will appear here.</p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "25px",
                marginTop: "30px",
              }}
            >
              {videos.map((video) => (
                <VideoCard key={video._id} video={video} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default WatchLater;
