import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLock, FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import ThreeBackground from '../common/ThreeBackground';

const ResetPassword = ({ email, onPasswordReset }) => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validatePassword = (password) => {
    const requirements = {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    return {
      isValid: Object.values(requirements).every(req => req),
      requirements
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    const passwordValidation = validatePassword(formData.password);
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordValidation.isValid) {
      newErrors.password = 'Password does not meet the requirements';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      
      // Simulate password reset API call
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
        if (onPasswordReset) {
          onPasswordReset(formData.password);
        }
      }, 2000);
    }
  };

  const passwordValidation = validatePassword(formData.password);

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-400 via-sky-500 to-sky-600 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Three.js Background */}
        <ThreeBackground />
        
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 2 }}>
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-sky-300/20 to-sky-400/20 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-r from-sky-400/20 to-sky-500/20 rounded-full animate-pulse delay-1000"></div>
        </div>

        {/* Success Card */}
        <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20 text-center" style={{ zIndex: 3 }}>
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <FaCheckCircle className="text-green-600 text-5xl" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Password Reset Successful!</h2>
          <p className="text-gray-600 mb-8">
            Your password has been successfully reset. You can now login with your new password.
          </p>
          
          <Link
            to="/login"
            className="w-full inline-block bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-sky-600 hover:to-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-300 transition-all duration-300 transform hover:scale-[1.02] text-center"
          >
            Continue to Login
          </Link>
        </div>
      </div>
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

      {/* Reset Password Card */}
      <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20" style={{ zIndex: 3 }}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-sky-500 to-sky-600 p-3 rounded-2xl">
              <MdSecurity className="text-white text-3xl" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-500 to-sky-600 bg-clip-text text-transparent">
            Reset Password
          </h1>
          <p className="text-gray-600 mt-2">
            Create a new password for <span className="text-sky-600 font-medium">{email}</span>
          </p>
        </div>

        {/* Reset Password Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">New Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaLock className={`text-lg ${errors.password ? 'text-red-400' : 'text-gray-400'}`} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                  errors.password 
                    ? 'border-red-400 focus:border-red-500 bg-red-50' 
                    : 'border-gray-200 focus:border-sky-500 hover:border-gray-300'
                }`}
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-sky-600 transition-colors"
              >
                {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Password Requirements */}
          {formData.password && (
            <div className="bg-gray-50 p-4 rounded-xl space-y-2">
              <p className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</p>
              <div className="grid grid-cols-1 gap-1 text-xs">
                <div className={`flex items-center ${passwordValidation.requirements.minLength ? 'text-green-600' : 'text-red-500'}`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${passwordValidation.requirements.minLength ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  At least 8 characters
                </div>
                <div className={`flex items-center ${passwordValidation.requirements.hasUppercase ? 'text-green-600' : 'text-red-500'}`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${passwordValidation.requirements.hasUppercase ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  One uppercase letter
                </div>
                <div className={`flex items-center ${passwordValidation.requirements.hasLowercase ? 'text-green-600' : 'text-red-500'}`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${passwordValidation.requirements.hasLowercase ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  One lowercase letter
                </div>
                <div className={`flex items-center ${passwordValidation.requirements.hasNumber ? 'text-green-600' : 'text-red-500'}`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${passwordValidation.requirements.hasNumber ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  One number
                </div>
                <div className={`flex items-center ${passwordValidation.requirements.hasSpecialChar ? 'text-green-600' : 'text-red-500'}`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${passwordValidation.requirements.hasSpecialChar ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  One special character
                </div>
              </div>
            </div>
          )}

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaLock className={`text-lg ${errors.confirmPassword ? 'text-red-400' : 'text-gray-400'}`} />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                  errors.confirmPassword 
                    ? 'border-red-400 focus:border-red-500 bg-red-50' 
                    : 'border-gray-200 focus:border-sky-500 hover:border-gray-300'
                }`}
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-sky-600 transition-colors"
              >
                {showConfirmPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !passwordValidation.isValid || formData.password !== formData.confirmPassword}
            className="w-full bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-sky-600 hover:to-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-300 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Resetting Password...
              </div>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <Link 
            to="/login" 
            className="text-sky-600 hover:text-sky-800 font-medium text-sm transition-colors"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
