import React, { useState } from 'react';
import { 
  FaUsers, 
  FaFileAlt, 
  FaDollarSign, 
  FaChartLine,
  FaTachometerAlt
} from 'react-icons/fa';
import AdminLayout from '../components/layout/AdminLayout';
import { AdminOverview, UserManagement, ExamManagement, PaymentHistory } from '../components/admin';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    {
      id: 'overview',
      name: 'Overview',
      icon: FaTachometerAlt,
      component: AdminOverview
    },
    {
      id: 'users',
      name: 'User Management',
      icon: FaUsers,
      component: UserManagement
    },
    {
      id: 'exams',
      name: 'Exam Management',
      icon: FaFileAlt,
      component: ExamManagement
    },
    {
      id: 'payments',
      name: 'Payment History',
      icon: FaDollarSign,
      component: PaymentHistory
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: FaChartLine,
      component: () => (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <FaChartLine className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Analytics Dashboard</h3>
          <p className="text-gray-500">Advanced analytics and reporting features coming soon.</p>
        </div>
      )
    }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || AdminOverview;

  return (
    <AdminLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className={`mr-2 h-5 w-5 ${
                        activeTab === tab.id ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                      }`} />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Active Tab Content */}
          <div className="min-h-96">
            <ActiveComponent />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
