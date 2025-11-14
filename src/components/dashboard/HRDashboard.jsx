import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
  FaBell,
  FaSearch,
  FaPlus,
  FaCalendar,
  FaBuilding,
  FaRobot,
  FaCode,
  FaUserTie,
  FaUser,
} from "react-icons/fa";
import { ROUTES } from "../../constants";

const HRDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("manual-interview");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const menuItems = [
    { id: "manual-interview", label: "Manual Interview", icon: FaUserTie },
    { id: "ai-interview", label: "AI Interview", icon: FaRobot },
    { id: "aptitude-test", label: "Aptitude Test", icon: FaFileAlt },
    { id: "coding-test", label: "Coding Test", icon: FaCode },
    { id: "meeting-scheduling", label: "Meeting Scheduling", icon: FaCalendar },
    { id: "profile", label: "Profile", icon: FaUser },
    { id: "settings", label: "Settings", icon: FaCog },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate(ROUTES.LOGIN, { replace: true });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "manual-interview":
        return (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Manual Interview</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
                <FaPlus />
                Schedule Interview
              </button>
            </div>
            <div className="text-center py-12">
              <FaUserTie className="text-4xl text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Manual interview management coming soon...</p>
            </div>
          </div>
        );

      case "ai-interview":
        return (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">AI Interview</h3>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition-colors">
                <FaPlus />
                Create AI Interview
              </button>
            </div>
            <div className="text-center py-12">
              <FaRobot className="text-4xl text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">AI-powered interview system coming soon...</p>
            </div>
          </div>
        );

      case "aptitude-test":
        return (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Aptitude Test</h3>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors">
                <FaPlus />
                Create Test
              </button>
            </div>
            <div className="text-center py-12">
              <FaFileAlt className="text-4xl text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Aptitude test management coming soon...</p>
            </div>
          </div>
        );

      case "coding-test":
        return (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Coding Test</h3>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors">
                <FaPlus />
                Create Coding Test
              </button>
            </div>
            <div className="text-center py-12">
              <FaCode className="text-4xl text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Coding test platform coming soon...</p>
            </div>
          </div>
        );

      case "meeting-scheduling":
        return (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Meeting Scheduling</h3>
              <button className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-700 transition-colors">
                <FaPlus />
                Schedule Meeting
              </button>
            </div>
            <div className="text-center py-12">
              <FaCalendar className="text-4xl text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Meeting scheduling system coming soon...</p>
            </div>
          </div>
        );

      case "profile":
        return (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">HR Profile</h3>
            <div className="text-center py-12">
              <FaUser className="text-4xl text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Profile management coming soon...</p>
            </div>
          </div>
        );

      case "settings":
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
        return (
          <div className="space-y-6">{/* Overview content */}</div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                HR Dashboard
              </h1>
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
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                  {JSON.parse(localStorage.getItem('user') || '{}')?.name?.charAt(0) || 'H'}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">
                    {JSON.parse(localStorage.getItem('user') || '{}')?.name || 'HR User'}
                  </p>
                  <p className="text-xs text-gray-500">HR</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FaBuilding className="text-xl text-purple-600" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {JSON.parse(localStorage.getItem('user') || '{}')?.name || 'HR'}
                    </h2>
                    <p className="text-sm text-gray-600">HR Portal</p>
                  </div>
                </div>

                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === item.id
                          ? "bg-purple-50 text-purple-700 border border-purple-200"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <item.icon className="text-lg" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </nav>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowLogoutConfirm(true)}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <FaSignOutAlt className="text-lg" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">{renderTabContent()}</div>
        </div>
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
              Are you sure you want to logout? You will need to login again to access your dashboard.
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

export default HRDashboard;
