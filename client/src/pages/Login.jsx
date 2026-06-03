
import {
  useState,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  FaYoutube,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaGithub,
} from "react-icons/fa";

import {
  signInWithPopup,
} from "firebase/auth";

import {
  auth,
  googleProvider,
  githubProvider,
} from "../firebase";

import API
  from "../services/api";

import toast
  from "react-hot-toast";

function Login() {
  const navigate =
    useNavigate();

  const [
    formData,
    setFormData,
  ] = useState({
    email: "",
    password: "",
  });

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const handleChange =
    (e) => {
      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });
    };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(
          true
        );

        const response =
          await API.post(
            "/auth/login",
            formData
          );

        localStorage.setItem(
          "token",
          response.data
            .token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            response.data
              .user
          )
        );

        toast.success(
          "Login Successful"
        );

        navigate("/");
      } catch (
        error
      ) {
        toast.error(
          error.response
            ?.data
            ?.message ||
            "Login failed"
        );
      } finally {
        setLoading(
          false
        );
      }
    };

  const handleOAuthLogin =
    async (
      provider
    ) => {
      try {
        const result =
          await signInWithPopup(
            auth,
            provider
          );

        const firebaseUser =
          result.user;

        const response =
          await API.post(
            "/auth/oauth",
            {
              email:
                firebaseUser.email,

              fullName:
                firebaseUser.displayName,

              profilePic:
                firebaseUser.photoURL,
            }
          );

        localStorage.setItem(
          "token",
          response.data
            .token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            response.data
              .user
          )
        );

        toast.success(
          "Login Successful"
        );

        navigate("/");
      } catch (
        error
      ) {
        console.log(
          error
        );

        toast.error(
          "OAuth login failed"
        );
      }
    };

  return (
    <div
      style={{
        minHeight:
          "100vh",
        display:
          "flex",
        justifyContent:
          "center",
        alignItems:
          "center",
        background:
          "#f9f9f9",
        padding:
          "20px",
      }}
    >
      <div
        style={{
          width:
            "100%",
          maxWidth:
            "420px",
          background:
            "#fff",
          padding:
            "40px",
          borderRadius:
            "20px",
          boxShadow:
            "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            textAlign:
              "center",
            marginBottom:
              "30px",
          }}
        >
          <FaYoutube
            size={55}
            color="red"
          />

          <h1>
            Login
          </h1>

          <p
            style={{
              color:
                "gray",
            }}
          >
            Welcome back
          </p>
        </div>

        <form
          onSubmit={
            handleSubmit
          }
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={
              handleChange
            }
            required
            style={{
              width:
                "100%",
              padding:
                "14px",
              marginBottom:
                "16px",
              border:
                "1px solid #ddd",
              borderRadius:
                "12px",
              outline:
                "none",
            }}
          />

          <div
            style={{
              position:
                "relative",
            }}
          >
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              placeholder="Password"
              onChange={
                handleChange
              }
              required
              style={{
                width:
                  "100%",
                padding:
                  "14px",
                border:
                  "1px solid #ddd",
                borderRadius:
                  "12px",
                outline:
                  "none",
              }}
            />

            <span
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              style={{
                position:
                  "absolute",
                right:
                  "15px",
                top:
                  "16px",
                cursor:
                  "pointer",
              }}
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </span>
          </div>

          <button
            type="submit"
            disabled={
              loading
            }
            style={{
              width:
                "100%",
              padding:
                "14px",
              marginTop:
                "25px",
              border:
                "none",
              borderRadius:
                "14px",
              background:
                "#ff0000",
              color:
                "#fff",
              fontSize:
                "16px",
              fontWeight:
                "bold",
              cursor:
                "pointer",
            }}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <div
          style={{
            display:
              "flex",
            alignItems:
              "center",
            margin:
              "20px 0",
          }}
        >
          <hr
            style={{
              flex: 1,
            }}
          />

          <span
            style={{
              margin:
                "0 12px",
              color:
                "#777",
              fontSize:
                "14px",
            }}
          >
            OR
          </span>

          <hr
            style={{
              flex: 1,
            }}
          />
        </div>

        <div
          style={{
            display:
              "flex",
            flexDirection:
              "column",
            gap:
              "12px",
          }}
        >
          <button
            type="button"
            onClick={() =>
              handleOAuthLogin(
                googleProvider
              )
            }
            style={{
              width:
                "100%",
              padding:
                "14px",
              border:
                "1px solid #ddd",
              borderRadius:
                "14px",
              background:
                "#fff",
              cursor:
                "pointer",
              display:
                "flex",
              alignItems:
                "center",
              justifyContent:
                "center",
              gap:
                "10px",
              fontWeight:
                "bold",
            }}
          >
            <FaGoogle />
            Continue with Google
          </button>

          <button
            type="button"
            onClick={() =>
              handleOAuthLogin(
                githubProvider
              )
            }
            style={{
              width:
                "100%",
              padding:
                "14px",
              border:
                "1px solid #ddd",
              borderRadius:
                "14px",
              background:
                "#181818",
              color:
                "#fff",
              cursor:
                "pointer",
              display:
                "flex",
              alignItems:
                "center",
              justifyContent:
                "center",
              gap:
                "10px",
              fontWeight:
                "bold",
            }}
          >
            <FaGithub />
            Continue with GitHub
          </button>
        </div>

        <p
          style={{
            textAlign:
              "center",
            marginTop:
              "20px",
          }}
        >
          Don't have an
          account?{" "}
          <Link to="/signup">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
