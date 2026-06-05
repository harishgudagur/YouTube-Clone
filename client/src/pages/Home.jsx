import {
  useEffect,
  useState,
} from "react";

import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import VideoCard from "../components/VideoCard/VideoCard";

import {
  getVideos,
} from "../services/api";

function Home() {
  const [
    videos,
    setVideos,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  const isMobile =
    window.innerWidth <
    768;

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
        setLoading(
          true
        );

        const res =
          await getVideos();

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
      } finally {
        setLoading(
          false
        );
      }
    };

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
                ? "72px"
                : "240px",
            padding:
              isMobile
                ? "85px 16px 20px"
                : "85px 28px 30px",
            transition:
              "0.3s ease",
          }}
        >
          {/* Categories */}
          <div
            style={{
              position:
                "sticky",
              top: "56px",
              zIndex: 10,
              background:
                "#0f0f0f",
              paddingBottom:
                "14px",
              marginBottom:
                "22px",
            }}
          >
            <div
              style={{
                display:
                  "flex",
                gap:
                  "12px",
                overflowX:
                  "auto",
                scrollbarWidth:
                  "none",
                WebkitOverflowScrolling:
                  "touch",
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
                        "8px 16px",
                      borderRadius:
                        "10px",
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
                        "500",
                      fontSize:
                        "14px",
                      cursor:
                        "pointer",
                      whiteSpace:
                        "nowrap",
                      transition:
                        "all 0.2s ease",
                    }}
                  >
                    {
                      category
                    }
                  </button>
                )
              )}
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div
              style={{
                display:
                  "flex",
                justifyContent:
                  "center",
                alignItems:
                  "center",
                height:
                  "50vh",
                color:
                  "#aaa",
                fontSize:
                  "18px",
              }}
            >
              Loading videos...
            </div>
          ) : filteredVideos.length ===
            0 ? (
            <div
              style={{
                textAlign:
                  "center",
                marginTop:
                  "120px",
              }}
            >
              <h2
                style={{
                  fontSize:
                    "30px",
                  marginBottom:
                    "10px",
                }}
              >
                No videos
                found 😕
              </h2>

              <p
                style={{
                  color:
                    "#aaa",
                  fontSize:
                    "15px",
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
                  isMobile
                    ? "24px"
                    : "26px",
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