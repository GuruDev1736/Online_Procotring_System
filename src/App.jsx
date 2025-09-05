import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ForgotPasswordFlow from './components/auth/ForgotPasswordFlow';
import Unauthorized from './pages/Unauthorized';
import AdminDashboard from './components/dashboard/AdminDashboard';
import CompanyDashboard from './components/dashboard/CompanyDashboard';
import UserDashboard from './components/dashboard/UserDashboard';
import AddCompany from './pages/AddCompany';
import ManageCompanies from './pages/ManageCompanies';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPasswordFlow />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Protected Routes - Admin */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute requiredRole="ROLE_ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/add-company" 
              element={
                <ProtectedRoute requiredRole="ROLE_ADMIN">
                  <AddCompany />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/companies" 
              element={
                <ProtectedRoute requiredRole="ROLE_ADMIN">
                  <ManageCompanies />
                </ProtectedRoute>
              } 
            />

            {/* Protected Routes - Company */}
            <Route 
              path="/company/dashboard" 
              element={
                <ProtectedRoute requiredRole="ROLE_COMPANY">
                  <CompanyDashboard />
                </ProtectedRoute>
              } 
            />

            {/* Protected Routes - User */}
            <Route 
              path="/user/dashboard" 
              element={
                <ProtectedRoute requiredRole="ROLE_USER">
                  <UserDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
