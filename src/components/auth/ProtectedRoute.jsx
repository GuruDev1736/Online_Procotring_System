import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, isLoading } = useAuth();

  // Show loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // User's role doesn't match the required role, redirect to unauthorized page
    return <Navigate to="/unauthorized" replace />;
  }

  // Authorized, render children
  return children;
};

export default ProtectedRoute;