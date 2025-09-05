import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AIChatbox from '../common/AIChatbox';
import { 
  FaUser, 
  FaFileAlt, 
  FaChartBar, 
  FaCog, 
  FaSignOutAlt,
  FaBell,
  FaSearch,
  FaPlay,
  FaClock,
  FaTrophy,
  FaCalendar,
  FaCheckCircle,
  FaTimesCircle
} from 'react-icons/fa';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaChartBar },
    { id: 'exams', label: 'My Exams', icon: FaFileAlt },
    { id: 'results', label: 'Results', icon: FaTrophy },
    { id: 'profile', label: 'Profile', icon: FaUser },
    { id: 'settings', label: 'Settings', icon: FaCog }
  ];

  const stats = [
    { label: 'Exams Taken', value: '12', icon: FaFileAlt, color: 'blue' },
    { label: 'Average Score', value: '85%', icon: FaTrophy, color: 'green' },
    { label: 'Pending Exams', value: '3', icon: FaClock, color: 'orange' },
    { label: 'Certificates', value: '8', icon: FaCheckCircle, color: 'purple' }
  ];

  const upcomingExams = [
    { 
      id: 1, 
      title: 'React Developer Assessment', 
      company: 'Tech Solutions Ltd',
      date: '2024-01-18',
      time: '10:00 AM',
      duration: '90 mins',
      status: 'scheduled'
    },
    { 
      id: 2, 
      title: 'JavaScript Fundamentals', 
      company: 'Innovation Hub',
      date: '2024-01-20',
      time: '2:00 PM',
      duration: '60 mins',
      status: 'scheduled'
    },
    { 
      id: 3, 
      title: 'Database Design Quiz', 
      company: 'EduCorp Inc',
      date: '2024-01-22',
      time: '11:30 AM',
      duration: '45 mins',
      status: 'scheduled'
    }
  ];

  const recentResults = [
    { 
      id: 1, 
      title: 'Python Programming Test', 
      company: 'Tech Solutions Ltd',
      score: 92,
      status: 'passed',
      date: '2024-01-15',
      certificate: true
    },
    { 
      id: 2, 
      title: 'Data Structures Quiz', 
      company: 'Innovation Hub',
      score: 78,
      status: 'passed',
      date: '2024-01-12',
      certificate: true
    },
    { 
      id: 3, 
      title: 'Algorithm Challenge', 
      company: 'EduCorp Inc',
      score: 65,
      status: 'failed',
      date: '2024-01-10',
      certificate: false
    }
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
              {/* Upcoming Exams */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Exams</h3>
                <div className="space-y-3">
                  {upcomingExams.slice(0, 3).map((exam) => (
                    <div key={exam.id} className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{exam.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{exam.company}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-blue-600">
                            <span className="flex items-center gap-1">
                              <FaCalendar className="text-xs" />
                              {exam.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <FaClock className="text-xs" />
                              {exam.time}
                            </span>
                          </div>
                        </div>
                        <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center gap-1">
                          <FaPlay className="text-xs" />
                          Start
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Results */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Results</h3>
                <div className="space-y-3">
                  {recentResults.slice(0, 3).map((result) => (
                    <div key={result.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{result.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{result.company}</p>
                          <p className="text-sm text-gray-500 mt-1">{result.date}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className={`text-lg font-bold ${
                              result.status === 'passed' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {result.score}%
                            </span>
                            {result.status === 'passed' ? 
                              <FaCheckCircle className="text-green-600" /> : 
                              <FaTimesCircle className="text-red-600" />
                            }
                          </div>
                          {result.certificate && (
                            <span className="text-xs text-blue-600 mt-1 block">Certificate Available</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex items-center justify-center gap-3 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  <FaPlay />
                  Take Practice Exam
                </button>
                <button className="flex items-center justify-center gap-3 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
                  <FaTrophy />
                  View Certificates
                </button>
                <button className="flex items-center justify-center gap-3 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                  <FaChartBar />
                  Performance Analytics
                </button>
              </div>
            </div>
          </div>
        );

      case 'exams':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">My Exams</h3>
            <div className="space-y-4">
              {upcomingExams.map((exam) => (
                <div key={exam.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{exam.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{exam.company}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span>{exam.date} at {exam.time}</span>
                        <span>Duration: {exam.duration}</span>
                      </div>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Start Exam
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'results':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Exam Results</h3>
            <div className="space-y-4">
              {recentResults.map((result) => (
                <div key={result.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{result.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{result.company}</p>
                      <p className="text-sm text-gray-500 mt-1">Completed on {result.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className={`text-xl font-bold ${
                          result.status === 'passed' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {result.score}%
                        </span>
                        {result.status === 'passed' ? 
                          <FaCheckCircle className="text-green-600" /> : 
                          <FaTimesCircle className="text-red-600" />
                        }
                      </div>
                      {result.certificate && (
                        <button className="text-blue-600 text-sm mt-1 hover:underline">
                          Download Certificate
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h3>
            <div className="text-center py-12">
              <FaUser className="text-4xl text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Profile management interface coming soon...</p>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Settings</h3>
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
              <h1 className="text-xl font-semibold text-gray-900">Student Dashboard</h1>
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
                    <FaUser className="text-xl text-blue-600" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">{user?.name}</h2>
                    <p className="text-sm text-gray-600">Student Portal</p>
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

export default UserDashboard;
