import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import ThreeBackground from "../common/ThreeBackground";
import OTPVerification from "./OTPVerification";
import ResetPassword from "./ResetPassword";
import { sendOTP, verifyOTP, changePassword } from "../service/authService";

const ForgotPassword = ({ onEmailSubmit }) => {
  // Flow state: 'email' | 'otp' | 'reset'
  const [currentStep, setCurrentStep] = useState("email");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // used for local "email sent" UI

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle email step. If parent provided onEmailSubmit, call it and let parent manage API;
  // otherwise call local sendOTP service.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        if (onEmailSubmit) {
          // parent may handle sendOTP and move flow; await in case it's async
          await onEmailSubmit(email);
          // parent is expected to move user forward; but we also set local state
          setEmail(email);
          setCurrentStep("otp");
        } else {
          const res = await sendOTP(email);
          if (res?.STS === "200") {
            setEmail(email);
            setCurrentStep("otp");
          } else {
            alert(res?.MESSAGE || "Failed to send OTP. Please try again.");
          }
        }
        // show local confirmation UI briefly
        setIsSubmitted(true);
      } catch (err) {
        console.error("Error sending OTP:", err);
        alert("Something went wrong while sending OTP.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Resend email handler (local fallback)
  const handleResendEmail = async () => {
    setIsLoading(true);
    try {
      if (onEmailSubmit) {
        await onEmailSubmit(email);
        alert("Verification email resent!");
      } else {
        const res = await sendOTP(email);
        if (res?.STS === "200") {
          alert("Verification email resent!");
        } else {
          alert(res?.MESSAGE || "Failed to resend OTP.");
        }
      }
    } catch (err) {
      console.error("Error resending email:", err);
      alert("Something went wrong while resending email.");
    } finally {
      setIsLoading(false);
    }
  };

  // Called by OTPVerification component
  const handleOTPVerified = async (otp) => {
    setIsLoading(true);
    try {
      // If parent supplied onEmailSubmit they may also handle OTP; but there is no parent OTP handler
      const res = await verifyOTP(email, otp);
      if (res?.STS === "200") {
        setCurrentStep("reset");
      } else {
        alert(res?.MESSAGE || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      alert("Something went wrong while verifying OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      const res = await sendOTP(email);
      if (res?.STS === "200") {
        alert("OTP resent successfully.");
      } else {
        alert(res?.MESSAGE || "Failed to resend OTP.");
      }
    } catch (err) {
      console.error("Error resending OTP:", err);
      alert("Something went wrong while resending OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  // Called by ResetPassword component
  const handlePasswordReset = async (newPassword) => {
    setIsLoading(true);
    try {
      const res = await changePassword(email, newPassword);
      if (res?.STS === "200") {
        alert("Password reset successful! Please log in again.");
        // After successful reset, go back to email step (or could navigate to login)
        setCurrentStep("email");
        setEmail("");
      } else {
        alert(res?.MESSAGE || "Failed to reset password.");
      }
    } catch (err) {
      console.error("Error resetting password:", err);
      alert("Something went wrong while resetting password.");
    } finally {
      setIsLoading(false);
    }
  };

  // If we're in otp or reset step, render the corresponding component and keep the background
  if (currentStep === "otp") {
    return (
      <OTPVerification
        email={email}
        onOTPVerified={handleOTPVerified}
        onResendOTP={handleResendOTP}
      />
    );
  }

  if (currentStep === "reset") {
    return (
      <ResetPassword email={email} onPasswordReset={handlePasswordReset} />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-sky-500 to-sky-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Three.js Background */}
      <ThreeBackground />

      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 2 }}>
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-sky-300/20 to-sky-400/20 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-r from-sky-400/20 to-sky-500/20 rounded-full animate-pulse delay-1000"></div>
      </div>

      {/* Forgot Password Card */}
      <div
        className="relative bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20"
        style={{ zIndex: 3 }}
      >
        {!isSubmitted ? (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-sky-500 to-sky-600 p-3 rounded-2xl">
                  <MdSecurity className="text-white text-3xl" />
                </div>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-500 to-sky-600 bg-clip-text text-transparent">
                Forgot Password?
              </h1>
              <p className="text-gray-600 mt-2">
                Enter your email to reset your password
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaEnvelope
                      className={`text-lg ${
                        errors.email ? "text-red-400" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                      errors.email
                        ? "border-red-400 focus:border-red-500 bg-red-50"
                        : "border-gray-200 focus:border-sky-500 hover:border-gray-300"
                    }`}
                    placeholder="Enter your email address"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm flex items-center">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-sky-600 hover:to-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-300 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending OTP.
                  </div>
                ) : (
                  "Send OTP"
                )}
              </button>
            </form>
          </>
        ) : (
          /* Email Sent Confirmation */
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <FaEnvelope className="text-green-600 text-4xl" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Check Your Email
            </h2>
            <p className="text-gray-600 mb-6">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Didn't receive the email? Check your spam folder or try again.
            </p>

            <div className="space-y-3">
              <button
                onClick={handleResendEmail}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-sky-600 hover:to-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-300 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Resending...
                  </div>
                ) : (
                  "Resend Email"
                )}
              </button>

              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-300"
              >
                Try Different Email
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <Link
            to="/login"
            className="inline-flex items-center text-sky-600 hover:text-sky-800 font-medium text-sm transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
