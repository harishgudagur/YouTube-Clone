
import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import Navbar
from "../../components/Navbar/Navbar";

import Sidebar
from "../../components/Sidebar/Sidebar";

import {
  getChannel,
  subscribeChannel,
} from "../../services/api";

function Channel() {
  const { id } =
    useParams();

  const [
    channel,
    setChannel,
  ] = useState(
    null
  );

  const [
    videos,
    setVideos,
  ] = useState([]);

  const [
    subscribed,
    setSubscribed,
  ] = useState(
    false
  );

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      ) || "null"
    );

  useEffect(() => {
    fetchChannel();
  }, [id]);

  const fetchChannel =
    async () => {
      try {
        const res =
          await getChannel(
            id
          );

        setChannel(
          res.data.user
        );

        // Hide shorts
        setVideos(
          res.data.videos.filter(
            (
              video
            ) =>
              video.type !==
              "short"
          )
        );

        setSubscribed(
          (
            user
              ?.subscribedChannels ||
            []
          ).includes(
            id
          )
        );
      } catch (
        error
      ) {
        console.log(
          error
        );
      }
    };

  const handleSubscribe =
    async () => {
      try {
        const res =
          await subscribeChannel(
            id
          );

        setSubscribed(
          res.data
            .subscribed
        );

        setChannel(
          (
            prev
          ) => ({
            ...prev,
            subscribers:
              res.data
                .subscribed
                ? [
                    ...(prev
                      .subscribers ||
                      []),
                    "new",
                  ]
                : prev.subscribers.slice(
                    0,
                    -1
                  ),
          })
        );
      } catch (
        error
      ) {
        console.log(
          error
        );
      }
    };

  if (!channel)
    return (
      <h2
        style={{
          color:
            "#fff",
          padding:
            "100px",
        }}
      >
        Loading...
      </h2>
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
              window.innerWidth <
              768
                ? "80px"
                : "240px",

            padding:
              "95px 30px",
          }}
        >
          {/* Banner */}
          <div
            style={{
              width:
                "100%",
              height:
                "240px",

              borderRadius:
                "28px",

              background:
                "linear-gradient(to right,#141414,#272727,#3f3f3f)",

              marginBottom:
                "35px",

              overflow:
                "hidden",
            }}
          />

          {/* Channel Info */}
          <div
            style={{
              display:
                "flex",

              flexDirection:
                window.innerWidth <
                768
                  ? "column"
                  : "row",

              justifyContent:
                "space-between",

              alignItems:
                window.innerWidth <
                768
                  ? "center"
                  : "center",

              gap:
                "20px",

              marginBottom:
                "40px",
            }}
          >
            <div
              style={{
                display:
                  "flex",

                flexDirection:
                  window.innerWidth <
                  768
                    ? "column"
                    : "row",

                alignItems:
                  "center",

                gap:
                  "25px",
              }}
            >
              {/* Profile Pic */}
              <img
                src={
                  channel.profilePic ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="profile"
                style={{
                  width:
                    "150px",

                  height:
                    "150px",

                  borderRadius:
                    "50%",

                  objectFit:
                    "cover",

                  border:
                    "5px solid #0f0f0f",

                  boxShadow:
                    "0 8px 25px rgba(0,0,0,0.35)",
                }}
              />

              {/* Info */}
              <div
                style={{
                  textAlign:
                    window.innerWidth <
                    768
                      ? "center"
                      : "left",
                }}
              >
                <h1
                  style={{
                    margin:
                      0,

                    fontSize:
                      "36px",
                  }}
                >
                  {
                    channel.fullName ||
                    channel.username
                  }
                </h1>

                <p
                  style={{
                    color:
                      "#aaa",

                    margin:
                      "10px 0",
                  }}
                >
                  @
                  {
                    channel.username
                  }
                </p>

                <p
                  style={{
                    color:
                      "#aaa",
                  }}
                >
                  {
                    channel
                      .subscribers
                      ?.length ||
                    0
                  }{" "}
                  subscribers •{" "}
                  {
                    videos.length
                  }{" "}
                  videos
                </p>
              </div>
            </div>

            {/* Subscribe Button */}
            {user?._id !==
              channel._id && (
              <button
                onClick={
                  handleSubscribe
                }
                style={{
                  border:
                    "none",

                  background:
                    subscribed
                      ? "#272727"
                      : "#ff0000",

                  color:
                    "#fff",

                  padding:
                    "14px 30px",

                  borderRadius:
                    "999px",

                  cursor:
                    "pointer",

                  fontWeight:
                    "600",

                  fontSize:
                    "16px",

                  transition:
                    "0.2s",
                }}
              >
                {subscribed
                  ? "✓ Subscribed"
                  : "Subscribe"}
              </button>
            )}
          </div>

          {/* Videos */}
          <h2
            style={{
              marginBottom:
                "25px",
            }}
          >
            Videos
          </h2>

          {videos.length ===
          0 ? (
            <div
              style={{
                background:
                  "#181818",

                padding:
                  "60px",

                borderRadius:
                  "22px",

                textAlign:
                  "center",
              }}
            >
              <h2>
                No videos
                uploaded 😕
              </h2>

              <p
                style={{
                  color:
                    "#aaa",
                }}
              >
                This channel
                has not uploaded
                any videos yet.
              </p>
            </div>
          ) : (
            <div
              style={{
                display:
                  "grid",

                gridTemplateColumns:
                  window.innerWidth <
                  768
                    ? "1fr"
                    : "repeat(auto-fill,minmax(330px,1fr))",

                gap:
                  "26px",
              }}
            >
              {videos.map(
                (
                  video
                ) => (
                  <Link
                    key={
                      video._id
                    }
                    to={`/video/${video._id}`}
                    style={{
                      textDecoration:
                        "none",

                      color:
                        "#fff",
                    }}
                  >
                    <div
                      style={{
                        background:
                          "#181818",

                        borderRadius:
                          "18px",

                        overflow:
                          "hidden",

                        cursor:
                          "pointer",

                        transition:
                          "0.25s",
                      }}
                      onMouseEnter={(
                        e
                      ) => {
                        e.currentTarget.style.transform =
                          "translateY(-6px)";
                      }}
                      onMouseLeave={(
                        e
                      ) => {
                        e.currentTarget.style.transform =
                          "translateY(0)";
                      }}
                    >
                      <img
                        src={
                          video.thumbnail ||
                          "https://via.placeholder.com/500x280"
                        }
                        alt="thumbnail"
                        style={{
                          width:
                            "100%",

                          height:
                            "220px",

                          objectFit:
                            "cover",
                        }}
                      />

                      <div
                        style={{
                          padding:
                            "16px",
                        }}
                      >
                        <h3
                          style={{
                            margin:
                              "0 0 8px",
                          }}
                        >
                          {
                            video.title
                          }
                        </h3>

                        <p
                          style={{
                            color:
                              "#aaa",
                            margin:
                              "0 0 5px",
                          }}
                        >
                          👁️{" "}
                          {
                            video.views
                          }{" "}
                          views
                        </p>

                        <p
                          style={{
                            color:
                              "#777",
                            fontSize:
                              "14px",
                            margin:
                              0,
                          }}
                        >
                          {new Date(
                            video.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </Link>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default
Channel;
