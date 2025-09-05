import React, { useState } from 'react';
import ForgotPassword from './ForgotPassword';
import OTPVerification from './OTPVerification';
import ResetPassword from './ResetPassword';

const ForgotPasswordFlow = () => {
  const [currentStep, setCurrentStep] = useState('email'); // 'email', 'otp', 'reset'
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (emailAddress) => {
    setEmail(emailAddress);
    setCurrentStep('otp');
  };

  const handleOTPVerified = (otp) => {
    console.log('OTP verified:', otp);
    setCurrentStep('reset');
  };

  const handlePasswordReset = () => {
    console.log('Password reset successfully');
    // In a real app, this would redirect to login or show success
  };

  const handleResendOTP = () => {
    console.log('Resending OTP to:', email);
    // In a real app, this would make an API call to resend OTP
  };

  switch (currentStep) {
    case 'email':
      return <ForgotPassword onEmailSubmit={handleEmailSubmit} />;
    
    case 'otp':
      return (
        <OTPVerification 
          email={email}
          onOTPVerified={handleOTPVerified}
          onResendOTP={handleResendOTP}
        />
      );
    
    case 'reset':
      return (
        <ResetPassword 
          email={email}
          onPasswordReset={handlePasswordReset}
        />
      );
    
    default:
      return <ForgotPassword onEmailSubmit={handleEmailSubmit} />;
  }
};

export default ForgotPasswordFlow;
