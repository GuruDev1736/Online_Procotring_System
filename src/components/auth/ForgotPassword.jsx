import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import ThreeBackground from "../common/ThreeBackground";
import ErrorDialog from "../common/ErrorDialog";
import SuccessDialog from "../common/SuccessDialog";
import OTPVerification from "./OTPVerification";
import ResetPassword from "./ResetPassword";
import { sendOTP } from "../service/authService";

const ForgotPassword = ({ onEmailSubmit }) => {
  // Flow state: 'email' | 'otp' | 'reset'
  const [currentStep, setCurrentStep] = useState("email");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorDialog, setErrorDialog] = useState({ isOpen: false, title: '', message: '' });
  const [successDialog, setSuccessDialog] = useState({ isOpen: false, title: '', message: '' });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle email step - send OTP and move to OTP verification
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
          await onEmailSubmit(email);
          setCurrentStep("otp");
        } else {
          const res = await sendOTP(email);
          if (res?.STS === "200") {
            setSuccessDialog({
              isOpen: true,
              title: 'OTP Sent',
              message: 'OTP has been sent to your email successfully!'
            });
            // Move to OTP step after user closes success dialog
            setTimeout(() => {
              setSuccessDialog({ isOpen: false, title: '', message: '' });
              setCurrentStep("otp");
            }, 2000);
          } else {
            setErrorDialog({
              isOpen: true,
              title: 'Failed to Send OTP',
              message: res?.MSG || "Failed to send OTP. Please try again."
            });
          }
        }
      } catch (err) {
        console.error("Error sending OTP:", err);
        setErrorDialog({
          isOpen: true,
          title: 'Error',
          message: "Something went wrong while sending OTP."
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Called by OTPVerification component after successful verification
  const handleOTPVerified = () => {
    setCurrentStep("reset");
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      const res = await sendOTP(email);
      if (res?.STS === "200") {
        setSuccessDialog({
          isOpen: true,
          title: 'OTP Resent',
          message: 'A new OTP has been sent to your email.'
        });
      } else {
        setErrorDialog({
          isOpen: true,
          title: 'Failed to Resend OTP',
          message: res?.MSG || "Failed to resend OTP."
        });
      }
    } catch (err) {
      console.error("Error resending OTP:", err);
      setErrorDialog({
        isOpen: true,
        title: 'Error',
        message: "Something went wrong while resending OTP."
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Called by ResetPassword component - doesn't need to do anything as ResetPassword handles redirect
  const handlePasswordReset = () => {
    // The ResetPassword component will handle the API call and redirect
    // This callback is just for additional handling if needed
    console.log("Password reset completed");
  };

  if (currentStep === "otp") {
    return (
      <>
        <ErrorDialog
          isOpen={errorDialog.isOpen}
          onClose={() => setErrorDialog({ isOpen: false, title: '', message: '' })}
          title={errorDialog.title}
          message={errorDialog.message}
        />
        <SuccessDialog
          isOpen={successDialog.isOpen}
          onClose={() => setSuccessDialog({ isOpen: false, title: '', message: '' })}
          title={successDialog.title}
          message={successDialog.message}
        />
        <OTPVerification
          email={email}
          onOTPVerified={handleOTPVerified}
          onResendOTP={handleResendOTP}
        />
      </>
    );
  }

  if (currentStep === "reset") {
    return (
      <>
        <ErrorDialog
          isOpen={errorDialog.isOpen}
          onClose={() => setErrorDialog({ isOpen: false, title: '', message: '' })}
          title={errorDialog.title}
          message={errorDialog.message}
        />
        <ResetPassword email={email} onPasswordReset={handlePasswordReset} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-sky-500 to-sky-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Error Dialog */}
      <ErrorDialog
        isOpen={errorDialog.isOpen}
        onClose={() => setErrorDialog({ isOpen: false, title: '', message: '' })}
        title={errorDialog.title}
        message={errorDialog.message}
      />

      {/* Success Dialog */}
      <SuccessDialog
        isOpen={successDialog.isOpen}
        onClose={() => {
          setSuccessDialog({ isOpen: false, title: '', message: '' });
          if (successDialog.title === 'OTP Sent') {
            setCurrentStep("otp");
          }
        }}
        title={successDialog.title}
        message={successDialog.message}
      />

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
                Sending OTP...
              </div>
            ) : (
              "Send OTP"
            )}
          </button>
        </form>

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
