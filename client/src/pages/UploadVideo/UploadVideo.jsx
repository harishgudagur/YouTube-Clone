import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { uploadVideo } from "../../services/api";

function UploadVideo() {
  const navigate =
    useNavigate();

  const [title, setTitle] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [video, setVideo] =
    useState(null);

  const [
    thumbnail,
    setThumbnail,
  ] = useState(null);

  const [
    thumbnailPreview,
    setThumbnailPreview,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [type, setType] =
    useState("video");

  const [
    category,
    setCategory,
  ] = useState("All");

  const categories = [
    "All",
    "Music",
    "Gaming",
    "News",
    "Movies",
    "Coding",
    "React",
    "Technology",
    "Sports",
  ];

  const handleUpload =
    async (e) => {
      e.preventDefault();

      try {
        if (!video) {
          return toast.error(
            "Select video"
          );
        }

        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "title",
          title
        );

        formData.append(
          "description",
          description
        );

        formData.append(
          "video",
          video
        );

        formData.append(
          "type",
          type
        );

        formData.append(
          "category",
          category
        );

        if (thumbnail) {
          formData.append(
            "thumbnail",
            thumbnail
          );
        }

        await uploadVideo(
  formData
);

toast.success(
  type === "short"
    ? "Short uploaded!"
    : "Video uploaded!"
);

navigate(
  type === "short"
    ? "/shorts"
    : "/"
);
      } catch (error) {
        console.log(error);

        toast.error(
          "Upload failed"
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
          display:
            "flex",
          background:
            "#0f0f0f",
          minHeight:
            "100vh",
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
              "110px 25px",

            display:
              "flex",

            justifyContent:
              "center",
          }}
        >
          <div
            style={{
              width:
                "100%",
              maxWidth:
                "900px",

              background:
                "#181818",

              borderRadius:
                "24px",

              padding:
                "40px",

              border:
                "1px solid #272727",

              boxShadow:
                "0 0 25px rgba(0,0,0,0.4)",
            }}
          >
            <h1
              style={{
                color:
                  "#fff",

                fontSize:
                  "34px",

                marginBottom:
                  "10px",
              }}
            >
              Upload Content
            </h1>

            <p
              style={{
                color:
                  "#aaa",

                marginBottom:
                  "35px",
              }}
            >
              Upload a video
              or short to
              your channel
            </p>

            <form
              onSubmit={
                handleUpload
              }
            >
              {/* TYPE */}
              <label
                style={
                  labelStyle
                }
              >
                Content Type
              </label>

              <select
                value={type}
                onChange={(
                  e
                ) =>
                  setType(
                    e.target
                      .value
                  )
                }
                style={
                  inputStyle
                }
              >
                <option value="video">
                  Video
                </option>

                <option value="short">
                  Short
                </option>
              </select>

              {/* CATEGORY */}
              <label
                style={
                  labelStyle
                }
              >
                Category
              </label>

              <select
                value={
                  category
                }
                onChange={(
                  e
                ) =>
                  setCategory(
                    e.target
                      .value
                  )
                }
                style={
                  inputStyle
                }
              >
                {categories.map(
                  (
                    cat
                  ) => (
                    <option
                      key={
                        cat
                      }
                    >
                      {cat}
                    </option>
                  )
                )}
              </select>

              {/* TITLE */}
              <label
                style={
                  labelStyle
                }
              >
                Title
              </label>

              <input
                type="text"
                placeholder="Enter title..."
                required
                value={title}
                onChange={(
                  e
                ) =>
                  setTitle(
                    e.target
                      .value
                  )
                }
                style={
                  inputStyle
                }
              />

              {/* DESCRIPTION */}
              <label
                style={
                  labelStyle
                }
              >
                Description
              </label>

              <textarea
                rows="5"
                placeholder="Enter description..."
                value={
                  description
                }
                onChange={(
                  e
                ) =>
                  setDescription(
                    e.target
                      .value
                  )
                }
                style={{
                  ...inputStyle,
                  resize:
                    "none",
                }}
              />

              {/* FILE SECTION */}
              <div
                style={{
                  display:
                    "flex",

                  gap:
                    "20px",

                  marginTop:
                    "30px",

                  flexWrap:
                    "wrap",
                }}
              >
                {/* VIDEO */}
                <div
                  style={
                    uploadBox
                  }
                >
                  <h3>
                    Upload Video
                  </h3>

                  <input
                    type="file"
                    accept="video/*"
                    required
                    onChange={(
                      e
                    ) =>
                      setVideo(
                        e.target
                          .files[0]
                      )
                    }
                  />

                  {video && (
  <div
    style={{
      marginTop:
        "15px",
      padding:
        "12px",
      borderRadius:
        "12px",
      background:
        "#2b2b2b",
      color:
        "#ddd",
      fontSize:
        "14px",
      wordBreak:
        "break-word",
    }}
  >
    ✅ Selected:
    <br />
    {video.name}
  </div>
)}
                </div>

                {/* THUMBNAIL */}
                {type ===
                  "video" && (
                  <div
                    style={
                      uploadBox
                    }
                  >
                    <h3>
                      Upload Thumbnail
                    </h3>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(
                        e
                      ) => {
                        const file =
                          e
                            .target
                            .files[0];

                        if (
                          file
                        ) {
                          setThumbnail(
                            file
                          );

                          setThumbnailPreview(
                            URL.createObjectURL(
                              file
                            )
                          );
                        }
                      }}
                    />

                    {thumbnailPreview && (
                      <img
                        src={
                          thumbnailPreview
                        }
                        alt="preview"
                        style={{
                          width:
                            "100%",

                          height:
                            "170px",

                          objectFit:
                            "cover",

                          borderRadius:
                            "12px",

                          marginTop:
                            "12px",
                        }}
                      />
                    )}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={
                  loading
                }
                style={{
                  width:
                    "100%",

                  marginTop:
                    "35px",

                  background:
                    "#ff0000",

                  color:
                    "#fff",

                  border:
                    "none",

                  padding:
                    "18px",

                  borderRadius:
                    "14px",

                  fontSize:
                    "18px",

                  fontWeight:
                    "bold",

                  cursor:
                    "pointer",
                }}
              >
                {loading
                  ? "Uploading..."
                  : `Upload ${
                      type ===
                      "short"
                        ? "Short"
                        : "Video"
                    }`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

const labelStyle = {
  color: "#fff",
  fontSize: "15px",
  fontWeight: "600",
  marginBottom: "8px",
  display: "block",
};

const inputStyle = {
  width: "100%",
  padding: "15px",
  background: "#272727",
  border: "1px solid #333",
  borderRadius: "14px",
  color: "#fff",
  marginBottom: "25px",
};

const uploadBox = {
  flex: 1,
  minWidth: "300px",
  background: "#222",
  border: "1px dashed #444",
  borderRadius: "18px",
  padding: "25px",
  color: "#fff",
};

export default UploadVideo;