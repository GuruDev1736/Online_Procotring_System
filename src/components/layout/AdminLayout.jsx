import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaShieldAlt, 
  FaTachometerAlt, 
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaUserCircle
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants';

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
    }
  ];

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center h-16 px-6 bg-blue-600">
          <Link to={ROUTES.ADMIN_DASHBOARD} className="flex items-center">
            <FaShieldAlt className="text-white text-2xl" />
            <span className="text-white text-lg font-semibold ml-3">ProctorAI Admin</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-4">
          <div className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-3 rounded-xl transition-all duration-200 group ${
                    item.current
                      ? 'bg-blue-50'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg mr-4 transition-all duration-200 ${
                    item.current
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                      : 'bg-gray-100 text-gray-500 group-hover:text-gray-700 group-hover:bg-gray-200'
                  }`}>
                    <Icon className={`text-xl transition-transform duration-200 ${
                      item.current ? 'transform scale-110' : ''
                    }`} />
                  </div>
                  <span className={`text-sm font-medium ${
                    item.current
                      ? 'text-blue-600'
                      : 'text-gray-600 group-hover:text-gray-900'
                  }`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 w-full border-t border-gray-100">
          <div className="p-4 mx-3 my-2 flex items-center rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
            <img
              className="h-10 w-10 rounded-lg object-cover"
              src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
              alt={user?.name}
            />
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user?.name || 'Admin User'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.role || 'Administrator'}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
              title="Logout"
            >
              <FaSignOutAlt className="text-lg" />
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
      <div className="pl-64">
        {/* Top navigation */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center">
              <h1 className="text-lg font-medium text-gray-900">
                {location.pathname === ROUTES.ADMIN_DASHBOARD ? 'Admin Dashboard' : ''}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                Welcome, <span className="text-gray-900">{user?.name || 'Admin User'}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
