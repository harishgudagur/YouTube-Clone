import {
  Routes,
  Route,
} from "react-router-dom";

import Home
from "./pages/Home";

import Login
from "./pages/Login";

import Signup
from "./pages/Signup";

import UploadVideo
from "./pages/UploadVideo/UploadVideo";

import VideoDetails
from "./pages/VideoDetails/VideoDetails";

import Search
from "./pages/Search/Search";

import Profile
from "./pages/Profile/Profile";

import History
from "./pages/History/History";

import Subscriptions
from "./pages/Subscriptions/Subscriptions";

import Channel
from "./pages/Channel/Channel";

import Shorts
from "./pages/Shorts/Shorts";

import Trending
from "./pages/Trending/Trending";

// NEW
import Library
from "./pages/Library/Library";

import WatchLater
from "./pages/WatchLater/WatchLater";

import LikedVideos
from "./pages/LikedVideos/LikedVideos";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
         <Home />
        }
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
        path="/upload"
        element={
          <UploadVideo />
        }
      />

      <Route
        path="/video/:id"
        element={
          <VideoDetails
            key={
              window.location.pathname
            }
          />
        }
      />

      <Route
        path="/search/:query"
        element={
          <Search />
        }
      />

      <Route
        path="/profile"
        element={
          <Profile />
        }
      />

      <Route
        path="/history"
        element={
          <History />
        }
      />

      <Route
        path="/subscriptions"
        element={
          <Subscriptions />
        }
      />

      <Route
        path="/channel/:id"
        element={
          <Channel />
        }
      />

      <Route
        path="/shorts"
        element={
          <Shorts />
        }
      />

      <Route
        path="/trending"
        element={
          <Trending />
        }
      />

      {/* NEW */}
      <Route
        path="/library"
        element={
          <Library />
        }
      />

      <Route
        path="/watch-later"
        element={
          <WatchLater />
        }
      />

      <Route
        path="/liked"
        element={
          <LikedVideos />
        }
      />
    </Routes>
  );
}

export default App;