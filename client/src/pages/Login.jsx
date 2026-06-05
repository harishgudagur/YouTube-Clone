import React, {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import {
  FaGoogle,
  FaGithub,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const Login = () => {
  const navigate =
    useNavigate();

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

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
    error,
    setError,
  ] = useState("");

  const API_URL =
    import.meta.env
      .VITE_API_URL ||
    "http://localhost:5000/api";

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

      setLoading(true);

      try {
        const res =
          await axios.post(
            `${API_URL}/auth/login`,
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
            "Login failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-[#ededed] flex items-center justify-center px-4">
      <div className="bg-[#f8f8f8] w-full max-w-md rounded-[32px] shadow-md px-10 py-10">
        <div className="flex justify-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
            alt=""
            className="w-16"
          />
        </div>

        <h1 className="text-5xl font-bold text-center">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mt-3 mb-8 text-lg">
          Login to continue
        </p>

        <button className="w-full border rounded-2xl py-4 flex items-center justify-center gap-3 font-semibold text-lg">
          <FaGoogle className="text-red-500" />
          Continue with Google
        </button>

        <button className="w-full bg-[#101114] text-white rounded-2xl py-4 flex items-center justify-center gap-3 font-semibold text-lg mt-5">
          <FaGithub />
          Continue with GitHub
        </button>

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
            type="email"
            name="email"
            placeholder="Email"
            required
            value={
              formData.email
            }
            onChange={
              handleChange
            }
            className="w-full rounded-2xl border px-5 py-4 text-lg outline-none"
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
              required
              value={
                formData.password
              }
              onChange={
                handleChange
              }
              className="w-full rounded-2xl border px-5 py-4 text-lg outline-none"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-5 top-1/2 -translate-y-1/2"
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
            className="w-full bg-red-600 text-white rounded-2xl py-4 text-xl font-semibold"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-600 text-lg">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-red-600 font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;