import React, {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import {
  FcGoogle,
} from "react-icons/fc";

import {
  FaGithub,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const Signup = () => {
  const navigate =
    useNavigate();

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [
    formData,
    setFormData,
  ] = useState({
    fullName:
      "",
    email:
      "",
    password:
      "",
    confirmPassword:
      "",
  });

  const API_URL =
    import.meta.env
      .VITE_API_URL ||
    "http://localhost:5000/api";

  const handleInputChange =
    (e) => {
      const {
        name,
        value,
      } = e.target;

      setFormData(
        (
          prev
        ) => ({
          ...prev,
          [name]:
            value,
        })
      );
    };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      setError(
        ""
      );

      if (
        formData.password !==
        formData.confirmPassword
      ) {
        setError(
          "Passwords do not match"
        );
        return;
      }

      if (
        formData.password
          .length < 6
      ) {
        setError(
          "Password must be at least 6 characters"
        );
        return;
      }

      setLoading(
        true
      );

      try {
        const response =
          await axios.post(
            `${API_URL}/auth/signup`,
            {
              email:
                formData.email,
              fullName:
                formData.fullName,
              password:
                formData.password,
            }
          );

        if (
          response
            .data
            .success
        ) {
          localStorage.setItem(
            "token",
            response
              .data
              .token
          );

          localStorage.setItem(
            "user",
            JSON.stringify(
              response
                .data
                .user
            )
          );

          navigate(
            "/"
          );
        }
      } catch (
        err
      ) {
        setError(
          err
            .response
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

  return (
    <div
      style={{
        minHeight:
          "100vh",
        background:
          "#0f0f0f",
        display:
          "flex",
        justifyContent:
          "center",
        alignItems:
          "center",
        padding:
          "20px",
      }}
    >
      <div
        style={{
          width:
            "100%",
          maxWidth:
            "460px",
          background:
            "#181818",
          borderRadius:
            "20px",
          padding:
            "40px 32px",
          boxShadow:
            "0 0 25px rgba(255,0,0,0.12)",
          border:
            "1px solid #272727",
        }}
      >
        {/* Logo */}
        <div
          style={{
            textAlign:
              "center",
            marginBottom:
              "30px",
          }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            alt="logo"
            style={{
              width:
                "120px",
              marginBottom:
                "10px",
            }}
          />

          <h1
            style={{
              color:
                "#fff",
              fontSize:
                "34px",
              fontWeight:
                "700",
              marginBottom:
                "6px",
            }}
          >
            Create Account
          </h1>

          <p
            style={{
              color:
                "#aaa",
            }}
          >
            Join YouTube
            today
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              background:
                "#3b1212",
              color:
                "#ffb4b4",
              padding:
                "12px",
              borderRadius:
                "10px",
              marginBottom:
                "18px",
              textAlign:
                "center",
            }}
          >
            {error}
          </div>
        )}

        {/* OAuth */}
        <button
          type="button"
          style={{
            width:
              "100%",
            background:
              "#fff",
            border:
              "none",
            borderRadius:
              "14px",
            padding:
              "14px",
            display:
              "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
            gap:
              "10px",
            cursor:
              "pointer",
            fontWeight:
              "600",
            marginBottom:
              "14px",
          }}
        >
          <FcGoogle
            size={
              22
            }
          />
          Continue with
          Google
        </button>

        <button
          type="button"
          style={{
            width:
              "100%",
            background:
              "#000",
            color:
              "#fff",
            border:
              "1px solid #333",
            borderRadius:
              "14px",
            padding:
              "14px",
            display:
              "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
            gap:
              "10px",
            cursor:
              "pointer",
            fontWeight:
              "600",
          }}
        >
          <FaGithub
            size={
              20
            }
          />
          Continue with
          GitHub
        </button>

        {/* Divider */}
        <div
          style={{
            display:
              "flex",
            alignItems:
              "center",
            margin:
              "28px 0",
            color:
              "#666",
          }}
        >
          <div
            style={{
              flex:
                1,
              height:
                "1px",
              background:
                "#333",
            }}
          />

          <span
            style={{
              padding:
                "0 14px",
            }}
          >
            OR
          </span>

          <div
            style={{
              flex:
                1,
              height:
                "1px",
              background:
                "#333",
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
            value={
              formData.fullName
            }
            onChange={
              handleInputChange
            }
            required
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={
              formData.email
            }
            onChange={
              handleInputChange
            }
            required
            style={{
              ...inputStyle,
              marginTop:
                "14px",
            }}
          />

          <div
            style={{
              position:
                "relative",
              marginTop:
                "14px",
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
              value={
                formData.password
              }
              onChange={
                handleInputChange
              }
              required
              style={
                inputStyle
              }
            />

            <span
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              style={
                eyeStyle
              }
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </span>
          </div>

          <div
            style={{
              position:
                "relative",
              marginTop:
                "14px",
            }}
          >
            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              name="confirmPassword"
              placeholder="Confirm Password"
              value={
                formData.confirmPassword
              }
              onChange={
                handleInputChange
              }
              required
              style={
                inputStyle
              }
            />

            <span
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              style={
                eyeStyle
              }
            >
              {showConfirmPassword ? (
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
              marginTop:
                "22px",
              background:
                "#ff0000",
              color:
                "#fff",
              border:
                "none",
              borderRadius:
                "14px",
              padding:
                "16px",
              fontSize:
                "16px",
              fontWeight:
                "700",
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
              "24px",
            color:
              "#aaa",
          }}
        >
          Already have
          an account?{" "}
          <Link
            to="/login"
            style={{
              color:
                "#ff0000",
              textDecoration:
                "none",
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
};

const inputStyle =
  {
    width:
      "100%",
    padding:
      "16px",
    borderRadius:
      "14px",
    border:
      "1px solid #333",
    background:
      "#222",
    color:
      "#fff",
    outline:
      "none",
  };

const eyeStyle =
  {
    position:
      "absolute",
    right:
      "16px",
    top:
      "18px",
    color:
      "#888",
    cursor:
      "pointer",
  };

export default Signup;