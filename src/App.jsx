import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ForgotPasswordFlow from "./components/auth/ForgotPasswordFlow";
import Unauthorized from "./pages/Unauthorized";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import CompanyDashboard from "./components/dashboard/CompanyDashboard";
import UserDashboard from "./components/dashboard/UserDashboard";
import AddCompany from "./pages/AddCompany";
import ManageCompanies from "./pages/ManageCompanies";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPasswordFlow />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="/user/dashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
