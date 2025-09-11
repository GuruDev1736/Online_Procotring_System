/*
// Company signup and payment system functionality - Commented out as requested

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaBuilding, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaGlobe,
  FaCreditCard,
  FaDollarSign,
  FaCalendarAlt,
  FaCheck
} from 'react-icons/fa';
import { MdBusiness } from 'react-icons/md';
import AdminLayout from '../components/layout/AdminLayout';
import { ROUTES } from '../constants';

const AddCompany = () => {
  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <div className="pb-6">
          <div className="mb-8">
            <h1 className="text-xl font-semibold text-gray-900">Add New Company</h1>
            <p className="text-sm text-gray-600 mt-1">This feature has been temporarily disabled</p>
          </div>
          
          <div className="bg-white shadow rounded-lg p-8">
            <div className="text-center">
              <FaBuilding className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Company Registration Unavailable</h3>
              <p className="mt-1 text-sm text-gray-500">
                Company signup and payment features are currently under development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddCompany;

// Previous complex company registration form with payment integration has been commented out
// This included multi-step form with company details, contact info, business info, payment plans, etc.
*/

import React from 'react';
import { FaBuilding } from 'react-icons/fa';
import AdminLayout from '../components/layout/AdminLayout';

const AddCompany = () => {
  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <div className="pb-6">
          <div className="mb-8">
            <h1 className="text-xl font-semibold text-gray-900">Add New Company</h1>
            <p className="text-sm text-gray-600 mt-1">This feature has been temporarily disabled</p>
          </div>
          
          <div className="bg-white shadow rounded-lg p-8">
            <div className="text-center">
              <FaBuilding className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Company Registration Unavailable</h3>
              <p className="mt-1 text-sm text-gray-500">
                Company signup and payment features are currently under development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddCompany;
