import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import toast from "react-hot-toast";

// Lazy load pages for code splitting
const Home = lazy(() =>
  import("./pages/Home")
);
const Login = lazy(() =>
  import("./pages/Login")
);
const Signup = lazy(() =>
  import("./pages/Signup")
);
const ForgotPassword = lazy(() =>
  import("./pages/ForgotPassword")
);
const ResetPassword = lazy(() =>
  import("./pages/ResetPassword")
);
const UploadVideo = lazy(() =>
  import("./pages/UploadVideo/UploadVideo")
);
const VideoDetails = lazy(() =>
  import("./pages/VideoDetails/VideoDetails")
);
const Search = lazy(() =>
  import("./pages/Search/Search")
);
const Profile = lazy(() =>
  import("./pages/Profile/Profile")
);
const History = lazy(() =>
  import("./pages/History/History")
);
const Subscriptions = lazy(() =>
  import("./pages/Subscriptions/Subscriptions")
);
const Channel = lazy(() =>
  import("./pages/Channel/Channel")
);
const Shorts = lazy(() =>
  import("./pages/Shorts/Shorts")
);
const Trending = lazy(() =>
  import("./pages/Trending/Trending")
);
const Library = lazy(() =>
  import("./pages/Library/Library")
);
const WatchLater = lazy(() =>
  import("./pages/WatchLater/WatchLater")
);
const LikedVideos = lazy(() =>
  import("./pages/LikedVideos/LikedVideos")
);
const NotFound = lazy(() =>
  import("./pages/NotFound/NotFound")
);

/**
 * Loading Fallback Component
 * Shown while lazy-loaded components are loading
 */
const LoadingFallback = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#0f0f0f",
      color: "#fff",
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
    <p style={{ fontSize: "16px" }}>Loading...</p>
    <style>{`
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

/**
 * Protected Route Component
 * Checks if user is authenticated before allowing access
 */
const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (!token || !user) {
    // Show error and redirect to login
    toast.error("Please login to continue");
    return <Navigate to="/login" replace />;
  }

  return element;
};

/**
 * Auth Route Component
 * Redirects to home if user is already authenticated
 */
const AuthRoute = ({ element }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" replace />;
  }

  return element;
};

/**
 * Error Boundary Component
 * Catches component errors and displays fallback UI
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error: error,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    toast.error("Something went wrong. Please refresh the page.");
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            background: "#0f0f0f",
            color: "#fff",
            flexDirection: "column",
            gap: "20px",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <div style={{ fontSize: "60px" }}>
            ⚠️
          </div>
          <h1 style={{ fontSize: "30px" }}>
            Oops! Something went wrong
          </h1>
          <p style={{ color: "#aaa", maxWidth: "500px" }}>
            {this.state.error?.message ||
              "An unexpected error occurred"}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "10px 24px",
              backgroundColor: "#ff6b6b",
              color: "#fff",
              border: "none",
              borderRadius: "20px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Main App Component with Routing
 */
function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* PUBLIC ROUTES */}
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Auth Routes (Redirect if already logged in) */}
          <Route
            path="/login"
            element={
              <AuthRoute element={<Login />} />
            }
          />

          <Route
            path="/signup"
            element={
              <AuthRoute element={<Signup />} />
            }
          />

          <Route
            path="/forgot-password"
            element={
              <AuthRoute
                element={<ForgotPassword />}
              />
            }
          />

          <Route
            path="/reset-password/:token"
            element={
              <AuthRoute
                element={<ResetPassword />}
              />
            }
          />

          {/* Public Content Routes */}
          <Route
            path="/video/:id"
            element={<VideoDetails />}
          />

          <Route
            path="/search/:query"
            element={<Search />}
          />

          <Route
            path="/channel/:id"
            element={<Channel />}
          />

          <Route
            path="/shorts"
            element={<Shorts />}
          />

          <Route
            path="/trending"
            element={<Trending />}
          />

          {/* PROTECTED ROUTES (Require Authentication) */}
          {/* User Profile Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={<Profile />}
              />
            }
          />

          {/* User Content Routes */}
          <Route
            path="/upload"
            element={
              <ProtectedRoute
                element={<UploadVideo />}
              />
            }
          />

          <Route
            path="/history"
            element={
              <ProtectedRoute
                element={<History />}
              />
            }
          />

          <Route
            path="/subscriptions"
            element={
              <ProtectedRoute
                element={<Subscriptions />}
              />
            }
          />

          <Route
            path="/library"
            element={
              <ProtectedRoute
                element={<Library />}
              />
            }
          />

          <Route
            path="/watch-later"
            element={
              <ProtectedRoute
                element={<WatchLater />}
              />
            }
          />

          <Route
            path="/liked"
            element={
              <ProtectedRoute
                element={<LikedVideos />}
              />
            }
          />

          {/* 404 NOT FOUND - MUST BE LAST */}
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
