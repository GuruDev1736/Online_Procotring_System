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
import ThreeBackground from '../common/ThreeBackground';
import { ROUTES } from '../../constants';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  // const { user, logout } = useAuth(); // TODO: Implement AuthContext
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
    }
  ];

  const handleLogout = () => {
    // logout(); // TODO: Implement logout functionality
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate(ROUTES.LOGIN, { replace: true });
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
              onClick={() => setShowLogoutConfirm(true)}
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

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
              <FaSignOutAlt className="text-red-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
              Confirm Logout
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to logout? You will need to login again to access the admin panel.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
