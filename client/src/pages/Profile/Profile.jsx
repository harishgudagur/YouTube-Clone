
import {
  useEffect,
  useState,
} from "react";

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import VideoCard from "../../components/VideoCard/VideoCard";

import {
  FaUserCircle,
  FaCamera,
} from "react-icons/fa";

import {
  getMyVideos,
  updateProfile,
} from "../../services/api";

import toast from "react-hot-toast";

function Profile() {
  const [videos, setVideos] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [user, setUser] =
    useState(
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      )
    );

  const [fullName, setFullName] =
    useState(
      user?.fullName || ""
    );

  const [username, setUsername] =
    useState(
      user?.username || ""
    );

  const [profilePic, setProfilePic] =
    useState(null);

  const [preview, setPreview] =
    useState(
      user?.profilePic || ""
    );

  const [
    showEditProfile,
    setShowEditProfile,
  ] = useState(false);

  useEffect(() => {
    fetchMyVideos();
  }, []);

  const fetchMyVideos =
    async () => {
      try {
        const res =
          await getMyVideos();

        setVideos(
          res.data.filter(
            (video) =>
              video.type !==
              "short"
          )
        );
      } catch (error) {
        console.log(error);
      }
    };

  const handleUpdate =
    async () => {
      try {
        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "fullName",
          fullName
        );

        formData.append(
          "username",
          username
        );

        if (
          profilePic ===
          "REMOVE_PHOTO"
        ) {
          formData.append(
            "removeProfilePic",
            "true"
          );
        } else if (
          profilePic
        ) {
          formData.append(
            "profilePic",
            profilePic
          );
        }

        const res =
          await updateProfile(
            formData
          );

        localStorage.setItem(
          "user",
          JSON.stringify(
            res.data
          )
        );

        setUser(res.data);

        toast.success(
          "Profile Updated"
        );

        setShowEditProfile(
          false
        );

        window.location.reload();
      } catch (error) {
        console.log(error);

        toast.error(
          "Update Failed"
        );
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
          background:
            "#0f0f0f",
          minHeight:
            "100vh",
          color: "#fff",
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
              "95px 35px",
            maxWidth:
              "1500px",
          }}
        >
          {/* Banner */}
          <div
            style={{
              height: "190px",
              borderRadius:
                "24px",
              background:
                "linear-gradient(135deg,#ff0000,#d81f26,#111)",
              boxShadow:
                "0 15px 40px rgba(0,0,0,0.35)",
            }}
          />

          {/* Profile */}
          <div
            style={{
              display: "flex",
              gap: "25px",
              alignItems:
                "flex-end",
              marginTop:
                "-50px",
              paddingLeft:
                "20px",
            }}
          >
            <div>
              {preview ? (
                <img
                  src={preview}
                  alt=""
                  style={{
                    width:
                      "140px",
                    height:
                      "140px",
                    borderRadius:
                      "50%",
                    objectFit:
                      "cover",
                    border:
                      "5px solid #0f0f0f",
                  }}
                />
              ) : (
                <FaUserCircle
                  size={150}
                />
              )}
            </div>

            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize:
                    "38px",
                }}
              >
                {
                  user?.fullName
                }
              </h1>

              <p
                style={{
                  color:
                    "#aaa",
                }}
              >
                @
                {
                  user?.username
                }
              </p>

              <p
                style={{
                  color:
                    "#888",
                }}
              >
                {
                  videos.length
                }{" "}
                videos •{" "}
                {user
                  ?.subscribers
                  ?.length ||
                  0}{" "}
                subscribers
              </p>

              <button
                onClick={() =>
                  setShowEditProfile(
                    true
                  )
                }
                style={{
                  marginTop:
                    "14px",
                  background:
                    "#fff",
                  border:
                    "none",
                  padding:
                    "10px 22px",
                  borderRadius:
                    "999px",
                  cursor:
                    "pointer",
                  fontWeight:
                    "600",
                }}
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* Modal */}
          {showEditProfile && (
            <div
              style={{
                position:
                  "fixed",
                inset: 0,
                background:
                  "rgba(0,0,0,0.75)",
                display:
                  "flex",
                justifyContent:
                  "center",
                alignItems:
                  "center",
                zIndex: 9999,
                backdropFilter:
                  "blur(8px)",
              }}
            >
              <div
                style={{
                  width:
                    "430px",
                  background:
                    "#181818",
                  borderRadius:
                    "28px",
                  padding:
                    "35px",
                  border:
                    "1px solid #272727",
                }}
              >
                <h2
                  style={{
                    textAlign:
                      "center",
                    marginBottom:
                      "24px",
                  }}
                >
                  Edit Profile
                </h2>

                {/* Profile Image */}
                <div
                  style={{
                    display:
                      "flex",
                    flexDirection:
                      "column",
                    alignItems:
                      "center",
                    marginBottom:
                      "24px",
                  }}
                >
                  <label
                    style={{
                      cursor:
                        "pointer",
                      position:
                        "relative",
                    }}
                  >
                    {preview ? (
                      <img
                        src={preview}
                        alt=""
                        style={{
                          width:
                            "110px",
                          height:
                            "110px",
                          borderRadius:
                            "50%",
                          objectFit:
                            "cover",
                          border:
                            "4px solid #333",
                        }}
                      />
                    ) : (
                      <FaUserCircle
                        size={110}
                      />
                    )}

                    <div
                      style={{
                        position:
                          "absolute",
                        bottom: 0,
                        right: 0,
                        width:
                          "36px",
                        height:
                          "36px",
                        borderRadius:
                          "50%",
                        background:
                          "#fff",
                        color:
                          "#000",
                        display:
                          "flex",
                        justifyContent:
                          "center",
                        alignItems:
                          "center",
                      }}
                    >
                      <FaCamera />
                    </div>

                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={(
                        e
                      ) => {
                        const file =
                          e.target.files[0];

                        if (
                          file
                        ) {
                          setProfilePic(
                            file
                          );

                          setPreview(
                            URL.createObjectURL(
                              file
                            )
                          );
                        }
                      }}
                    />
                  </label>

                  {preview && (
                    <button
                      onClick={() => {
                        setPreview(
                          ""
                        );

                        setProfilePic(
                          "REMOVE_PHOTO"
                        );
                      }}
                      style={{
                        marginTop:
                          "14px",
                        background:
                          "transparent",
                        border:
                          "none",
                        color:
                          "#ff4d4d",
                        cursor:
                          "pointer",
                        fontWeight:
                          "600",
                      }}
                    >
                      Delete Current Photo
                    </button>
                  )}
                </div>

                <div
                  style={{
                    display:
                      "grid",
                    gap: "16px",
                  }}
                >
                  <input
                    value={
                      fullName
                    }
                    onChange={(
                      e
                    ) =>
                      setFullName(
                        e.target.value
                      )
                    }
                    placeholder="Full Name"
                    style={
                      inputStyle
                    }
                  />

                  <input
                    value={
                      username
                    }
                    onChange={(
                      e
                    ) =>
                      setUsername(
                        e.target.value
                      )
                    }
                    placeholder="Username"
                    style={
                      inputStyle
                    }
                  />

                  <button
                    onClick={
                      handleUpdate
                    }
                    style={{
                      background:
                        "#ff0000",
                      border:
                        "none",
                      color:
                        "#fff",
                      padding:
                        "14px",
                      borderRadius:
                        "14px",
                      fontWeight:
                        "bold",
                      cursor:
                        "pointer",
                    }}
                  >
                    {loading
                      ? "Updating..."
                      : "Save Changes"}
                  </button>

                  <button
                    onClick={() =>
                      setShowEditProfile(
                        false
                      )
                    }
                    style={{
                      background:
                        "#272727",
                      border:
                        "none",
                      color:
                        "#fff",
                      padding:
                        "14px",
                      borderRadius:
                        "14px",
                      cursor:
                        "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Videos */}
          <div
            style={{
              marginTop:
                "55px",
              width:
                "100%",
              paddingLeft:
                "6px",
            }}
          >
            <div
              style={{
                display:
                  "flex",
                justifyContent:
                  "space-between",
                alignItems:
                  "center",
                marginBottom:
                  "26px",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color:
                    "#fff",
                  fontSize:
                    "34px",
                  fontWeight:
                    "700",
                }}
              >
                My Videos
              </h2>

              <span
                style={{
                  color:
                    "#888",
                  fontSize:
                    "15px",
                }}
              >
                {
                  videos.length
                }{" "}
                videos
              </span>
            </div>

            {videos.length ===
            0 ? (
              <div
                style={{
                  background:
                    "#181818",
                  border:
                    "1px solid #272727",
                  borderRadius:
                    "22px",
                  padding:
                    "70px 30px",
                  textAlign:
                    "center",
                }}
              >
                <h3
                  style={{
                    color:
                      "#fff",
                    marginBottom:
                      "10px",
                  }}
                >
                  No Videos Yet
                </h3>

                <p
                  style={{
                    color:
                      "#888",
                    margin: 0,
                  }}
                >
                  Upload your first video 🚀
                </p>
              </div>
            ) : (
              <div
                style={{
                  display:
                    "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(330px, 1fr))",
                  gap:
                    "28px",
                }}
              >
                {videos.map(
                  (
                    video
                  ) => (
                    <div
                      key={
                        video._id
                      }
                      style={{
                        transition:
                          "0.3s ease",
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
                      <VideoCard
                        video={
                          video
                        }
                      />
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding:
    "16px",
  borderRadius:
    "14px",
  border:
    "1px solid #333",
  background:
    "#181818",
  color: "#fff",
  outline: "none",
};

export default Profile;
