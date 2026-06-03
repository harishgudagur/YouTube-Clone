
import {
  useState,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import toast
  from "react-hot-toast";

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

function Signup() {
  const navigate =
    useNavigate();

  const [
    formData,
    setFormData,
  ] = useState({
    fullName: "",
    username: "",
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

        await API.post(
          "/auth/signup",
          formData
        );

        toast.success(
          "Signup Successful. Please login"
        );

        navigate(
          "/login"
        );
      } catch (
        error
      ) {
        toast.error(
          error.response
            ?.data
            ?.message ||
            "Signup failed"
        );
      } finally {
        setLoading(
          false
        );
      }
    };

  const handleOAuthSignup =
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

        toast.success(
          "Signup Successful. Please login"
        );

        navigate("/login");
      } catch (
        error
      ) {
        console.log(
          error
        );

        toast.error(
          "OAuth signup failed"
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
          "#f5f5f5",
        padding:
          "20px",
      }}
    >
      <div
        style={{
          width:
            "100%",
          maxWidth:
            "430px",
          background:
            "#fff",
          padding:
            "40px",
          borderRadius:
            "24px",
          boxShadow:
            "0 8px 30px rgba(0,0,0,0.08)",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign:
              "center",
            marginBottom:
              "28px",
          }}
        >
          <FaYoutube
            size={58}
            color="red"
          />

          <h1
            style={{
              margin:
                "12px 0 8px",
            }}
          >
            Create Account
          </h1>

          <p
            style={{
              color:
                "#666",
              fontSize:
                "14px",
            }}
          >
            Join YouTube Clone
          </p>
        </div>

        {/* OAuth Buttons */}
        <div
          style={{
            display:
              "flex",
            flexDirection:
              "column",
            gap:
              "14px",
          }}
        >
          <button
            type="button"
            onClick={() =>
              handleOAuthSignup(
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
                "600",
              fontSize:
                "15px",
            }}
          >
            <FaGoogle
              color="#EA4335"
            />
            Continue with Google
          </button>

          <button
            type="button"
            onClick={() =>
              handleOAuthSignup(
                githubProvider
              )
            }
            style={{
              width:
                "100%",
              padding:
                "14px",
              border:
                "none",
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
                "600",
              fontSize:
                "15px",
            }}
          >
            <FaGithub />
            Continue with GitHub
          </button>
        </div>

        {/* Divider */}
        <div
          style={{
            display:
              "flex",
            alignItems:
              "center",
            margin:
              "25px 0",
          }}
        >
          <hr
            style={{
              flex: 1,
              border:
                "0.5px solid #ddd",
            }}
          />

          <span
            style={{
              margin:
                "0 14px",
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
              border:
                "0.5px solid #ddd",
            }}
          />
        </div>

        {/* Form */}
        <form
          onSubmit={
            handleSubmit
          }
        >
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            onChange={
              handleChange
            }
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={
              handleChange
            }
            required
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={
              handleChange
            }
            required
            style={inputStyle}
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
                ...inputStyle,
                marginBottom:
                  "0px",
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
                  "16px",
                top:
                  "18px",
                cursor:
                  "pointer",
                color:
                  "#777",
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
                "15px",
              marginTop:
                "22px",
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
              ? "Creating..."
              : "Create Account"}
          </button>
        </form>

        <p
          style={{
            textAlign:
              "center",
            marginTop:
              "22px",
            color:
              "#555",
          }}
        >
          Already have an
          account?{" "}
          <Link
            to="/login"
            style={{
              color:
                "#ff0000",
              fontWeight:
                "600",
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle =
{
  width:
    "100%",
  padding:
    "15px",
  marginBottom:
    "14px",
  border:
    "1px solid #ddd",
  borderRadius:
    "14px",
  outline:
    "none",
  fontSize:
    "15px",
  background:
    "#fafafa",
};

export default Signup;
