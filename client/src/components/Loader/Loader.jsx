// function Loader() {
//   return (
//     <div
//       style={{
//         display:
//           "flex",
//         justifyContent:
//           "center",
//         alignItems:
//           "center",
//         height:
//           "100vh",
//         color:
//           "white",
//         fontSize:
//           "24px",
//       }}
//     >
//       Loading...
//     </div>
//   );
// }

// export default Loader;


function Loader() {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p style={{ marginTop: "20px", fontSize: "18px", fontWeight: "500", color: "#aaa" }}>
        Loading...
      </p>

      <style>{`
        .loader-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100%;
          background: #0f0f0f; /* Matches your app theme */
          color: white;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid #272727;
          border-top: 5px solid #ff0000; /* YouTube Red */
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Loader;
