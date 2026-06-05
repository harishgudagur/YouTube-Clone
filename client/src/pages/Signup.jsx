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

const Signup = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const API_URL =
    import.meta.env
      .VITE_API_URL;

  // GOOGLE LOGIN
  const handleGoogleSignup =
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
          response.data.token
        );

        localStorage.setItem(
          'user',
          JSON.stringify(
            response.data.user
          )
        );

        navigate('/');
      } catch (err) {
        console.log(err);
        alert(
          'OAuth signup failed'
        );
      }
    };

  // GITHUB LOGIN
  const handleGithubSignup =
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
          response.data.token
        );

        localStorage.setItem(
          'user',
          JSON.stringify(
            response.data.user
          )
        );

        navigate('/');
      } catch (err) {
        console.log(err);
        alert(
          'OAuth signup failed'
        );
      }
    };

  // SEND OTP
  const handleSendOTP =
    async () => {
      try {
        setLoading(true);

        await axios.post(
          `${API_URL}/auth/send-email-otp`,
          { email }
        );

        setStep(2);
      } catch (err) {
        setError(
          err.response?.data
            ?.message
        );
      } finally {
        setLoading(false);
      }
    };

  // VERIFY OTP
  const verifyOTP =
    async () => {
      try {
        await axios.post(
          `${API_URL}/auth/verify-otp`,
          {
            identifier:
              email,
            otp,
            otpType:
              'signup',
          }
        );

        setStep(3);
      } catch (err) {
        setError(
          'Invalid OTP'
        );
      }
    };

  // CREATE ACCOUNT
  const handleSignup =
    async (e) => {
      e.preventDefault();

      try {
        const response =
          await axios.post(
            `${API_URL}/auth/signup`,
            {
              email,
              firstName:
                formData.firstName,
              lastName:
                formData.lastName,
              password:
                formData.password,
              confirmPassword:
                formData.confirmPassword,
            }
          );

        localStorage.setItem(
          'token',
          response.data.data
            .accessToken
        );

        localStorage.setItem(
          'user',
          JSON.stringify(
            response.data.data
              .user
          )
        );

        navigate('/');
      } catch (err) {
        setError(
          err.response?.data
            ?.message
        );
      }
    };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-[430px]">

        <div className="flex justify-center mb-5">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
            className="w-16"
          />
        </div>

        <h1 className="text-5xl font-bold text-center">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Join YouTube Clone
        </p>

        {step === 1 && (
          <>
            <button
              onClick={
                handleGoogleSignup
              }
              className="w-full border rounded-xl py-4 mb-4 font-semibold flex justify-center items-center gap-3"
            >
              Continue with Google
            </button>

            <button
              onClick={
                handleGithubSignup
              }
              className="w-full bg-black text-white rounded-xl py-4 font-semibold"
            >
              Continue with GitHub
            </button>

            <div className="flex items-center my-7">
              <div className="border flex-1"></div>
              <span className="mx-3 text-gray-500">
                OR
              </span>
              <div className="border flex-1"></div>
            </div>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full border rounded-xl p-4"
            />

            <button
              onClick={
                handleSendOTP
              }
              className="bg-red-600 hover:bg-red-700 text-white w-full py-4 rounded-xl mt-5 font-semibold"
            >
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) =>
                setOtp(
                  e.target.value
                )
              }
              className="w-full border rounded-xl p-4"
            />

            <button
              onClick={
                verifyOTP
              }
              className="bg-red-600 text-white w-full py-4 rounded-xl mt-5"
            >
              Verify OTP
            </button>
          </>
        )}

        {step === 3 && (
          <form
            onSubmit={
              handleSignup
            }
          >
            <input
              placeholder="First Name"
              className="w-full border rounded-xl p-4 mb-3"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  firstName:
                    e.target.value,
                })
              }
            />

            <input
              placeholder="Last Name"
              className="w-full border rounded-xl p-4 mb-3"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  lastName:
                    e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded-xl p-4 mb-3"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password:
                    e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border rounded-xl p-4 mb-5"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmPassword:
                    e.target.value,
                })
              }
            />

            <button className="bg-red-600 text-white w-full py-4 rounded-xl">
              Create Account
            </button>
          </form>
        )}

        <p className="text-center mt-6 text-gray-500">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-red-600"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;