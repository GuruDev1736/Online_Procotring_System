import { useState } from "react";
import { sendOTP, verifyOTP, changePassword } from "../api"; // adjust import paths

export const useOTPFlow = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [currentStep, setCurrentStep] = useState("email"); // email | otp | reset

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

  const handlePasswordReset = async (newPassword) => {
    setLoading(true);
    try {
      const res = await changePassword(email, newPassword);
      if (res?.STS === "200") {
        console.log("Password reset successfully");
        alert("Password reset successful! Please log in again.");
        setCurrentStep("email");
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

  return {
    loading,
    email,
    currentStep,
    setCurrentStep,
    handleEmailSubmit,
    handleOTPVerified,
    handlePasswordReset,
  };
};
