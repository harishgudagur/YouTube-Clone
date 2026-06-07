// import {
//   useEffect,
//   useState,
// } from "react";

// import {
//   Link,
// } from "react-router-dom";

// import Navbar
//   from "../../components/Navbar/Navbar";

// import Sidebar
//   from "../../components/Sidebar/Sidebar";

// import {
//   getHistory,
// } from "../../services/api";

// function History() {
//   const [
//     history,
//     setHistory,
//   ] = useState([]);

//   const [
//     loading,
//     setLoading,
//   ] = useState(
//     true
//   );

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   const fetchHistory =
//     async () => {
//       try {
//         const res =
//           await getHistory();

//         setHistory(
//           res.data
//         );
//       } catch (
//         error
//       ) {
//         console.log(
//           error
//         );
//       } finally {
//         setLoading(
//           false
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
//         {/* Sidebar */}
//         <Sidebar />

// <div
//   style={{
//     flex: 1,
//     marginLeft:
//       window.innerWidth <
//       768
//         ? "80px"
//         : "240px",
//             padding:
//               "25px",
//           }}
//         >
//           <h1
//             style={{
//               marginBottom:
//                 "25px",
//             }}
//           >
//             Watch History
//           </h1>

//           {loading ? (
//             <h2>
//               Loading...
//             </h2>
//           ) : history.length ===
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
//                 No watch
//                 history yet
//                 😕
//               </h2>

//               <p>
//                 Watch videos
//                 and they will
//                 appear here.
//               </p>
//             </div>
//           ) : (
//             <div
//               style={{
//                 display:
//                   "grid",
//                 gridTemplateColumns:
//                   "repeat(auto-fill, minmax(320px, 1fr))",
//                 gap: "25px",
//               }}
//             >
//               {history.map(
//                 (
//                   item
//                 ) => (
//                   <Link
//                     key={
//                       item._id
//                     }
//                     to={`/video/${item.videoId?._id}`}
//                     style={{
//                       textDecoration:
//                         "none",
//                       color:
//                         "#000",
//                     }}
//                   >
//                     <div
//                       style={{
//                         background:
//                           "#fff",
//                         borderRadius:
//                           "16px",
//                         overflow:
//                           "hidden",
//                         boxShadow:
//                           "0 2px 10px rgba(0,0,0,0.08)",
//                         transition:
//                           "0.3s",
//                       }}
//                     >
//                       {/* Thumbnail */}
//                       {item
//                         .videoId
//                         ?.thumbnail ? (
//                         <img
//                           src={
//                             item
//                               .videoId
//                               ?.thumbnail
//                           }
//                           alt="thumbnail"
//                           style={{
//                             width:
//                               "100%",
//                             height:
//                               "220px",
//                             objectFit:
//                               "cover",
//                           }}
//                         />
//                       ) : (
//                         <video
//                           muted
//                           style={{
//                             width:
//                               "100%",
//                             height:
//                               "220px",
//                             objectFit:
//                               "cover",
//                           }}
//                         >
//                           <source
//                             src={
//                               item
//                                 .videoId
//                                 ?.videoUrl
//                             }
//                             type="video/mp4"
//                           />
//                         </video>
//                       )}

//                       {/* Details */}
//                       <div
//                         style={{
//                           padding:
//                             "15px",
//                         }}
//                       >
//                         <h3
//                           style={{
//                             margin:
//                               "0 0 10px",
//                           }}
//                         >
//                           {
//                             item
//                               .videoId
//                               ?.title
//                           }
//                         </h3>

//                         <p
//                           style={{
//                             color:
//                               "#606060",
//                             margin:
//                               "6px 0",
//                           }}
//                         >
//                           👁️{" "}
//                           {
//                             item
//                               .videoId
//                               ?.views
//                           }{" "}
//                           views
//                         </p>

//                         <p
//                           style={{
//                             color:
//                               "gray",
//                             fontSize:
//                               "14px",
//                           }}
//                         >
//                           Watched
//                           recently
//                         </p>
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
// History;


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { getHistory } from "../../services/api";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await getHistory();
      setHistory(res.data);
    } catch (error) {
      console.error("Error fetching history:", error);
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
          background: "#0f0f0f", // Changed to Dark Mode to match Channel page
          minHeight: "100vh",
          color: "#fff",
        }}
      >
        <Sidebar />

        <div
          style={{
            flex: 1,
            // Recommended: Use a CSS class instead of window.innerWidth
            marginLeft: "240px", 
            padding: "95px 30px", // Increased top padding to clear Navbar
          }}
        >
          <h1 style={{ marginBottom: "25px", fontSize: "32px" }}>
            Watch History
          </h1>

          {loading ? (
            <h2 style={{ color: "#fff" }}>Loading...</h2>
          ) : history.length === 0 ? (
            <div style={{ textAlign: "center", marginTop: "100px" }}>
              <h2 style={{ color: "#fff" }}>No watch history yet 😕</h2>
              <p style={{ color: "#aaa" }}>Watch videos and they will appear here.</p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "25px",
              }}
            >
              {history.map((item) => {
                // Safety check: skip rendering if there is no videoId
                if (!item.videoId) return null;

                return (
                  <Link
                    key={item._id}
                    to={`/video/${item.videoId._id}`}
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    <div
                      style={{
                        background: "#181818",
                        borderRadius: "16px",
                        overflow: "hidden",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                        transition: "0.3s",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                    >
                      {/* Thumbnail Logic: Use placeholder instead of <video> tag */}
                      <img
                        src={item.videoId.thumbnail || "https://via.placeholder.com/500x280?text=No+Thumbnail"}
                        alt="thumbnail"
                        style={{
                          width: "100%",
                          height: "220px",
                          objectFit: "cover",
                        }}
                      />

                      <div style={{ padding: "15px" }}>
                        <h3 style={{ margin: "0 0 10px", fontSize: "18px" }}>
                          {item.videoId.title}
                        </h3>

                        <p style={{ color: "#aaa", margin: "6px 0", fontSize: "14px" }}>
                          👁️ {item.videoId.views} views
                        </p>

                        <p style={{ color: "#777", fontSize: "12px" }}>
                          Watched recently
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default History;
