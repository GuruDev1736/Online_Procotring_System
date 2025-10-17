import React, { useState } from "react";
import ForgotPassword from "./ForgotPassword";
import OTPVerification from "./OTPVerification";
import ResetPassword from "./ResetPassword";
import { sendOTP, verifyOTP, changePassword } from "../service/authService";

const ForgotPasswordFlow = () => {
  const [currentStep, setCurrentStep] = useState("email"); // 'email', 'otp', 'reset'
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (emailAddress) => {
    setLoading(true);
    try {
      const res = await sendOTP(emailAddress);
      if (res?.STS === "200") {
        setEmail(emailAddress);
        setCurrentStep("otp");
      } else {
        alert(res?.MESSAGE || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Something went wrong while sending OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleOTPVerified = async (otp) => {
    setLoading(true);
    try {
      const res = await verifyOTP(email, otp);
      if (res?.STS === "200") {
        console.log("OTP verified:", otp);
        setCurrentStep("reset");
      } else {
        alert(res?.MESSAGE || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Something went wrong while verifying OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Change Password
  const handlePasswordReset = async (newPassword) => {
    setLoading(true);
    try {
      const res = await changePassword(email, newPassword);
      if (res?.STS === "200") {
        console.log("Password reset successfully");
        alert("Password reset successful! Please log in again.");
        setCurrentStep("email"); // redirect back to email step or login page
      } else {
        alert(res?.MESSAGE || "Failed to reset password.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Something went wrong while resetting password.");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP (uses same API)
  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const res = await sendOTP(email);
      if (res?.STS === "200") {
        alert("OTP resent successfully.");
      } else {
        alert(res?.MESSAGE || "Failed to resend OTP.");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      alert("Something went wrong while resending OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Render based on current step
  switch (currentStep) {
    case "email":
      return (
        <ForgotPassword onEmailSubmit={handleEmailSubmit} loading={loading} />
      );

    case "otp":
      return (
        <OTPVerification
          email={email}
          onOTPVerified={handleOTPVerified}
          onResendOTP={handleResendOTP}
          loading={loading}
        />
      );

    case "reset":
      return (
        <ResetPassword
          email={email}
          onPasswordReset={handlePasswordReset}
          loading={loading}
        />
      );

    default:
      return (
        <ForgotPassword onEmailSubmit={handleEmailSubmit} loading={loading} />
      );
  }
};

export default ForgotPasswordFlow;
