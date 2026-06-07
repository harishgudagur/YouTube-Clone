import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";

/**
 * Verify root element exists before rendering
 */
const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error(
    'Root element with id "root" not found in HTML'
  );
  throw new Error(
    'Root element not found. Please check your index.html file.'
  );
}

/**
 * Create and render app
 */
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    {/* Router wrapper for navigation */}
    <BrowserRouter>
      {/* Main App Component */}
      <App />

      {/* Toast notification system */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          // Default styles
          style: {
            borderRadius: "12px",
            background: "#333",
            color: "#fff",
            padding: "16px",
            fontWeight: "500",
            fontSize: "14px",
          },
          // Success toast style
          success: {
            duration: 3000,
            style: {
              background: "#10b981",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#10b981",
            },
          },
          // Error toast style
          error: {
            duration: 4000,
            style: {
              background: "#ef4444",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#ef4444",
            },
          },
          // Loading toast style
          loading: {
            style: {
              background: "#3b82f6",
              color: "#fff",
            },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);

/**
 * Global error handler for unhandled promise rejections
 */
window.addEventListener("unhandledrejection", (event) => {
  console.error(
    "Unhandled promise rejection:",
    event.reason
  );
  // You could send this to error tracking service
});

/**
 * Global error handler for uncaught errors
 */
window.addEventListener("error", (event) => {
  console.error("Global error:", event.error);
  // You could send this to error tracking service
});
