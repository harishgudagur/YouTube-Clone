// import Navbar
// from "../../components/Navbar/Navbar";

// import Sidebar
// from "../../components/Sidebar/Sidebar";

// function Library() {
//   return (
//     <>
//       <Navbar />

//       <div
//         style={{
//           display:
//             "flex",
//           background:
//             "#0f0f0f",
//           color:
//             "#fff",
//           minHeight:
//             "100vh",
//         }}
//       >
//         <Sidebar />

//         <div
//           style={{
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
//             📚 Library
//           </h1>

//           <p
//             style={{
//               color:
//                 "#aaa",
//             }}
//           >
//             Your saved
//             content
//             appears here.
//           </p>
//         </div>
//       </div>
//     </>
//   );
// }

// export default
// Library;

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

function Library() {
  return (
    <>
      <Navbar />

      <div
        style={{
          display: "flex",
          background: "#0f0f0f",
          color: "#fff",
          minHeight: "100vh",
        }}
      >
        <Sidebar />

        <div
          style={{
            flex: 1, // Added flex: 1 to ensure it takes up the remaining space
            // IMPORTANT: Instead of window.innerWidth, use a fixed margin 
            // and handle responsiveness via CSS or a wrapper class.
            marginLeft: "240px", 
            padding: "95px 30px",
          }}
        >
          <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
            📚 Library
          </h1>

          <p style={{ color: "#aaa", fontSize: "16px" }}>
            Your saved content appears here.
          </p>
          
          {/* Suggestion: Since this is a Library page, 
              you can add placeholders for "Liked Videos" or "Playlists" here */}
          <div style={{ 
            marginTop: "40px", 
            padding: "40px", 
            border: "1px dashed #333", 
            borderRadius: "15px", 
            textAlign: "center", 
            color: "#555" 
          }}>
            Your playlists and liked videos will be listed here soon.
          </div>
        </div>
      </div>
    </>
  );
}

export default Library;
