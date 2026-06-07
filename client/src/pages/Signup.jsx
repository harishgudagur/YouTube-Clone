import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaGoogle,
  FaGithub,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import toast from "react-hot-toast";
import API from "../services/api";

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors above");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post(
        "/auth/signup",
        formData
      );

      // Store token and user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      // Show success message
      toast.success("Account created successfully!");

      // Redirect to home
      navigate("/");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Signup failed. Please try again.";

      setErrors({ submit: errorMsg });
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    toast.error("Google signup not configured yet");
    // TODO: Implement Google OAuth
  };

  const handleGithubSignup = () => {
    toast.error("GitHub signup not configured yet");
    // TODO: Implement GitHub OAuth
  };

  return (
    <div className="min-h-screen bg-[#ededed] flex items-center justify-center px-4 py-8">
      <div className="bg-[#f8f8f8] w-full max-w-md rounded-[32px] shadow-md px-10 py-10">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
            alt="youtube"
            className="w-16"
          />
        </div>

        <h1 className="text-5xl font-bold text-center text-black">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-3 mb-8 text-lg">
          Join YouTube Clone
        </p>

        {/* Google */}
        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full border border-gray-300 rounded-2xl py-4 flex items-center justify-center gap-3 font-semibold text-lg hover:bg-gray-100 transition text-black"
        >
          <FaGoogle className="text-red-500" />
          Continue with Google
        </button>

        {/* GitHub */}
        <button
          type="button"
          onClick={handleGithubSignup}
          className="w-full bg-[#101114] text-white rounded-2xl py-4 flex items-center justify-center gap-3 font-semibold text-lg mt-5 hover:opacity-90 transition"
        >
          <FaGithub />
          Continue with GitHub
        </button>

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-5 text-gray-500 text-xl">
            OR
          </span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Server Error */}
        {errors.submit && (
          <div className="bg-red-100 text-red-700 p-3 rounded-xl mb-4 text-center border border-red-300">
            {errors.submit}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Full Name */}
          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full rounded-2xl border px-5 py-4 bg-white text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg transition ${
                errors.fullName
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Username */}
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full rounded-2xl border px-5 py-4 bg-white text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg transition ${
                errors.username
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-2xl border px-5 py-4 bg-white text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg transition ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <input
                type={
                  showPassword ? "text" : "password"
                }
                name="password"
                placeholder="Password (min 6 characters)"
                value={formData.password}
                onChange={handleChange}
                className={`w-full rounded-2xl border px-5 py-4 bg-white text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg transition ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />

              <button
                type="button"
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white rounded-2xl py-4 text-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span>
                Creating...
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center mt-8 text-gray-600 text-lg">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-red-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
