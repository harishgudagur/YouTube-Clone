import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

function VideoCard({ video }) {
  const thumbnail =
    video?.thumbnail?.trim() ||
    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1000";

  const profilePic =
    video?.userId?.profilePic ||
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (
    <Link
      to={`/video/${video._id}`}
      style={{
        textDecoration: "none",
        color: "#fff",
      }}
    >
      <div
        style={{
          cursor: "pointer",
          transition: "0.25s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform =
            "translateY(-4px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform =
            "translateY(0px)";
        }}
      >
        {/* Thumbnail */}
        <div
          style={{
            width: "100%",
            aspectRatio: "16/9",
            borderRadius: "18px",
            overflow: "hidden",
            background: "#1a1a1a",
          }}
        >
          <img
            src={thumbnail}
            alt={video.title}
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1000";
            }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Info */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "14px",
          }}
        >
          {/* Profile */}
          <img
            src={profilePic}
            alt="profile"
            onError={(e) => {
              e.target.src =
                "https://cdn-icons-png.flaticon.com/512/149/149071.png";
            }}
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "1px solid #2a2a2a",
            }}
          />

          <div style={{ flex: 1 }}>
            <h3
              style={{
                margin: 0,
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "1.4",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {video.title}
            </h3>

            <p
              style={{
                margin: "6px 0 0",
                color: "#aaa",
                fontSize: "14px",
              }}
            >
              {video?.userId?.username ||
                "Unknown Channel"}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "#aaa",
                fontSize: "13px",
                marginTop: "4px",
              }}
            >
              <FaEye size={12} />
              <span>
                {video.views || 0} views
              </span>

              <span>•</span>

              <span>
                {new Date(
                  video.createdAt
                ).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;