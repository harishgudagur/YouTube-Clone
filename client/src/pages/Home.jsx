
import {
  useEffect,
  useState,
} from "react";

import Navbar
from "../components/Navbar/Navbar";

import Sidebar
from "../components/Sidebar/Sidebar";

import VideoCard
from "../components/VideoCard/VideoCard";

import {
  getVideos,
} from "../services/api";

function Home() {
  const [
    videos,
    setVideos,
  ] = useState([]);

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  const isMobile =
    window.innerWidth <
    768;

  // Categories
  const categories = [
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

    ...[
      ...new Set(
        videos
          .map(
            (
              video
            ) =>
              video.category
          )
          .filter(
            Boolean
          )
      ),
    ].filter(
      (
        category
      ) =>
        ![
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
        ].includes(
          category
        )
    ),
  ];

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos =
    async () => {
      try {
        const res =
          await getVideos();

        // Hide Shorts
        const normalVideos =
          res.data.filter(
            (
              video
            ) =>
              video.type !==
              "short"
          );

        setVideos(
          normalVideos
        );
      } catch (
        error
      ) {
        console.log(
          error
        );
      }
    };

  // Filter
  const filteredVideos =
    selectedCategory ===
    "All"
      ? videos
      : videos.filter(
          (
            video
          ) =>
            video.category ===
            selectedCategory
        );

  return (
    <>
      <Navbar />

      <div
        style={{
          display:
            "flex",
          background:
            "#0f0f0f",
          minHeight:
            "100vh",
          color:
            "#fff",
        }}
      >
        <Sidebar />

        <div
          style={{
            flex: 1,
            marginLeft:
              isMobile
                ? "80px"
                : "240px",
            padding:
              "95px 28px 28px",
          }}
        >
          {/* Categories */}
          <div
            style={{
              display:
                "flex",
              gap:
                "12px",
              overflowX:
                "auto",
              marginBottom:
                "30px",
              paddingBottom:
                "8px",
              scrollbarWidth:
                "none",
            }}
          >
            {categories.map(
              (
                category
              ) => (
                <button
                  key={
                    category
                  }
                  onClick={() =>
                    setSelectedCategory(
                      category
                    )
                  }
                  style={{
                    border:
                      "none",
                    padding:
                      "10px 18px",
                    borderRadius:
                      "12px",
                    background:
                      selectedCategory ===
                      category
                        ? "#fff"
                        : "#272727",
                    color:
                      selectedCategory ===
                      category
                        ? "#000"
                        : "#fff",
                    fontWeight:
                      "600",
                    cursor:
                      "pointer",
                    whiteSpace:
                      "nowrap",
                    transition:
                      "0.2s",
                  }}
                >
                  {
                    category
                  }
                </button>
              )
            )}
          </div>

          {/* Empty */}
          {filteredVideos.length ===
          0 ? (
            <div
              style={{
                textAlign:
                  "center",
                marginTop:
                  "100px",
              }}
            >
              <h2>
                No videos
                found 😕
              </h2>

              <p
                style={{
                  color:
                    "#aaa",
                }}
              >
                Try another
                category
              </p>
            </div>
          ) : (
            <div
              style={{
                display:
                  "grid",
                gridTemplateColumns:
                  isMobile
                    ? "1fr"
                    : "repeat(auto-fill, minmax(340px, 1fr))",
                gap:
                  "26px",
              }}
            >
              {filteredVideos.map(
                (
                  video
                ) => (
                  <VideoCard
                    key={
                      video._id
                    }
                    video={
                      video
                    }
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
