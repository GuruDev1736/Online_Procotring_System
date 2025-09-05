# ProctorAI Admin System

## Overview

This is a comprehensive role-based authentication system with admin dashboard for managing companies and payments through Razorpay integration.

## Features Implemented

### 🔐 Role-Based Authentication

- **Admin**: Full access to company management and payment tracking
- **Company**: Company-specific dashboard (placeholder)
- **User**: User-specific dashboard (placeholder)

### 🏢 Admin Dashboard

- **Statistics Overview**: Total companies, active companies, revenue tracking
- **Quick Actions**: Add company, manage companies, view payments
- **Recent Companies**: Latest registered companies with status

### 📊 Company Management

- **Add Company**: Multi-step form with:

  - Company details (name, industry, employee count)
  - Contact information (person, email, phone, address)
  - Business information (GST, PAN, registration numbers)
  - Payment plan selection (Basic ₹999, Professional ₹2499, Enterprise ₹4999)
  - Review and submit with terms acceptance

- **Manage Companies**:
  - Search and filter companies
  - View company details
  - Change company status (Active/Suspended/Pending)
  - Delete companies
  - Export data to CSV

### 💳 Payment Integration

- **Payment Plans**: Three tiers with different features
- **Razorpay Integration Structure**: Ready for backend integration
- **Payment Tracking**: Comprehensive payment details page with:
  - Transaction status (Captured, Authorized, Failed, Pending)
  - Payment methods (Card, UPI, Net Banking, Wallet)
  - Invoice management
  - Revenue analytics

## Demo Credentials

### Admin Access

- **Email**: admin@proctorai.com
- **Password**: admin123
- **Access**: Full admin dashboard with company and payment management

### Company Access

- **Email**: company@example.com
- **Password**: company123
- **Access**: Company dashboard (placeholder)

### User Access

- **Email**: user@example.com
- **Password**: user123
- **Access**: User dashboard (placeholder)

## How to Test

1. **Start the Application**

   ```bash
   npm run dev
   ```

2. **Login as Admin**

   - Go to `/login`
   - Use admin credentials: admin@proctorai.com / admin123
   - You'll be redirected to `/admin/dashboard`

3. **Test Admin Features**

   - **Dashboard**: View statistics and quick actions
   - **Add Company**: Use `/admin/add-company` to add new companies
   - **Manage Companies**: Use `/admin/companies` to view and manage all companies
   - **Payment Details**: Use `/admin/payments` to track all payments and transactions

4. **Test Role-Based Access**
   - Try accessing admin routes with company/user credentials
   - Should be redirected or shown access denied

## File Structure

```
src/
├── components/
│   ├── common/
│   │   └── ProtectedRoute.jsx          # Route protection based on roles
│   └── layout/
│       └── AdminLayout.jsx             # Admin sidebar layout
├── context/
│   └── AuthContext.jsx                 # Authentication and role management
├── pages/
│   ├── AdminDashboard.jsx              # Main admin dashboard
│   ├── AddCompany.jsx                  # Multi-step company registration
│   ├── ManageCompanies.jsx             # Company management interface
│   └── PaymentDetails.jsx              # Payment tracking and analytics
└── constants/
    └── index.js                        # Roles, routes, permissions, payment plans
```

## Key Components

### Authentication System

- Context-based authentication with localStorage persistence
- Role-based access control with permissions
- Automatic redirects based on user role

### Admin Layout

- Responsive sidebar navigation
- Three.js animated background
- User profile and logout functionality

### Company Management

- Multi-step form validation
- Dynamic payment plan selection
- Comprehensive company data collection

### Payment System

- Razorpay integration structure
- Transaction status tracking
- Invoice generation ready
- Revenue analytics

## Next Steps for Backend Integration

1. **API Endpoints**: Create backend APIs for:

   - Company CRUD operations
   - Payment processing with Razorpay
   - User authentication and role management

2. **Database Schema**: Set up tables for:

   - Users (with roles)
   - Companies
   - Payments/Transactions
   - Payment Plans

3. **Razorpay Integration**:

   - Set up Razorpay webhook handlers
   - Implement payment link generation
   - Handle payment success/failure callbacks

4. **Security**: Implement proper JWT authentication and role-based middleware

## Technologies Used

- React 18 with Hooks
- React Router for navigation
- Context API for state management
- Tailwind CSS for styling
- React Icons for UI icons
- Three.js for background animations

## Development Notes

- All admin routes are protected by role-based authentication
- Mock data is used for demonstration purposes
- Payment integration is structured but requires backend implementation
- Responsive design works on all screen sizes
- Form validation and error handling implemented throughout
