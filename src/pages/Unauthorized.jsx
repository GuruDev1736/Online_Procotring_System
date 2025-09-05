import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome, FaSignInAlt } from 'react-icons/fa';

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-400 via-red-500 to-red-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md text-center">
        <div className="mb-6">
          <div className="bg-red-100 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
            <FaExclamationTriangle className="text-red-600 text-3xl" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-8">
          You don't have permission to access this page. Please contact your administrator or log in with the appropriate credentials.
        </p>
        
        <div className="space-y-3">
          <Link
            to="/"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <FaHome />
            Go to Home
          </Link>
          
          <Link
            to="/login"
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <FaSignInAlt />
            Login Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
