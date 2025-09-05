import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaShieldAlt } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import ThreeBackground from '../common/ThreeBackground';

const OTPVerification = ({ email, onOTPVerified, onResendOTP }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Clear error when user starts typing
    if (errors.otp) {
      setErrors({ ...errors, otp: '' });
    }

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
      setOtp(newOtp.slice(0, 6));
      
      // Focus the next empty input or the last input
      const nextIndex = Math.min(pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      setErrors({ otp: 'Please enter the complete 6-digit OTP' });
      return;
    }

    if (!/^\d+$/.test(otpCode)) {
      setErrors({ otp: 'OTP should contain only numbers' });
      return;
    }

    setIsLoading(true);
    setErrors({});

    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      // In real app, verify with backend
      if (otpCode === '123456') { // Demo OTP
        if (onOTPVerified) {
          onOTPVerified(otpCode);
        }
      } else {
        setErrors({ otp: 'Invalid OTP. Please try again.' });
      }
    }, 2000);
  };

  const handleResend = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setTimeLeft(300);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      setErrors({});
      if (onResendOTP) {
        onResendOTP();
      }
      alert('New OTP sent to your email!');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-sky-500 to-sky-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Three.js Background */}
      <ThreeBackground />
      
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 2 }}>
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-sky-300/20 to-sky-400/20 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-r from-sky-400/20 to-sky-500/20 rounded-full animate-pulse delay-1000"></div>
      </div>

      {/* OTP Verification Card */}
      <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20" style={{ zIndex: 3 }}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-sky-500 to-sky-600 p-3 rounded-2xl">
              <FaShieldAlt className="text-white text-3xl" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-500 to-sky-600 bg-clip-text text-transparent">
            Verify OTP
          </h1>
          <p className="text-gray-600 mt-2">
            Enter the 6-digit code sent to
          </p>
          <p className="text-sky-600 font-medium">{email}</p>
        </div>

        {/* OTP Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 text-center block">
              Verification Code
            </label>
            <div className="flex justify-center space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={`w-12 h-14 text-center text-xl font-bold border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                    errors.otp 
                      ? 'border-red-400 focus:border-red-500 bg-red-50' 
                      : 'border-gray-200 focus:border-sky-500 hover:border-gray-300'
                  }`}
                  maxLength={1}
                />
              ))}
            </div>
            {errors.otp && (
              <p className="text-red-500 text-sm text-center">
                {errors.otp}
              </p>
            )}
          </div>

          {/* Timer */}
          <div className="text-center">
            {!canResend ? (
              <p className="text-gray-600 text-sm">
                Code expires in <span className="font-mono text-sky-600 font-medium">{formatTime(timeLeft)}</span>
              </p>
            ) : (
              <p className="text-red-500 text-sm">Code has expired</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || otp.join('').length !== 6}
            className="w-full bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-sky-600 hover:to-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-300 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Verifying...
              </div>
            ) : (
              'Verify OTP'
            )}
          </button>

          {/* Resend OTP */}
          {canResend && (
            <button
              type="button"
              onClick={handleResend}
              disabled={isLoading}
              className="w-full bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-300"
            >
              Resend OTP
            </button>
          )}
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <Link 
            to="/forgot-password" 
            className="inline-flex items-center text-sky-600 hover:text-sky-800 font-medium text-sm transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Email Verification
          </Link>
        </div>

        {/* Demo Note */}
        <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-600 text-center">
            <strong>Demo:</strong> Use OTP <span className="font-mono bg-blue-100 px-1 rounded">123456</span> to continue
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
