import React from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../constants';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  // Get role from either userRole or role property
  const userRole = user?.userRole || user?.role;

  // If no token, redirect to login
  if (!token) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // If roles are specified and user's role is not in allowed roles
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }

  return children;
};

export default ProtectedRoute;
