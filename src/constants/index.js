// Application constants

export const APP_CONFIG = {
  name: "ProctorAI",
  version: "1.0.0",
  description: "Next-Gen Online Proctoring System",
};

// User Roles
export const USER_ROLES = {
  ADMIN: "admin",
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
  ADMIN_MANAGE_COMPANIES: "/admin/manage-companies",
  ADMIN_PAYMENTS: "/admin/payments",

  // User Routes
  USER_DASHBOARD: "/user/dashboard",
  USER_PROFILE: "/user/profile",
};

// Permissions
export const PERMISSIONS = {
  MANAGE_USERS: "manage_users",
};

// Role Permissions Mapping
export const ROLE_PERMISSIONS = {
  [USER_ROLES.ADMIN]: [PERMISSIONS.MANAGE_USERS],
  [USER_ROLES.USER]: [],
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
  {
    id: "ai-interview",
    title: "AI Interview",
    description:
      "Advanced AI-powered interview system with real-time analysis and feedback",
    icon: "FaRobot",
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "HR Director at Microsoft",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    text: "ProctorAI has revolutionized our hiring process. The AI interview feature saves us hours of screening time.",
    rating: 5,
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    role: "CTO at Google",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    text: "The integrated code editor is fantastic. Candidates can showcase their skills in a real coding environment.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ananya Patel",
    role: "Lead Recruiter at Amazon",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
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

export const PAYMENT_PLANS = {
  BASIC: {
    name: "Basic Plan",
    price: 999,
    features: ["Up to 50 candidates", "Basic proctoring", "Email support"],
  },
  PROFESSIONAL: {
    name: "Professional Plan",
    price: 2499,
    features: [
      "Up to 200 candidates",
      "Advanced proctoring",
      "Priority support",
      "Custom branding",
    ],
  },
  ENTERPRISE: {
    name: "Enterprise Plan",
    price: 4999,
    features: [
      "Unlimited candidates",
      "Full proctoring suite",
      "24/7 support",
      "API access",
      "Custom integrations",
    ],
  },
};
