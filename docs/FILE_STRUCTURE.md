# ProctorAI - File Structure Documentation

## 📁 Project Structure Overview

```
project-final-year/
├── docs/                           # Documentation files
│   ├── FORGOT_PASSWORD_FLOW.md     # Forgot password feature docs
│   └── LANDING_PAGE_README.md      # Landing page feature docs
├── public/                         # Static assets
│   └── vite.svg
├── src/                           # Source code
│   ├── assets/                    # Static assets (images, icons)
│   │   └── react.svg
│   ├── components/                # Reusable UI components
│   │   ├── auth/                  # Authentication components
│   │   │   ├── Login.jsx          # Login form component
│   │   │   ├── Signup.jsx         # Registration form component
│   │   │   ├── ForgotPassword.jsx # Email verification step
│   │   │   ├── OTPVerification.jsx # OTP input and verification
│   │   │   ├── ResetPassword.jsx  # Password reset form
│   │   │   ├── ForgotPasswordFlow.jsx # Orchestrates forgot password flow
│   │   │   └── index.js           # Auth components exports
│   │   ├── common/                # Shared/reusable components
│   │   │   ├── ThreeBackground.jsx # 3D animated background
│   │   │   └── index.js           # Common components exports
│   │   └── layout/                # Layout components
│   │       ├── Navbar.jsx         # Navigation component
│   │       └── index.js           # Layout components exports
│   ├── constants/                 # Application constants
│   │   └── index.js              # App config, routes, features, etc.
│   ├── hooks/                     # Custom React hooks
│   │   ├── useForm.js            # Form state management hook
│   │   └── index.js              # Hooks exports
│   ├── pages/                     # Page components
│   │   ├── LandingPage.jsx       # Main landing page
│   │   └── index.js              # Pages exports
│   ├── styles/                   # CSS files
│   │   ├── App.css               # App-specific styles
│   │   └── index.css             # Global styles and Tailwind imports
│   ├── utils/                    # Utility functions
│   │   ├── validation.js         # Form validation utilities
│   │   ├── helpers.js            # General helper functions
│   │   └── index.js              # Utils exports
│   ├── App.jsx                   # Main app component with routing
│   └── main.jsx                  # App entry point
├── .gitignore                    # Git ignore rules
├── .github/                      # GitHub workflows and templates
├── eslint.config.js             # ESLint configuration
├── index.html                   # HTML template
├── package.json                 # Dependencies and scripts
├── postcss.config.js            # PostCSS configuration
├── README.md                    # Project README
├── tailwind.config.js           # Tailwind CSS configuration
└── vite.config.js              # Vite configuration
```

## 📂 Directory Breakdown

### `/src/components/`

**Organized by feature and functionality**

#### `/auth/` - Authentication Components

- **Purpose**: All authentication-related components
- **Components**:
  - `Login.jsx` - User login form with validation
  - `Signup.jsx` - User registration with comprehensive fields
  - `ForgotPassword.jsx` - Email verification step
  - `OTPVerification.jsx` - 6-digit OTP input and timer
  - `ResetPassword.jsx` - New password creation
  - `ForgotPasswordFlow.jsx` - State management for forgot password

#### `/common/` - Shared Components

- **Purpose**: Reusable components used across multiple pages
- **Components**:
  - `ThreeBackground.jsx` - 3D animated background with Three.js

#### `/layout/` - Layout Components

- **Purpose**: Application layout and navigation components
- **Components**:
  - `Navbar.jsx` - Fixed navigation with responsive design

### `/src/pages/`

**Main page components that represent routes**

- `LandingPage.jsx` - Homepage with features, testimonials, contact

### `/src/hooks/`

**Custom React hooks for reusable logic**

- `useForm.js` - Form state management with validation

### `/src/utils/`

**Utility functions and helpers**

- `validation.js` - Form validation functions
- `helpers.js` - General utility functions (formatting, scrolling, etc.)

### `/src/constants/`

**Application constants and configuration**

- `index.js` - Routes, API endpoints, features data, testimonials

### `/src/styles/`

**CSS and styling files**

- `index.css` - Global styles and Tailwind imports
- `App.css` - Application-specific styles

### `/docs/`

**Project documentation**

- Feature-specific documentation and guides

## 🔗 Import Structure

### Clean Imports with Index Files

Each directory has an `index.js` file for clean imports:

```javascript
// Instead of:
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

// You can use:
import { Login, Signup } from "./components/auth";
```

### Import Examples

```javascript
// App.jsx
import { LandingPage } from "./pages";
import { Login, Signup, ForgotPasswordFlow } from "./components/auth";

// Components
import { ThreeBackground } from "./components/common";
import { Navbar } from "./components/layout";

// Utilities
import { validateEmail, validatePassword } from "./utils";
import { useForm } from "./hooks";

// Constants
import { ROUTES, FEATURES, TESTIMONIALS } from "./constants";
```

## 📋 Benefits of This Structure

### 1. **Scalability**

- Easy to add new features without cluttering
- Clear separation of concerns
- Modular architecture

### 2. **Maintainability**

- Related files are grouped together
- Easy to find and modify specific functionality
- Clear import/export structure

### 3. **Team Collaboration**

- Multiple developers can work on different features
- Consistent file organization
- Clear ownership of components

### 4. **Code Reusability**

- Common components in shared directories
- Utility functions available globally
- Custom hooks for repeated logic

### 5. **Testing**

- Easy to create tests alongside components
- Clear boundaries for unit testing
- Isolated feature testing

## 🎯 Feature Organization

### Authentication Flow

```
/components/auth/
├── Login.jsx              # Entry point
├── Signup.jsx             # Registration
├── ForgotPasswordFlow.jsx # Flow controller
├── ForgotPassword.jsx     # Step 1: Email
├── OTPVerification.jsx    # Step 2: OTP
└── ResetPassword.jsx      # Step 3: New Password
```

### Landing Page

```
/pages/
└── LandingPage.jsx        # Complete homepage

/constants/
└── index.js               # Features, testimonials, contact info
```

### Shared Resources

```
/components/common/
└── ThreeBackground.jsx    # Used across all auth pages

/utils/
├── validation.js          # Used in all forms
└── helpers.js            # General utilities

/hooks/
└── useForm.js            # Form state management
```

## 🚀 Development Workflow

### Adding New Features

1. Create feature directory in appropriate location
2. Add components with clear naming
3. Create index.js for exports
4. Add utilities if needed
5. Update constants if required
6. Add documentation

### Modifying Existing Features

1. Navigate to appropriate feature directory
2. Modify specific component
3. Update related utilities/constants
4. Test imports and exports

This structure provides a solid foundation for scaling the ProctorAI application while maintaining clean, organized, and maintainable code.
