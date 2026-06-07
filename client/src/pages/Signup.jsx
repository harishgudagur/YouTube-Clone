import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaGoogle,
  FaGithub,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] =
    useState({
      fullName: "",
      username: "",
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      setLoading(true);
      setError("");

      try {
        const res =
          await axios.post(
            `${API_URL}/auth/signup`,
            formData,
            {
              withCredentials:
                true,
            }
          );

        localStorage.setItem(
          "token",
          res.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            res.data.user
          )
        );

        navigate("/");
      } catch (err) {
        setError(
          err.response?.data
            ?.message ||
            "Signup failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-[#ededed] flex items-center justify-center px-4">
      <div className="bg-[#f8f8f8] w-full max-w-md rounded-[32px] shadow-md px-10 py-10">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
            alt="youtube"
            className="w-16"
          />
        </div>

        <h1 className="text-5xl font-bold text-center">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-3 mb-8 text-lg">
          Join YouTube Clone
        </p>

        {/* Google */}
        <button className="w-full border rounded-2xl py-4 flex items-center justify-center gap-3 font-semibold text-lg hover:bg-gray-100 transition">
          <FaGoogle className="text-red-500" />
          Continue with Google
        </button>

        {/* GitHub */}
        <button className="w-full bg-[#101114] text-white rounded-2xl py-4 flex items-center justify-center gap-3 font-semibold text-lg mt-5 hover:opacity-90 transition">
          <FaGithub />
          Continue with GitHub
        </button>

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 border-t"></div>
          <span className="px-5 text-gray-500 text-xl">
            OR
          </span>
          <div className="flex-1 border-t"></div>
        </div>

        {error && (
          <div className="bg-red-100 text-red-500 p-3 rounded-xl mb-4 text-center">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={
              formData.fullName
            }
            onChange={
              handleChange
            }
            required
            className="w-full rounded-2xl border border-gray-300 px-5 py-4 bg-white text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg"
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={
              formData.username
            }
            onChange={
              handleChange
            }
            required
            className="w-full rounded-2xl border px-5 py-4 bg-transparent outline-none text-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
            required
            className="w-full rounded-2xl border px-5 py-4 bg-transparent outline-none text-lg"
          />

          <div className="relative">
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
                handleChange
              }
              required
              className="w-full rounded-2xl border px-5 py-4 bg-transparent outline-none text-lg"
            />

            <button
              type="button"
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white rounded-2xl py-4 text-xl font-semibold transition"
          >
            {loading
              ? "Creating..."
              : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-600 text-lg">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-red-600 font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;