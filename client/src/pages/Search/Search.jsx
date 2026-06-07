// import {
//   useEffect,
//   useState,
// } from "react";

// import {
//   useParams,
//   Link,
// } from "react-router-dom";

// import Navbar
//   from "../../components/Navbar/Navbar";

// import Sidebar
//   from "../../components/Sidebar/Sidebar";

// import {
//   searchVideos,
// } from "../../services/api";

// function Search() {
//   const {
//     query,
//   } = useParams();

//   const [
//     videos,
//     setVideos,
//   ] = useState([]);

//   useEffect(() => {
//     fetchVideos();
//   }, [query]);

//   const fetchVideos =
//     async () => {
//       try {
//         const res =
//           await searchVideos(
//             query
//           );

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
//             "#f9f9f9",
//           minHeight:
//             "100vh",
//         }}
//       >
//         <Sidebar />

//         <div
//           style={{
//             flex: 1,
//             padding:
//               "30px",
//           }}
//         >
//           <h2
//             style={{
//               marginBottom:
//                 "25px",
//             }}
//           >
//             Search Results
//             for:{" "}
//             <span
//               style={{
//                 color:
//                   "red",
//               }}
//             >
//               {query}
//             </span>
//           </h2>

//           {videos.length ===
//           0 ? (
//             <h3>
//               No videos found
//             </h3>
//           ) : (
//             videos.map(
//               (
//                 video
//               ) => (
//                 <Link
//                   key={
//                     video._id
//                   }
//                   to={`/video/${video._id}`}
//                   style={{
//                     textDecoration:
//                       "none",
//                     color:
//                       "black",
//                   }}
//                 >
//                   <div
//                     style={{
//                       display:
//                         "flex",
//                       gap: "20px",
//                       background:
//                         "#fff",
//                       marginBottom:
//                         "20px",
//                       borderRadius:
//                         "15px",
//                       overflow:
//                         "hidden",
//                       boxShadow:
//                         "0 2px 10px rgba(0,0,0,0.08)",
//                       transition:
//                         "0.3s",
//                     }}
//                   >
//                     {/* Thumbnail */}
//                     <div
//                       style={{
//                         width:
//                           "360px",
//                         minWidth:
//                           "360px",
//                         height:
//                           "200px",
//                       }}
//                     >
//                       {video.thumbnail ? (
//                         <img
//                           src={
//                             video.thumbnail
//                           }
//                           alt="thumbnail"
//                           style={{
//                             width:
//                               "100%",
//                             height:
//                               "100%",
//                             objectFit:
//                               "cover",
//                           }}
//                         />
//                       ) : (
//                         <video
//                           width="100%"
//                           height="100%"
//                           muted
//                           style={{
//                             objectFit:
//                               "cover",
//                           }}
//                         >
//                           <source
//                             src={
//                               video.videoUrl
//                             }
//                             type="video/mp4"
//                           />
//                         </video>
//                       )}
//                     </div>

//                     {/* Details */}
//                     <div
//                       style={{
//                         padding:
//                           "20px",
//                         flex: 1,
//                       }}
//                     >
//                       <h2
//                         style={{
//                           margin:
//                             "0 0 12px",
//                         }}
//                       >
//                         {
//                           video.title
//                         }
//                       </h2>

//                       <p
//                         style={{
//                           color:
//                             "gray",
//                           margin:
//                             "8px 0",
//                         }}
//                       >
//                         👁️{" "}
//                         {
//                           video.views
//                         }{" "}
//                         views •{" "}
//                         {new Date(
//                           video.createdAt
//                         ).toLocaleDateString()}
//                       </p>

//                       <p
//                         style={{
//                           color:
//                             "#606060",
//                           fontWeight:
//                             "500",
//                         }}
//                       >
//                         {
//                           video
//                             .userId
//                             ?.username ||
//                           "Unknown Channel"
//                         }
//                       </p>

//                       <p
//                         style={{
//                           color:
//                             "#444",
//                           marginTop:
//                             "15px",
//                           lineHeight:
//                             "1.6",
//                         }}
//                       >
//                         {
//                           video.description
//                         }
//                       </p>
//                     </div>
//                   </div>
//                 </Link>
//               )
//             )
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default
// Search;


import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { searchVideos } from "../../services/api";

function Search() {
  const { query } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    fetchVideos();
  }, [query]);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const res = await searchVideos(query);
      setVideos(res.data);
    } catch (error) {
      console.error("Search error:", error);
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
          background: "#0f0f0f", // Changed to Dark Mode
          minHeight: "100vh",
          color: "#fff",
        }}
      >
        <Sidebar />

        <div
          style={{
            flex: 1,
            marginLeft: "240px", // Consistency with other pages
            padding: "95px 30px",
          }}
        >
          <h2 style={{ marginBottom: "25px", fontSize: "28px" }}>
            Search Results for:{" "}
            <span style={{ color: "#ff0000" }}>{query}</span>
          </h2>

          {loading ? (
            <div style={{ color: "#aaa", marginTop: "20px" }}>
              <h2>Searching for videos...</h2>
            </div>
          ) : videos.length === 0 ? (
            <div style={{ textAlign: "center", marginTop: "50px", color: "#aaa" }}>
              <h3>No videos found 😕</h3>
              <p>Try searching for something else!</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {videos.map((video) => (
                <Link
                  key={video._id}
                  to={`/video/${video._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      background: "#181818", // Dark card background
                      borderRadius: "15px",
                      overflow: "hidden",
                      boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                      transition: "0.3s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#252525")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#181818")}
                  >
                    {/* Thumbnail Section */}
                    <div style={{ width: "360px", minWidth: "360px", height: "200px" }}>
                      {video.thumbnail ? (
                        <img
                          src={video.thumbnail}
                          alt="thumbnail"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <img 
                          src="https://via.placeholder.com/360x200?text=No+Thumbnail" 
                          alt="placeholder" 
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      )}
                    </div>

                    {/* Details Section */}
                    <div style={{ padding: "20px", flex: 1 }}>
                      <h2 style={{ margin: "0 0 12px", fontSize: "22px" }}>
                        {video.title}
                      </h2>

                      <p style={{ color: "#aaa", margin: "8px 0", fontSize: "14px" }}>
                        👁️ {video.views} views • {new Date(video.createdAt).toLocaleDateString()}
                      </p>

                      <p style={{ color: "#fff", fontWeight: "600", fontSize: "14px", marginBottom: "10px" }}>
                        {video.userId?.username || "Unknown Channel"}
                      </p>

                      <p style={{ color: "#888", marginTop: "15px", lineHeight: "1.6", fontSize: "15px" }}>
                        {video.description?.length > 150 
                          ? `${video.description.substring(0, 150)}...` 
                          : video.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Search;
