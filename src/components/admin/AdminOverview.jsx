import React, { useState } from 'react';
import { 
  FaUsers,
  FaFileAlt,
  FaDollarSign,
  FaChartLine,
  FaUserCheck,
  FaExclamationTriangle,
  FaCalendarAlt,
  FaClock,
  FaPlay,
  FaCheckCircle,
  FaTimesCircle,
  FaBuilding,
  FaGraduationCap,
  FaDesktop,
  FaBell,
  FaArrowUp,
  FaArrowDown,
  FaMinus
} from 'react-icons/fa';

const AdminOverview = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  // Mock dashboard data - simulate API call
  React.useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockData = {
        stats: {
          totalUsers: 2847,
          activeExams: 23,
          totalRevenue: 142750,
          successRate: 87.5,
          userGrowth: 12.5,
          examGrowth: 8.3,
          revenueGrowth: 15.2,
          successRateChange: -2.1
        },
        recentActivity: [
          {
            id: 1,
            type: 'exam_started',
            title: 'Java Developer Assessment started',
            company: 'TechCorp Solutions',
            time: '5 minutes ago',
            icon: FaPlay,
            color: 'text-blue-600'
          },
          {
            id: 2,
            type: 'user_registered',
            title: 'New company registered',
            company: 'InnovateTech',
            time: '12 minutes ago',
            icon: FaUserCheck,
            color: 'text-green-600'
          },
          {
            id: 3,
            type: 'payment_completed',
            title: 'Payment received',
            company: 'EduTech Learning',
            time: '25 minutes ago',
            icon: FaDollarSign,
            color: 'text-green-600'
          },
          {
            id: 4,
            type: 'violation_detected',
            title: 'Violation detected in exam',
            company: 'Digital Innovations',
            time: '1 hour ago',
            icon: FaExclamationTriangle,
            color: 'text-red-600'
          },
          {
            id: 5,
            type: 'exam_completed',
            title: 'React Frontend Development completed',
            company: 'StartupHub',
            time: '2 hours ago',
            icon: FaCheckCircle,
            color: 'text-green-600'
          }
        ],
        upcomingExams: [
          {
            id: 'exam_001',
            title: 'Python Data Science Certification',
            company: 'DataTech Corp',
            startTime: '2024-09-10T14:00:00Z',
            candidates: 45,
            duration: 180
          },
          {
            id: 'exam_002',
            title: 'AWS Cloud Practitioner',
            company: 'CloudFirst Solutions',
            startTime: '2024-09-11T09:30:00Z',
            candidates: 32,
            duration: 120
          },
          {
            id: 'exam_003',
            title: 'Digital Marketing Advanced',
            company: 'MarketPro Agency',
            startTime: '2024-09-11T16:00:00Z',
            candidates: 28,
            duration: 150
          }
        ],
        alerts: [
          {
            id: 1,
            type: 'warning',
            message: 'Server capacity at 85% - consider scaling',
            time: '10 minutes ago',
            severity: 'medium'
          },
          {
            id: 2,
            type: 'info',
            message: 'Monthly report ready for download',
            time: '1 hour ago',
            severity: 'low'
          },
          {
            id: 3,
            type: 'error',
            message: 'Payment failed for StartupHub subscription',
            time: '3 hours ago',
            severity: 'high'
          }
        ],
        systemHealth: {
          serverStatus: 'healthy',
          databaseStatus: 'healthy',
          paymentGateway: 'healthy',
          proctoringSystems: 'degraded',
          uptime: 99.8
        }
      };
      
      setDashboardData(mockData);
      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  const getTrendIcon = (change) => {
    if (change > 0) return <FaArrowUp className="text-green-500" />;
    if (change < 0) return <FaArrowDown className="text-red-500" />;
    return <FaMinus className="text-gray-500" />;
  };

  const getTrendColor = (change) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'degraded': return 'text-orange-600 bg-orange-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'high': return 'border-red-200 bg-red-50 text-red-800';
      case 'medium': return 'border-yellow-200 bg-yellow-50 text-yellow-800';
      case 'low': return 'border-blue-200 bg-blue-50 text-blue-800';
      default: return 'border-gray-200 bg-gray-50 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const { stats, recentActivity, upcomingExams, alerts, systemHealth } = dashboardData;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome to Admin Dashboard</h1>
            <p className="text-blue-100">
              Monitor your platform's performance and manage all operations from this central hub.
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-100">Last updated</p>
            <p className="text-lg font-semibold">{new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Users</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{stats.totalUsers.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                {getTrendIcon(stats.userGrowth)}
                <span className={`text-sm ml-1 ${getTrendColor(stats.userGrowth)}`}>
                  {Math.abs(stats.userGrowth)}% from last month
                </span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-blue-100">
              <FaUsers className="text-xl text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Exams</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{stats.activeExams}</p>
              <div className="flex items-center mt-2">
                {getTrendIcon(stats.examGrowth)}
                <span className={`text-sm ml-1 ${getTrendColor(stats.examGrowth)}`}>
                  {Math.abs(stats.examGrowth)}% from last month
                </span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-green-100">
              <FaFileAlt className="text-xl text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">${stats.totalRevenue.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                {getTrendIcon(stats.revenueGrowth)}
                <span className={`text-sm ml-1 ${getTrendColor(stats.revenueGrowth)}`}>
                  {Math.abs(stats.revenueGrowth)}% from last month
                </span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-purple-100">
              <FaDollarSign className="text-xl text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Success Rate</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">{stats.successRate}%</p>
              <div className="flex items-center mt-2">
                {getTrendIcon(stats.successRateChange)}
                <span className={`text-sm ml-1 ${getTrendColor(stats.successRateChange)}`}>
                  {Math.abs(stats.successRateChange)}% from last month
                </span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-orange-100">
              <FaChartLine className="text-xl text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <div className={`p-2 rounded-lg bg-gray-100`}>
                    <Icon className={`text-lg ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.company}</p>
                  </div>
                  <div className="text-xs text-gray-400">{activity.time}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Server Status</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(systemHealth.serverStatus)}`}>
                {systemHealth.serverStatus}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Database</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(systemHealth.databaseStatus)}`}>
                {systemHealth.databaseStatus}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Payment Gateway</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(systemHealth.paymentGateway)}`}>
                {systemHealth.paymentGateway}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Proctoring Systems</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(systemHealth.proctoringSystems)}`}>
                {systemHealth.proctoringSystems}
              </span>
            </div>
            <div className="border-t pt-3 mt-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Uptime</span>
                <span className="text-sm font-medium text-green-600">{systemHealth.uptime}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Exams & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Exams */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Exams</h3>
          <div className="space-y-4">
            {upcomingExams.map((exam) => (
              <div key={exam.id} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100">
                <div className="p-2 rounded-lg bg-blue-100">
                  <FaGraduationCap className="text-lg text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{exam.title}</p>
                  <p className="text-xs text-gray-500">{exam.company}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <FaCalendarAlt className="text-xs text-gray-400" />
                    <span className="text-xs text-gray-500">
                      {new Date(exam.startTime).toLocaleDateString()} at {new Date(exam.startTime).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{exam.candidates}</p>
                  <p className="text-xs text-gray-500">candidates</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
            <FaBell className="text-lg text-gray-400" />
          </div>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className={`p-3 rounded-lg border ${getAlertColor(alert.severity)}`}>
                <p className="text-sm font-medium">{alert.message}</p>
                <p className="text-xs opacity-75 mt-1">{alert.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <FaUsers className="text-2xl text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">Manage Users</span>
          </button>
          <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <FaFileAlt className="text-2xl text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">Create Exam</span>
          </button>
          <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <FaChartLine className="text-2xl text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">View Reports</span>
          </button>
          <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <FaDesktop className="text-2xl text-orange-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">System Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
