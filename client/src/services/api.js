import axios from "axios";

const API =
  axios.create({
    baseURL:
      "https://youtube-clone-xaye.onrender.com/api",
  });

API.interceptors.request.use(
  (req) => {
    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {
      req.headers.Authorization =
        `Bearer ${token}`;
    }

    return req;
  }
);

// Video APIs
export const getVideos =
  () =>
    API.get("/video");

export const getVideo =
  (id) =>
    API.get(
      `/video/${id}`
    );

export const uploadVideo =
  (formData) =>
    API.post(
      "/video/upload",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

export const likeVideo =
  (id) =>
    API.put(
      `/video/like/${id}`
    );

export const deleteVideo =
  (id) =>
    API.delete(
      `/video/${id}`
    );

// Comment APIs
export const addComment =
  (
    videoId,
    text
  ) =>
    API.post(
      `/comment/${videoId}`,
      { text }
    );

export const getComments =
  (videoId) =>
    API.get(
      `/comment/${videoId}`
    );

export const searchVideos =
  (query) =>
    API.get(
      `/video/search?q=${query}`
    );

export const getMyVideos =
  () =>
    API.get(
      "/video/my-videos"
    );
   
export const subscribeChannel =
  (id) =>
    API.put(
      `/user/subscribe/${id}`
    );

export const addToHistory =
  (id) =>
    API.post(
      `/history/${id}`
    );

export const getHistory =
  () =>
    API.get(
      "/history"
    );

export const getRelatedVideos =
  (id) =>
    API.get(
      `/video/related/${id}`
    );

export const updateProfile =
  (formData) =>
    API.put(
      "/user/update-profile",
      formData
    );

export const getChannel =
  (id) =>
    API.get(
      `/user/channel/${id}`
    );
    
export const getLikedVideos =
  () =>
    API.get(
      "/video/liked"
    );

export const toggleWatchLater =
  (id) =>
    API.put(
      `/video/watch-later/${id}`
    );

export const getWatchLater =
  () =>
    API.get(
      "/video/watch-later"
    );

export default API;