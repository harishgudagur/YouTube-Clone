import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  signInWithPopup,
} from 'firebase/auth';

import {
  auth,
  googleProvider,
  githubProvider,
} from '../firebase';

const Login = () => {
  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      identifier: '',
      password: '',
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const API_URL =
    import.meta.env
      .VITE_API_URL;

  // Handle input change
  const handleInputChange =
    (e) => {
      const {
        name,
        value,
      } = e.target;

      setFormData(
        (prev) => ({
          ...prev,
          [name]:
            value,
        })
      );
    };

  // Normal Login
  const handleSubmit =
    async (e) => {
      e.preventDefault();

      setError('');
      setLoading(true);

      try {
        const response =
          await axios.post(
            `${API_URL}/auth/login`,
            {
              identifier:
                formData.identifier,
              password:
                formData.password,
            },
            {
              withCredentials:
                true,
            }
          );

        if (
          response.data
            .success
        ) {
          localStorage.setItem(
            'token',
            response.data
              .data
              .accessToken
          );

          localStorage.setItem(
            'refreshToken',
            response.data
              .data
              .refreshToken
          );

          localStorage.setItem(
            'user',
            JSON.stringify(
              response.data
                .data
                .user
            )
          );

          navigate('/');
        }
      } catch (
        err
      ) {
        setError(
          err.response
            ?.data
            ?.message ||
            'Login failed'
        );
      } finally {
        setLoading(false);
      }
    };

  // Google Login
  const handleGoogleLogin =
    async () => {
      try {
        const result =
          await signInWithPopup(
            auth,
            googleProvider
          );

        const user =
          result.user;

        const response =
          await axios.post(
            `${API_URL}/auth/oauth-login`,
            {
              email:
                user.email,
              fullName:
                user.displayName,
              profilePic:
                user.photoURL,
            }
          );

        localStorage.setItem(
          'token',
          response.data
            .token
        );

        localStorage.setItem(
          'user',
          JSON.stringify(
            response.data
              .user
          )
        );

        navigate('/');
      } catch (
        err
      ) {
        console.log(
          err
        );

        setError(
          'Google login failed'
        );
      }
    };

  // GitHub Login
  const handleGithubLogin =
    async () => {
      try {
        const result =
          await signInWithPopup(
            auth,
            githubProvider
          );

        const user =
          result.user;

        const response =
          await axios.post(
            `${API_URL}/auth/oauth-login`,
            {
              email:
                user.email,
              fullName:
                user.displayName,
              profilePic:
                user.photoURL,
            }
          );

        localStorage.setItem(
          'token',
          response.data
            .token
        );

        localStorage.setItem(
          'user',
          JSON.stringify(
            response.data
              .user
          )
        );

        navigate('/');
      } catch (
        err
      ) {
        console.log(
          err
        );

        setError(
          'GitHub login failed'
        );
      }
    };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-[430px]">

        {/* Logo */}
        <div className="flex justify-center mb-5">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
            alt="youtube"
            className="w-16"
          />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-center">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Sign in to YouTube Clone
        </p>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        {/* OAuth */}
        <button
          onClick={
            handleGoogleLogin
          }
          className="w-full border rounded-xl py-4 mb-4 font-semibold flex justify-center items-center gap-3 hover:bg-gray-50"
        >
          Continue with Google
        </button>

        <button
          onClick={
            handleGithubLogin
          }
          className="w-full bg-black text-white rounded-xl py-4 font-semibold hover:bg-gray-800"
        >
          Continue with GitHub
        </button>

        {/* OR */}
        <div className="flex items-center my-7">
          <div className="border flex-1"></div>

          <span className="mx-3 text-gray-500">
            OR
          </span>

          <div className="border flex-1"></div>
        </div>

        {/* Login Form */}
        <form
          onSubmit={
            handleSubmit
          }
        >
          <input
            type="text"
            name="identifier"
            placeholder="Email or Phone"
            value={
              formData.identifier
            }
            onChange={
              handleInputChange
            }
            className="w-full border rounded-xl p-4 mb-4"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={
              formData.password
            }
            onChange={
              handleInputChange
            }
            className="w-full border rounded-xl p-4 mb-5"
            required
          />

          <button
            type="submit"
            disabled={
              loading
            }
            className="bg-red-600 hover:bg-red-700 text-white w-full py-4 rounded-xl font-semibold"
          >
            {loading
              ? 'Signing In...'
              : 'Sign In'}
          </button>
        </form>

        {/* Footer */}
        <div className="flex justify-between mt-5 text-sm">
          <Link
            to="/forgot-password"
            className="text-red-600 hover:underline"
          >
            Forgot Password?
          </Link>

          <Link
            to="/signup"
            className="text-red-600 hover:underline"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;