import React, { useRef, useEffect, useState } from 'react';

const OTPVerification = ({ identifier, authType, otp, setOtp, loading, onVerify, onResend }) => {
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  // Convert the string 'otp' (which could be shorter than 6) to a padded 6-element array
  const otpArray = otp.split('').concat(Array(6).fill('')).slice(0, 6);

  const handleOTPChange = (index, value) => {
    // Only allow single digit or empty
    if (!/^[0-9]*$/.test(value)) return;
    
    // Take only the last character entered (in case they type multiple)
    const singleVal = value.slice(-1);
    
    const newOtpArray = [...otpArray];
    newOtpArray[index] = singleVal;
    const otpString = newOtpArray.join('');
    setOtp(otpString);

    // Auto-focus next field if a value was entered
    if (singleVal && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newOtpArray = [...otpArray];
      if (otpArray[index]) {
        // Clear the current input
        newOtpArray[index] = '';
        setOtp(newOtpArray.join(''));
      } else if (index > 0) {
        // Clear the previous input and focus it
        newOtpArray[index - 1] = '';
        setOtp(newOtpArray.join(''));
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleResend = async (e) => {
    e.preventDefault();
    setCanResend(false);
    setResendTimer(60);
    setOtp('');
    await onResend(e);
  };

  return (
    <form className="space-y-6">
      <div>
        <p className="text-center text-gray-400 mb-2">
          OTP sent to {authType === 'email' ? 'email' : 'phone number'}:
        </p>
        <p className="text-center text-white font-semibold">{identifier}</p>
      </div>

      <div>
        <label className="block text-gray-300 text-sm mb-2">Enter OTP</label>
        <div className="flex gap-2 justify-center">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="1"
              value={otpArray[index]}
              onChange={(e) => handleOTPChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-2xl bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-red-500"
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onVerify}
        disabled={loading || otp.length !== 6}
        className="w-full bg-red-600 text-white py-2 rounded font-semibold hover:bg-red-700 disabled:opacity-50"
      >
        {loading ? 'Verifying...' : 'Verify OTP'}
      </button>

      <div className="text-center">
        {!canResend ? (
          <p className="text-gray-400 text-sm">
            Resend OTP in <span className="text-red-600 font-semibold">{resendTimer}s</span>
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            className="text-red-600 hover:underline text-sm font-semibold"
          >
            Resend OTP
          </button>
        )}
      </div>
    </form>
  );
};

export default OTPVerification;
