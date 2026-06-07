// import {
//   Link,
//   useLocation,
// } from "react-router-dom";

// import {
//   FaHome,
//   FaVideo,
//   FaUser,
//   FaFire,
//   FaClock,
//   FaPlay,
// } from "react-icons/fa";

// function Sidebar() {
//   const location =
//     useLocation();

//   const menuItems = [
//     {
//       name: "Home",
//       path: "/",
//       icon: <FaHome />,
//     },
//     {
//       name: "Shorts",
//       path: "/shorts",
//       icon: <FaPlay />,
//     },
//     {
//       name: "Trending",
//       path: "/trending",
//       icon: <FaFire />,
//     },
//     {
//       name:
//         "Subscriptions",
//       path:
//         "/subscriptions",
//       icon:
//         <FaVideo />,
//     },
//     {
//       name:
//         "History",
//       path:
//         "/history",
//       icon:
//         <FaClock />,
//     },
//     {
//       name:
//         "Profile",
//       path:
//         "/profile",
//       icon:
//         <FaUser />,
//     },
//   ];

//   const isMobile =
//     window.innerWidth <
//     768;

//   const bottomMenu = [
//     {
//       name:
//         "Library",
//       path:
//         "/library",
//     },
//     {
//       name:
//         "Watch Later",
//       path:
//         "/watch-later",
//     },
//     {
//       name:
//         "Liked Videos",
//       path:
//         "/liked",
//     },
//   ];

//   return (
//     <div
//       style={{
//         width:
//           isMobile
//             ? "80px"
//             : "220px",

//         height:
//           "calc(100vh - 70px)",

//         background:
//           "#0f0f0f",

//         borderRight:
//           "1px solid #272727",

//         position:
//           "fixed",

//         top: "70px",

//         left: 0,

//         zIndex: 998,

//         display:
//           "flex",

//         flexDirection:
//           "column",

//         justifyContent:
//           "space-between",

//         padding:
//           "18px 12px",

//         overflow:
//           "hidden",
//       }}
//     >
//       {/* TOP SECTION */}
//       <div>
//         {/* Menu */}
//         <div
//           style={{
//             display:
//               "flex",
//             flexDirection:
//               "column",
//             gap: "8px",
//           }}
//         >
//           {menuItems.map(
//             (
//               item
//             ) => {
//               const active =
//                 location.pathname ===
//                 item.path;

//               return (
//                 <Link
//                   key={
//                     item.path
//                   }
//                   to={
//                     item.path
//                   }
//                   style={{
//                     display:
//                       "flex",

//                     alignItems:
//                       "center",

//                     gap:
//                       "18px",

//                     padding:
//                       "14px 18px",

//                     borderRadius:
//                       "14px",

//                     textDecoration:
//                       "none",

//                     fontSize:
//                       "15px",

//                     fontWeight:
//                       active
//                         ? "600"
//                         : "500",

//                     background:
//                       active
//                         ? "#272727"
//                         : "transparent",

//                     color:
//                       "#fff",

//                     transition:
//                       "0.2s",
//                   }}
//                 >
//                   <span
//                     style={{
//                       fontSize:
//                         "20px",

//                       minWidth:
//                         "22px",
//                     }}
//                   >
//                     {
//                       item.icon
//                     }
//                   </span>

//                   {!isMobile &&
//                     item.name}
//                 </Link>
//               );
//             }
//           )}
//         </div>
//       </div>

//       {/* BOTTOM SECTION */}
//       {!isMobile && (
//         <div>
//           {/* Divider */}
//           <div
//             style={{
//               height:
//                 "1px",

//               background:
//                 "#272727",

//               marginBottom:
//                 "18px",
//             }}
//           />

//           <div
//             style={{
//               display:
//                 "flex",

//               flexDirection:
//                 "column",

//               gap:
//                 "16px",
//             }}
//           >
//             {bottomMenu.map(
//               (
//                 item
//               ) => (
//                 <Link
//                   key={
//                     item.path
//                   }
//                   to={
//                     item.path
//                   }
//                   style={{
//   display:
//     "flex",

//   alignItems:
//     "center",

//   padding:
//     "14px 18px",

//   borderRadius:
//     "14px",

//   textDecoration:
//     "none",

//   fontSize:
//     "15px",

//   fontWeight:
//     "500",

//   color:
//     "#fff",

//   background:
//     location.pathname ===
//     item.path
//       ? "#272727"
//       : "transparent",

//   transition:
//     "0.2s",

//   minHeight:
//     "52px",
// }}
//                 >
//                   {
//                     item.name
//                   }
//                 </Link>
//               )
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Sidebar;


import { Link, useLocation } from "react-router-dom";
import { 
  FaHome, FaVideo, FaUser, FaFire, 
  FaClock, FaPlay, FaFolder, FaHeart, FaBookmark 
} from "react-icons/fa";

// Move menu arrays outside the component so they aren't re-created on every render
const menuItems = [
  { name: "Home", path: "/", icon: <FaHome /> },
  { name: "Shorts", path: "/shorts", icon: <FaPlay /> },
  { name: "Trending", path: "/trending", icon: <FaFire /> },
  { name: "Subscriptions", path: "/subscriptions", icon: <FaVideo /> },
  { name: "History", path: "/history", icon: <FaClock /> },
  { name: "Profile", path: "/profile", icon: <FaUser /> },
];

const bottomMenu = [
  { name: "Library", path: "/library", icon: <FaFolder /> },
  { name: "Watch Later", path: "/watch-later", icon: <FaBookmark /> },
  { name: "Liked Videos", path: "/liked", icon: <FaHeart /> },
];

function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar-container">
      {/* TOP SECTION */}
      <div className="sidebar-section">
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {menuItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`menu-link ${active ? "active" : ""}`}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-text">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="sidebar-section bottom-section">
        <div className="divider" />
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {bottomMenu.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`menu-link ${active ? "active" : ""}`}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-text">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Adding CSS here to solve the responsiveness bug once and for all */}
      <style>{`
        .sidebar-container {
          width: 220px;
          height: calc(100vh - 70px);
          background: #0f0f0f;
          border-right: 1px solid #272727;
          position: fixed;
          top: 70px;
          left: 0;
          z-index: 998;
          display: flex;
          flex-direction: column;
          justify-content: "space-between";
          padding: 18px 12px;
          transition: width 0.3s ease;
        }

        .menu-link {
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 14px 18px;
          border-radius: 14px;
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          color: #fff;
          transition: 0.2s;
        }

        .menu-link.active {
          background: #272727;
          font-weight: 600;
        }

        .menu-icon {
          font-size: 20px;
          min-width: 22px;
        }

        .menu-text {
          display: block;
        }

        .divider {
          height: 1px;
          background: #272727;
          margin-bottom: 18px;
        }

        .bottom-section {
          margin-bottom: 20px;
        }

        /* MOBILE RESPONSIVENESS */
        @media (max-width: 768px) {
          .sidebar-container {
            width: 80px;
          }
          .menu-text {
            display: none; /* Hides text on mobile, keeps icons */
          }
          .menu-link {
            justify-content: center;
            padding: 14px 0;
          }
          .menu-icon {
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default Sidebar;
