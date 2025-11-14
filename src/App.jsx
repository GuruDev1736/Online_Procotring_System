import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ForgotPassword from "./components/auth/ForgotPassword";
import Unauthorized from "./pages/Unauthorized";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import CompanyDashboard from "./components/dashboard/CompanyDashboard";
import HRDashboard from "./components/dashboard/HRDashboard";
import UserDashboard from "./components/dashboard/UserDashboard";
import AddCompany from "./pages/AddCompany";
import ManageCompanies from "./pages/ManageCompanies";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { USER_ROLES } from "./constants";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* User Dashboard */}
        <Route path="/user/dashboard" element={
          <ProtectedRoute allowedRoles={[USER_ROLES.USER]}>
            <UserDashboard />
          </ProtectedRoute>
        } />
        
        {/* Company Dashboard */}
        <Route path="/company/dashboard" element={
          <ProtectedRoute allowedRoles={[USER_ROLES.COMPANY]}>
            <CompanyDashboard />
          </ProtectedRoute>
        } />
        
        {/* HR Dashboard */}
        <Route path="/hr/dashboard" element={
          <ProtectedRoute allowedRoles={[USER_ROLES.HR]}>
            <HRDashboard />
          </ProtectedRoute>
        } />
        
        {/* Admin Dashboard & Routes */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRoles={[USER_ROLES.SUPER_ADMIN]}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/companies/add" element={
          <ProtectedRoute allowedRoles={[USER_ROLES.SUPER_ADMIN]}>
            <AddCompany />
          </ProtectedRoute>
        } />
        <Route path="/admin/companies" element={
          <ProtectedRoute allowedRoles={[USER_ROLES.SUPER_ADMIN]}>
            <ManageCompanies />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
