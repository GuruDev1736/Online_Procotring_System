import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AIChatbox from '../common/AIChatbox';
import { 
  FaUsers, 
  FaFileAlt, 
  FaChartBar, 
  FaCog, 
  FaSignOutAlt,
  FaBell,
  FaSearch,
  FaPlus,
  FaEye,
  FaCalendar,
  FaBuilding,
  FaClock
} from 'react-icons/fa';

const CompanyDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaChartBar },
    { id: 'exams', label: 'Exams', icon: FaFileAlt },
    { id: 'candidates', label: 'Candidates', icon: FaUsers },
    { id: 'reports', label: 'Reports', icon: FaEye },
    { id: 'settings', label: 'Settings', icon: FaCog }
  ];

  const stats = [
    { label: 'Total Exams', value: '24', icon: FaFileAlt, color: 'blue' },
    { label: 'Active Candidates', value: '156', icon: FaUsers, color: 'green' },
    { label: 'Completed Exams', value: '89', icon: FaChartBar, color: 'purple' },
    { label: 'Scheduled Today', value: '12', icon: FaCalendar, color: 'orange' }
  ];

  const recentExams = [
    { id: 1, title: 'Frontend Developer Assessment', candidates: 23, status: 'active', date: '2024-01-15' },
    { id: 2, title: 'Data Science Quiz', candidates: 45, status: 'scheduled', date: '2024-01-18' },
    { id: 3, title: 'Python Programming Test', candidates: 67, status: 'completed', date: '2024-01-12' }
  ];

  const upcomingExams = [
    { id: 1, title: 'React Developer Test', time: '10:00 AM', candidates: 15 },
    { id: 2, title: 'Database Design Quiz', time: '2:00 PM', candidates: 28 },
    { id: 3, title: 'System Design Interview', time: '4:30 PM', candidates: 8 }
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

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Exams */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Exams</h3>
                <div className="space-y-3">
                  {recentExams.map((exam) => (
                    <div key={exam.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{exam.title}</p>
                        <p className="text-sm text-gray-600">{exam.candidates} candidates • {exam.date}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        exam.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : exam.status === 'scheduled'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {exam.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Today's Schedule */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
                <div className="space-y-3">
                  {upcomingExams.map((exam) => (
                    <div key={exam.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <div>
                        <p className="font-medium text-gray-900">{exam.title}</p>
                        <p className="text-sm text-blue-600 flex items-center gap-1">
                          <FaClock className="text-xs" />
                          {exam.time} • {exam.candidates} candidates
                        </p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                        View
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <button className="flex items-center justify-center gap-3 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  <FaPlus />
                  Create Exam
                </button>
                <button className="flex items-center justify-center gap-3 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
                  <FaUsers />
                  Add Candidates
                </button>
                <button className="flex items-center justify-center gap-3 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                  <FaEye />
                  View Reports
                </button>
                <button className="flex items-center justify-center gap-3 bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors">
                  <FaCalendar />
                  Schedule Exam
                </button>
              </div>
            </div>
          </div>
        );

      case 'exams':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Exam Management</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
                <FaPlus />
                Create New Exam
              </button>
            </div>
            <div className="text-center py-12">
              <FaFileAlt className="text-4xl text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Exam management interface coming soon...</p>
            </div>
          </div>
        );

      case 'candidates':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Candidate Management</h3>
            <div className="text-center py-12">
              <FaUsers className="text-4xl text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Candidate management interface coming soon...</p>
            </div>
          </div>
        );

      case 'reports':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Reports & Analytics</h3>
            <div className="text-center py-12">
              <FaEye className="text-4xl text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Reports interface coming soon...</p>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Company Settings</h3>
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
              <h1 className="text-xl font-semibold text-gray-900">Company Dashboard</h1>
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
                    <FaBuilding className="text-xl text-blue-600" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">{user?.name}</h2>
                    <p className="text-sm text-gray-600">Company Portal</p>
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

export default CompanyDashboard;
