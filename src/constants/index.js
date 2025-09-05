// Application constants

export const APP_CONFIG = {
  name: "ProctorAI",
  version: "1.0.0",
  description: "Next-Gen Online Proctoring System",
};

// User Roles
export const USER_ROLES = {
  ADMIN: "admin",
  COMPANY: "company",
  USER: "user",
};

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  DASHBOARD: "/dashboard",

  // Admin Routes
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_ADD_COMPANY: "/admin/add-company",
  ADMIN_MANAGE_COMPANIES: "/admin/companies",
  ADMIN_PAYMENT_DETAILS: "/admin/payments",

  // Company Routes
  COMPANY_DASHBOARD: "/company/dashboard",
  COMPANY_PROFILE: "/company/profile",
  COMPANY_PAYMENT: "/company/payment",

  // User Routes
  USER_DASHBOARD: "/user/dashboard",
  USER_PROFILE: "/user/profile",
};

// Permissions
export const PERMISSIONS = {
  CREATE_COMPANY: "create_company",
  MANAGE_COMPANIES: "manage_companies",
  VIEW_PAYMENTS: "view_payments",
  MANAGE_USERS: "manage_users",
};

// Role Permissions Mapping
export const ROLE_PERMISSIONS = {
  [USER_ROLES.ADMIN]: [
    PERMISSIONS.CREATE_COMPANY,
    PERMISSIONS.MANAGE_COMPANIES,
    PERMISSIONS.VIEW_PAYMENTS,
    PERMISSIONS.MANAGE_USERS,
  ],
  [USER_ROLES.COMPANY]: [],
  [USER_ROLES.USER]: [],
};

// Payment Plans
export const PAYMENT_PLANS = {
  BASIC: {
    id: "basic",
    name: "Basic Plan",
    price: 999,
    duration: "monthly",
    features: ["Up to 100 interviews", "Basic AI features", "Email support"],
  },
  PROFESSIONAL: {
    id: "professional",
    name: "Professional Plan",
    price: 2499,
    duration: "monthly",
    features: [
      "Up to 500 interviews",
      "Advanced AI features",
      "Priority support",
      "Custom branding",
    ],
  },
  ENTERPRISE: {
    id: "enterprise",
    name: "Enterprise Plan",
    price: 4999,
    duration: "monthly",
    features: [
      "Unlimited interviews",
      "Full AI suite",
      "24/7 support",
      "Custom integrations",
      "Dedicated manager",
    ],
  },
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    SIGNUP: "/api/auth/signup",
    LOGOUT: "/api/auth/logout",
    FORGOT_PASSWORD: "/api/auth/forgot-password",
    RESET_PASSWORD: "/api/auth/reset-password",
    VERIFY_OTP: "/api/auth/verify-otp",
  },
};

export const FORM_VALIDATION = {
  PASSWORD: {
    MIN_LENGTH: 8,
    REQUIRED_PATTERNS: {
      UPPERCASE: /[A-Z]/,
      LOWERCASE: /[a-z]/,
      NUMBER: /\d/,
      SPECIAL_CHAR: /[!@#$%^&*(),.?":{}|<>]/,
    },
  },
  OTP: {
    LENGTH: 6,
    EXPIRY_TIME: 300, // 5 minutes in seconds
  },
};

export const FEATURES = [
  {
    id: "ai-interview",
    title: "AI Interview",
    description:
      "Advanced AI-powered interview system with real-time analysis and feedback",
    icon: "FaRobot",
  },
  {
    id: "aptitude-test",
    title: "Aptitude Test",
    description:
      "Comprehensive aptitude testing with intelligent question generation",
    icon: "MdAssignment",
  },
  {
    id: "code-editor",
    title: "Integrated Code Editor",
    description:
      "Built-in code editor with syntax highlighting and real-time compilation",
    icon: "FaCode",
  },
  {
    id: "scheduling",
    title: "Interview Scheduling",
    description:
      "Smart scheduling system with automated reminders and calendar integration",
    icon: "FaCalendarAlt",
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "HR Director at TechCorp",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b578?w=150&h=150&fit=crop&crop=face",
    text: "ProctorAI has revolutionized our hiring process. The AI interview feature saves us hours of screening time.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO at StartupXYZ",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    text: "The integrated code editor is fantastic. Candidates can showcase their skills in a real coding environment.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Lead Recruiter at GlobalTech",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    text: "Interview scheduling has never been easier. The automated system handles everything seamlessly.",
    rating: 5,
  },
];

export const CONTACT_INFO = {
  phone: "+1 (555) 123-4567",
  email: "contact@proctorai.com",
  address: "123 Tech Street, Silicon Valley, CA 94025",
  social: {
    linkedin: "#",
    twitter: "#",
    facebook: "#",
  },
};
