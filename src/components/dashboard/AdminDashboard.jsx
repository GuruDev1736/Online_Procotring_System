import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AIChatbox from '../common/AIChatbox';
import { 
  FaUsers, 
  FaBuilding, 
  FaChartBar, 
  FaCog, 
  FaSignOutAlt,
  FaBell,
  FaSearch,
  FaPlus,
  FaFileAlt,
  FaDollarSign,
  FaUserShield
} from 'react-icons/fa';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaChartBar },
    { id: 'companies', label: 'Companies', icon: FaBuilding },
    { id: 'users', label: 'Users', icon: FaUsers },
    { id: 'exams', label: 'Exams', icon: FaFileAlt },
    { id: 'payments', label: 'Payments', icon: FaDollarSign },
    { id: 'settings', label: 'Settings', icon: FaCog }
  ];

  const stats = [
    { label: 'Total Companies', value: '156', icon: FaBuilding, color: 'blue' },
    { label: 'Active Users', value: '2,847', icon: FaUsers, color: 'green' },
    { label: 'Exams Conducted', value: '1,234', icon: FaFileAlt, color: 'purple' },
    { label: 'Revenue', value: '$45,678', icon: FaDollarSign, color: 'yellow' }
  ];

  const recentCompanies = [
    { id: 1, name: 'Tech Solutions Ltd', email: 'admin@techsol.com', status: 'active', plan: 'Pro' },
    { id: 2, name: 'EduCorp Inc', email: 'contact@educorp.com', status: 'pending', plan: 'Basic' },
    { id: 3, name: 'Innovation Hub', email: 'info@innovation.com', status: 'active', plan: 'Enterprise' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
                      <stat.icon className={`text-xl text-${stat.color}-600`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Companies</h3>
                <div className="space-y-3">
                  {recentCompanies.map((company) => (
                    <div key={company.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{company.name}</p>
                        <p className="text-sm text-gray-600">{company.email}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          company.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {company.status}
                        </span>
                        <p className="text-sm text-gray-600 mt-1">{company.plan}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => navigate('/admin/add-company')}
                    className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FaPlus />
                    Add New Company
                  </button>
                  <button className="w-full flex items-center justify-center gap-3 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
                    <FaUsers />
                    Manage Users
                  </button>
                  <button className="w-full flex items-center justify-center gap-3 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                    <FaFileAlt />
                    View Reports
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'companies':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Company Management</h3>
              <button 
                onClick={() => navigate('/admin/add-company')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
              >
                <FaPlus />
                Add Company
              </button>
            </div>
            <div className="text-center py-12">
              <FaBuilding className="text-4xl text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Company management interface coming soon...</p>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">User Management</h3>
            <div className="text-center py-12">
              <FaUsers className="text-4xl text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">User management interface coming soon...</p>
            </div>
          </div>
        );

      case 'exams':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Exam Management</h3>
            <div className="text-center py-12">
              <FaFileAlt className="text-4xl text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Exam management interface coming soon...</p>
            </div>
          </div>
        );

      case 'payments':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Management</h3>
            <div className="text-center py-12">
              <FaDollarSign className="text-4xl text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Payment management interface coming soon...</p>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Settings</h3>
            <div className="text-center py-12">
              <FaCog className="text-4xl text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Settings interface coming soon...</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <FaBell className="text-xl" />
              </button>
              
              <div className="flex items-center space-x-3">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.role}</p>
                </div>
              </div>
              
              <button
                onClick={logout}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              >
                <FaSignOutAlt className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FaUserShield className="text-xl text-blue-600" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">Admin Panel</h2>
                    <p className="text-sm text-gray-600">ProctorAI</p>
                  </div>
                </div>
                
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <tab.icon className="text-lg" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* AI Chatbox */}
      <AIChatbox />
    </div>
  );
};

export default AdminDashboard;
