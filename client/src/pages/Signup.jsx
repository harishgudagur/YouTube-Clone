import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import OTPVerification from './OTPVerification';
import axios from 'axios';

const Signup = () => {
  const [step, setStep] = useState(1); // 1: info, 2: otp, 3: password
  const [authType, setAuthType] = useState('email'); // email or phone
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Step 1: Send OTP
  const handleSendOTP = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const identifier = authType === 'email' ? formData.email : formData.phone;

      if (!identifier) {
        setError(`Please enter your ${authType}`);
        setLoading(false);
        return;
      }

      const endpoint = authType === 'email' ? '/auth/send-email-otp' : '/auth/send-phone-otp';
      const payload = authType === 'email' ? { email: identifier } : { phone: identifier };

      // withCredentials: true ensures cross-origin cookies work correctly
      const response = await axios.post(`${API_URL}${endpoint}`, payload, { withCredentials: true });

      if (response.data.success) {
        setStep(2);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async () => {
    setError('');
    setLoading(true);

    try {
      if (!otp || otp.length !== 6) {
        setError('Please enter a valid 6-digit OTP');
        setLoading(false);
        return;
      }

      const identifier = authType === 'email' ? formData.email : formData.phone;

      const response = await axios.post(`${API_URL}/auth/verify-otp`, {
        identifier,
        otp,
        otpType: 'signup',
      }, { withCredentials: true });

      if (response.data.success) {
        setStep(3);
        setOtp('');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Create Account
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      const signupData = {
        email: formData.email,
        phone: formData.phone || null,
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        otpVerified: true,
      };

      const response = await axios.post(`${API_URL}/auth/signup`, signupData, { withCredentials: true });

      if (response.data.success) {
        // Standardize key name as 'token' to match ProtectedRoute.jsx and api.js
        localStorage.setItem('token', response.data.data.accessToken);
        localStorage.setItem('refreshToken', response.data.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));

        // Redirect to home
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-red-600">YouTube</h1>
          <p className="text-gray-400 mt-2">Create your account</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-500 bg-opacity-20 border border-red-500 rounded text-red-200">
            {error}
          </div>
        )}

        {/* Step 1: Email/Phone Input */}
        {step === 1 && (
          <form onSubmit={handleSendOTP} className="space-y-4">
            {/* Auth Type Selection */}
            <div className="flex gap-4 mb-6">
              <button
                type="button"
                onClick={() => setAuthType('email')}
                className={`flex-1 py-2 px-4 rounded ${
                  authType === 'email'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700 text-gray-300'
                }`}
              >
                Email
              </button>
              <button
                type="button"
                onClick={() => setAuthType('phone')}
                className={`flex-1 py-2 px-4 rounded ${
                  authType === 'phone'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700 text-gray-300'
                }`}
              >
                Phone
              </button>
            </div>

            {authType === 'email' ? (
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-red-500"
                required
              />
            ) : (
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-red-500"
                required
              />
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-2 rounded font-semibold hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>

            <p className="text-center text-gray-400 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-red-600 hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        )}

        {/* Step 2: OTP Verification */}
        {step === 2 && (
          <OTPVerification
            identifier={authType === 'email' ? formData.email : formData.phone}
            authType={authType}
            otp={otp}
            setOtp={setOtp}
            loading={loading}
            onVerify={handleVerifyOTP}
            onResend={handleSendOTP}
          />
        )}

        {/* Step 3: Password & Details */}
        {step === 3 && (
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-red-500"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-red-500"
                required
              />
            </div>

            <input
              type="password"
              name="password"
              placeholder="Password (min. 6 characters)"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-red-500"
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-red-500"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-2 rounded font-semibold hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;