import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

/**
 * Firebase Configuration
 * Get these from: https://firebase.google.com/docs/web/setup
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env
    .VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env
    .VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env
    .VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env
    .VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env
    .VITE_FIREBASE_APP_ID,
};

/**
 * Validate Firebase configuration
 * Ensures all required environment variables are set
 */
const validateConfig = (config) => {
  const requiredFields = [
    "apiKey",
    "authDomain",
    "projectId",
    "storageBucket",
    "messagingSenderId",
    "appId",
  ];

  const missingFields = requiredFields.filter(
    (field) => !config[field]
  );

  if (missingFields.length > 0) {
    console.error(
      "Missing Firebase config fields:",
      missingFields.join(", ")
    );
    console.error(
      "Please set the following environment variables:"
    );
    missingFields.forEach((field) => {
      const envVar = `VITE_FIREBASE_${field
        .toUpperCase()
        .replace(/([A-Z])/g, "_$1")
        .toUpperCase()
        .replace(/^_/, "")}`;
      console.error(`  ${envVar}`);
    });
    throw new Error(
      `Firebase configuration incomplete. Missing: ${missingFields.join(", ")}`
    );
  }

  return config;
};

/**
 * Initialize Firebase
 */
let app;
let auth;
let googleProvider;
let githubProvider;

try {
  // Validate and initialize
  validateConfig(firebaseConfig);
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);

  // Enable persistence - keeps user logged in after refresh
  setPersistence(auth, browserLocalPersistence).catch(
    (error) => {
      console.warn(
        "Firebase persistence error:",
        error.message
      );
    }
  );

  // Initialize providers
  googleProvider = new GoogleAuthProvider();
  githubProvider = new GithubAuthProvider();

  // Configure Google provider
  googleProvider.addScope("profile");
  googleProvider.addScope("email");

  // Configure GitHub provider
  githubProvider.addScope("user:email");

  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Firebase initialization error:", error);

  // In development, log but don't crash
  if (import.meta.env.DEV) {
    console.warn(
      "Firebase not available in development. Using mock auth."
    );
  } else {
    // In production, throw error
    throw error;
  }
}

/**
 * Export Firebase services
 */
export { app, auth, googleProvider, githubProvider };

/**
 * Check if Firebase is initialized
 */
export const isFirebaseInitialized = () => {
  return (
    app !== undefined &&
    auth !== undefined &&
    googleProvider !== undefined &&
    githubProvider !== undefined
  );
};

export default app;
