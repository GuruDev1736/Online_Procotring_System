import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaShieldAlt, 
  FaTachometerAlt, 
  FaBuilding, 
  FaUsers, 
  FaCreditCard,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaUserCircle
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants';
import ThreeBackground from '../common/ThreeBackground';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    {
      name: 'Dashboard',
      href: ROUTES.ADMIN_DASHBOARD,
      icon: FaTachometerAlt,
      current: location.pathname === ROUTES.ADMIN_DASHBOARD
    },
    {
      name: 'Add Company',
      href: ROUTES.ADMIN_ADD_COMPANY,
      icon: FaBuilding,
      current: location.pathname === ROUTES.ADMIN_ADD_COMPANY
    },
    {
      name: 'Manage Companies',
      href: ROUTES.ADMIN_MANAGE_COMPANIES,
      icon: FaUsers,
      current: location.pathname === ROUTES.ADMIN_MANAGE_COMPANIES
    },
    {
      name: 'Payment Details',
      href: ROUTES.ADMIN_PAYMENT_DETAILS,
      icon: FaCreditCard,
      current: location.pathname === ROUTES.ADMIN_PAYMENT_DETAILS
    }
  ];

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Three.js Background */}
      <div className="fixed inset-0 opacity-20">
        <ThreeBackground />
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-center h-16 px-4 bg-gradient-to-r from-sky-600 to-sky-700">
          <div className="flex items-center">
            <FaShieldAlt className="text-white text-2xl mr-2" />
            <span className="text-white text-xl font-bold">ProctorAI Admin</span>
          </div>
        </div>

        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    item.current
                      ? 'bg-sky-100 text-sky-700 border-r-4 border-sky-600'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-sky-600'
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Icon className={`mr-3 text-lg ${
                    item.current ? 'text-sky-600' : 'text-gray-400 group-hover:text-sky-500'
                  }`} />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Info */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center">
            <img
              className="h-10 w-10 rounded-full"
              src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
              alt={user?.name}
            />
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="ml-2 p-2 text-gray-400 hover:text-red-600 transition-colors"
              title="Logout"
            >
              <FaSignOutAlt />
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navigation */}
        <div className="sticky top-0 z-40 lg:mx-auto lg:max-w-7xl lg:px-8">
          <div className="relative flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6 lg:px-0">
            <button
              type="button"
              className="lg:hidden p-2 text-gray-500 hover:text-gray-600"
              onClick={() => setIsSidebarOpen(true)}
            >
              <FaBars className="h-6 w-6" />
            </button>

            <div className="flex items-center">
              <h1 className="text-lg font-semibold text-gray-900">
                Admin Dashboard
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FaUserCircle className="text-gray-400" />
                <span className="hidden sm:block text-sm text-gray-700">
                  Welcome, {user?.name}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="relative">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
