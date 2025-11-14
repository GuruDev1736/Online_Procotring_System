// Application Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  UNAUTHORIZED: '/unauthorized',
  
  // User Routes
  USER_DASHBOARD: '/user/dashboard',
  
  // Admin Routes
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_ADD_COMPANY: '/admin/companies/add',
  ADMIN_MANAGE_COMPANIES: '/admin/companies',
  ADMIN_PAYMENT_DETAILS: '/admin/payments',
  
  // Company Routes
  COMPANY_DASHBOARD: '/company/dashboard',
  
  // HR Routes
  HR_DASHBOARD: '/hr/dashboard',
};

// Payment Plans
export const PAYMENT_PLANS = {
  BASIC: {
    id: 'basic',
    name: 'Basic Plan',
    price: 999,
    duration: 'month',
    features: [
      'Up to 50 tests/month',
      'Basic proctoring',
      'Email support',
      '1 GB storage'
    ]
  },
  PROFESSIONAL: {
    id: 'professional',
    name: 'Professional Plan',
    price: 2499,
    duration: 'month',
    features: [
      'Up to 200 tests/month',
      'Advanced AI proctoring',
      'Priority support',
      '10 GB storage',
      'Custom branding'
    ]
  },
  ENTERPRISE: {
    id: 'enterprise',
    name: 'Enterprise Plan',
    price: 4999,
    duration: 'month',
    features: [
      'Unlimited tests',
      'Full AI suite',
      '24/7 dedicated support',
      'Unlimited storage',
      'Custom integrations',
      'White-label solution'
    ]
  }
};

// User Roles
export const USER_ROLES = {
  SUPER_ADMIN: 'ROLE_SUPER_ADMIN',
  COMPANY: 'ROLE_COMPANY',
  HR: 'ROLE_HR',
  USER: 'ROLE_USER'
};

// Role-based Dashboard Routes
export const ROLE_DASHBOARD_MAP = {
  ROLE_SUPER_ADMIN: '/admin/dashboard',
  ROLE_COMPANY: '/company/dashboard',
  ROLE_HR: '/hr/dashboard',
  ROLE_USER: '/user/dashboard'
};

// Test Status
export const TEST_STATUS = {
  SCHEDULED: 'scheduled',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  CAPTURED: 'captured',
  AUTHORIZED: 'authorized',
  FAILED: 'failed',
  REFUNDED: 'refunded'
};
