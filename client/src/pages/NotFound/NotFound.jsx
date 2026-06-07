import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        flexDirection: "column",
        gap: "30px",
        textAlign: "center",
        background: "#0f0f0f",
        color: "#fff",
        padding: "20px",
      }}
    >
      {/* 404 Error Code */}
      <div
        style={{
          fontSize: "120px",
          fontWeight: "bold",
          background: "linear-gradient(135deg, #ff6b6b, #ff8787)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          margin: 0,
        }}
      >
        404
      </div>

      {/* Error Message */}
      <div>
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            margin: "0 0 10px 0",
          }}
        >
          Page Not Found
        </h1>
        <p
          style={{
            fontSize: "18px",
            color: "#aaa",
            margin: 0,
            maxWidth: "500px",
          }}
        >
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      {/* Emoji */}
      <div style={{ fontSize: "80px" }}>🔍</div>

      {/* Action Buttons */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Link
          to="/"
          style={{
            padding: "12px 32px",
            backgroundColor: "#ff6b6b",
            color: "#fff",
            border: "none",
            borderRadius: "24px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            textDecoration: "none",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#ff5252";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#ff6b6b";
            e.target.style.transform = "scale(1)";
          }}
        >
          Go Home
        </Link>

        <button
          onClick={() => window.history.back()}
          style={{
            padding: "12px 32px",
            backgroundColor: "transparent",
            color: "#ff6b6b",
            border: "2px solid #ff6b6b",
            borderRadius: "24px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "rgba(255, 107, 107, 0.1)";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.transform = "scale(1)";
          }}
        >
          Go Back
        </button>
      </div>

      {/* Helpful Links */}
      <div
        style={{
          marginTop: "40px",
          padding: "30px",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <p style={{ margin: "0 0 15px 0", color: "#aaa" }}>
          Looking for something?
        </p>
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/"
            style={{ color: "#ff6b6b", textDecoration: "none" }}
          >
            Home
          </Link>
          <Link
            to="/trending"
            style={{ color: "#ff6b6b", textDecoration: "none" }}
          >
            Trending
          </Link>
          <Link
            to="/search/popular"
            style={{ color: "#ff6b6b", textDecoration: "none" }}
          >
            Search
          </Link>
        </div>
      </div>
    </div>
  );
}
