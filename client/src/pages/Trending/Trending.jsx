
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
//   getVideos,
// } from "../../services/api";

// function Trending() {
//   const [
//     videos,
//     setVideos,
//   ] = useState([]);

//   const isMobile =
//     window.innerWidth <
//     768;

//   useEffect(() => {
//     fetchTrending();
//   }, []);

//   const fetchTrending =
//     async () => {
//       try {
//         const res =
//           await getVideos();

//         // Keep your logic
//         const sorted =
//           res.data
//             .filter(
//               (
//                 video
//               ) =>
//                 video.type !==
//                 "short"
//             )
//             .sort(
//               (
//                 a,
//                 b
//               ) =>
//                 b.views -
//                 a.views
//             );

//         setVideos(
//           sorted
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
//               isMobile
//                 ? "80px"
//                 : "240px",
//             padding:
//               "95px 30px",
//           }}
//         >
//           {/* Header */}
//           <div
//             style={{
//               display:
//                 "flex",
//               alignItems:
//                 "center",
//               gap:
//                 "10px",
//               marginBottom:
//                 "30px",
//             }}
//           >
//             <h1
//               style={{
//                 fontSize:
//                   isMobile
//                     ? "26px"
//                     : "34px",
//                 margin:
//                   0,
//               }}
//             >
//               🔥 Trending
//             </h1>

//             {/* <span
//               style={{
//                 color:
//                   "#aaa",
//                 fontSize:
//                   "14px",
//               }}
//             >
//               Most watched
//               videos
//             </span> */}
//           </div>

//           {/* Empty */}
//           {videos.length ===
//           0 ? (
//             <div
//               style={{
//                 textAlign:
//                   "center",
//                 marginTop:
//                   "100px",
//               }}
//             >
//               <h2>
//                 No trending
//                 videos 😕
//               </h2>

//               <p
//                 style={{
//                   color:
//                     "#aaa",
//                 }}
//               >
//                 Try again
//                 later
//               </p>
//             </div>
//           ) : (
//             <div
//               style={{
//                 display:
//                   "grid",
//                 gridTemplateColumns:
//                   isMobile
//                     ? "1fr"
//                     : "repeat(auto-fill, minmax(340px, 1fr))",
//                 gap:
//                   "28px",
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

// export default Trending;





import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import VideoCard from "../../components/VideoCard/VideoCard";
import { getVideos } from "../../services/api";

function Trending() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    fetchTrending();
  }, []);

  const fetchTrending = async () => {
    try {
      setLoading(true);
      const res = await getVideos();

      // Filter out shorts and sort by views (Descending)
      const sorted = res.data
        .filter((video) => video.type !== "short")
        .sort((a, b) => b.views - a.views);

      setVideos(sorted);
    } catch (error) {
      console.error("Error fetching trending videos:", error);
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
            // Fixed the responsiveness bug: Use a stable margin.
            // For mobile, this should be handled via CSS @media queries.
            marginLeft: "240px", 
            padding: "95px 30px",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "30px",
            }}
          >
            <h1 style={{ fontSize: "34px", margin: 0 }}>
              🔥 Trending
            </h1>
          </div>

          {loading ? (
            <div style={{ color: "#aaa", marginTop: "40px" }}>
              <h2>Loading trending videos...</h2>
            </div>
          ) : videos.length === 0 ? (
            <div style={{ textAlign: "center", marginTop: "100px" }}>
              <h2 style={{ color: "#fff" }}>No trending videos 😕</h2>
              <p style={{ color: "#aaa" }}>Try again later</p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                // This is naturally responsive; it will fit 1 or many columns automatically
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: "28px",
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

export default Trending;
