import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import VideoCard from "../components/VideoCard/VideoCard";

import { getVideos } from "../services/api";

function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  // Handle window resize for responsive design
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 768
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  // Memoize categories to avoid recreating on every render
  const categories = useMemo(() => {
    const baseCategories = [
      "All",
      "Music",
      "Gaming",
      "News",
      "Movies",
      "Coding",
      "React",
      "JavaScript",
      "Technology",
      "Sports",
    ];

    // Get unique categories from videos
    const videoCategories = [
      ...new Set(
        videos
          .map((video) => video.category)
          .filter(Boolean)
      ),
    ];

    // Filter out base categories and combine
    const uniqueCategories = videoCategories.filter(
      (category) => !baseCategories.includes(category)
    );

    return [...baseCategories, ...uniqueCategories];
  }, [videos]);

  // Fetch videos function with proper error handling
  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors

      const res = await getVideos();

      // Filter out shorts
      const normalVideos = res.data.filter(
        (video) => video.type !== "short"
      );

      setVideos(normalVideos);

      if (normalVideos.length === 0) {
        toast("No videos available yet", {
          icon: "📺",
        });
      }
    } catch (err) {
      // Proper error handling
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Failed to load videos. Please try again.";

      console.error("Error fetching videos:", err);
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch videos on component mount
  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  // Filter videos based on selected category
  const filteredVideos = useMemo(() => {
    return selectedCategory === "All"
      ? videos
      : videos.filter(
          (video) =>
            video.category === selectedCategory
        );
  }, [videos, selectedCategory]);

  // Render loading skeleton
  const LoadingState = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div
        style={{
          animation: "spin 1s linear infinite",
          fontSize: "40px",
        }}
      >
        ⏳
      </div>
      <div style={{ color: "#aaa", fontSize: "18px" }}>
        Loading videos...
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  // Render error state with retry button
  const ErrorState = () => (
    <div
      style={{
        textAlign: "center",
        marginTop: "120px",
        padding: "40px 20px",
        backgroundColor: "rgba(255, 107, 107, 0.1)",
        borderRadius: "12px",
        border: "1px solid rgba(255, 107, 107, 0.3)",
      }}
    >
      <div style={{ fontSize: "40px", marginBottom: "15px" }}>
        ⚠️
      </div>
      <h2
        style={{
          fontSize: "28px",
          marginBottom: "10px",
          color: "#ff6b6b",
        }}
      >
        Error Loading Videos
      </h2>
      <p
        style={{
          color: "#aaa",
          fontSize: "15px",
          marginBottom: "20px",
        }}
      >
        {error}
      </p>
      <button
        onClick={fetchVideos}
        style={{
          padding: "10px 24px",
          backgroundColor: "#ff6b6b",
          color: "#fff",
          border: "none",
          borderRadius: "20px",
          fontSize: "14px",
          fontWeight: "600",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#ff5252";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#ff6b6b";
        }}
      >
        Try Again
      </button>
    </div>
  );

  // Render empty state
  const EmptyState = () => (
    <div
      style={{
        textAlign: "center",
        marginTop: "120px",
      }}
    >
      <div style={{ fontSize: "50px", marginBottom: "15px" }}>
        📺
      </div>
      <h2
        style={{
          fontSize: "30px",
          marginBottom: "10px",
          color: "#fff",
        }}
      >
        No videos found 😕
      </h2>
      <p
        style={{
          color: "#aaa",
          fontSize: "15px",
        }}
      >
        Try another category or check back later
      </p>
    </div>
  );

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
            marginLeft: isMobile ? "72px" : "240px",
            padding: isMobile
              ? "85px 16px 20px"
              : "85px 28px 30px",
            transition: "0.3s ease",
            width: "100%",
          }}
        >
          {/* Categories Bar */}
          <div
            style={{
              position: "sticky",
              top: "56px",
              zIndex: 10,
              background: "#0f0f0f",
              paddingBottom: "14px",
              marginBottom: "22px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "12px",
                overflowX: "auto",
                scrollbarWidth: "none",
                WebkitOverflowScrolling: "touch",
                paddingBottom: "8px",
              }}
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "10px",
                    background:
                      selectedCategory === category
                        ? "#fff"
                        : "#272727",
                    color:
                      selectedCategory === category
                        ? "#000"
                        : "#fff",
                    fontWeight: "500",
                    fontSize: "14px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s ease",
                    flexShrink: 0,
                  }}
                  className="category-button"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState />
          ) : filteredVideos.length === 0 ? (
            <EmptyState />
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "1fr"
                  : "repeat(auto-fill, minmax(340px, 1fr))",
                gap: isMobile ? "24px" : "26px",
              }}
            >
              {filteredVideos.map((video) => (
                <VideoCard
                  key={video._id}
                  video={video}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
