# Forgot Password Flow Documentation

## Overview

The forgot password flow consists of three main steps:

1. **Email Verification** - User enters their email address
2. **OTP Verification** - User enters the 6-digit OTP sent to their email
3. **Password Reset** - User creates a new password

## Components Created

### 1. ForgotPassword.jsx

- Handles email input and validation
- Shows email sent confirmation
- Provides resend email functionality
- **Demo Mode**: Any valid email works for testing

### 2. OTPVerification.jsx

- 6-digit OTP input with auto-focus
- 5-minute countdown timer
- Paste support for OTP codes
- Resend OTP functionality
- **Demo Mode**: Use OTP `123456` to proceed

### 3. ResetPassword.jsx

- New password input with validation
- Password confirmation
- Real-time password requirements checker
- Success confirmation screen

### 4. ForgotPasswordFlow.jsx

- Main orchestrator component
- Manages the flow between different steps
- Handles state management across steps

## Password Requirements

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

## Navigation Flow

```
Login Page → Forgot Password → OTP Verification → Reset Password → Success → Login
```

## Features

- ✅ Three.js animated background
- ✅ Responsive design with Tailwind CSS
- ✅ Sky blue and white color scheme
- ✅ Real-time validation
- ✅ Loading states and animations
- ✅ Auto-focus and keyboard navigation
- ✅ Password strength indicator
- ✅ Timer countdown for OTP
- ✅ Resend functionality
- ✅ Error handling and user feedback

## Demo Credentials

- **Email**: Any valid email format (e.g., test@example.com)
- **OTP**: 123456
- **Password**: Must meet all requirements

## Integration

The forgot password flow is fully integrated with the existing login system and uses the same Three.js background animation for visual consistency.

## Routes Added

- `/forgot-password` - Main forgot password flow entry point

## Usage

1. From the login page, click "Forgot password?"
2. Enter your email address and click "Send Reset Link"
3. Enter the OTP `123456` when prompted
4. Create a new password meeting all requirements
5. Success! You can now return to login with your new password

## Technical Notes

- Components use React hooks for state management
- Form validation is done client-side with real-time feedback
- Three.js background is shared across all auth pages
- Responsive design works on mobile and desktop
- Timer and countdown functionality for OTP expiration
- Auto-focus behavior for better UX
