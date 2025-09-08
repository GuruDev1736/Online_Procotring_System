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
  FaUserShield,
  FaCreditCard,
  FaDownload,
  FaEye,
  FaFilter,
  FaCheckCircle,
  FaClock,
  FaTimes,
  FaExclamationTriangle,
  FaRupeeSign,
  FaChevronLeft,
  FaChevronRight,
  FaFileInvoiceDollar,
  FaCertificate,
  FaPlay,
  FaPause,
  FaStop,
  FaCalendar,
  FaUserTie,
  FaGraduationCap,
  FaBinoculars,
  FaDesktop,
  FaVideo,
  FaMicrophone,
  FaWifi,
  FaTimesCircle,
  FaEdit,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaIdCard,
  FaToggleOn,
  FaToggleOff,
  FaShieldAlt,
  FaUserCheck,
  FaUserTimes,
  FaTrash,
  FaHistory,
  FaBan,
  FaUserEdit
} from 'react-icons/fa';

// UserManagementTab Component
const UserManagementTab = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [companyFilter, setCompanyFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Mock user data - simulate API call
  React.useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUsers = [
        {
          id: 'user_001',
          name: 'John Smith',
          email: 'john.smith@techcorp.com',
          phone: '+91 9876543210',
          role: 'Company Admin',
          company: 'TechCorp Solutions',
          companyId: 1,
          status: 'active',
          lastLogin: '2024-09-04T14:30:00Z',
          joinDate: '2024-01-15T09:00:00Z',
          examsTaken: 12,
          examsCreated: 8,
          averageScore: 85.2,
          location: 'Mumbai, India',
          department: 'Engineering',
          position: 'Senior Developer',
          permissions: ['create_exam', 'manage_candidates', 'view_reports', 'manage_settings'],
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          twoFactorEnabled: true,
          emailVerified: true,
          phoneVerified: true,
          lastPasswordChange: '2024-08-15T10:00:00Z',
          loginHistory: [
            { date: '2024-09-04T14:30:00Z', ip: '192.168.1.100', device: 'Chrome on Windows' },
            { date: '2024-09-03T09:15:00Z', ip: '192.168.1.100', device: 'Chrome on Windows' },
            { date: '2024-09-02T16:45:00Z', ip: '192.168.1.100', device: 'Safari on iPhone' }
          ]
        },
        {
          id: 'user_002',
          name: 'Sarah Johnson',
          email: 'sarah.j@digitalinnovations.com',
          phone: '+91 8765432109',
          role: 'Proctor',
          company: 'Digital Innovations',
          companyId: 2,
          status: 'active',
          lastLogin: '2024-09-05T08:45:00Z',
          joinDate: '2024-02-20T10:30:00Z',
          examsTaken: 0,
          examsCreated: 0,
          examsProctored: 45,
          averageRating: 4.8,
          location: 'Delhi, India',
          department: 'Quality Assurance',
          position: 'Senior Proctor',
          permissions: ['proctor_exams', 'view_candidate_feeds', 'report_violations'],
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150',
          twoFactorEnabled: true,
          emailVerified: true,
          phoneVerified: true,
          lastPasswordChange: '2024-07-10T14:20:00Z',
          proctorCertification: 'Advanced Proctoring Certificate',
          specializations: ['Technical Exams', 'Medical Certifications'],
          loginHistory: [
            { date: '2024-09-05T08:45:00Z', ip: '192.168.2.50', device: 'Firefox on Windows' },
            { date: '2024-09-04T07:30:00Z', ip: '192.168.2.50', device: 'Firefox on Windows' }
          ]
        },
        {
          id: 'user_003',
          name: 'Michael Chen',
          email: 'michael.chen@healthcareplus.com',
          phone: '+91 7654321098',
          role: 'Candidate',
          company: 'Healthcare Plus',
          companyId: 3,
          status: 'active',
          lastLogin: '2024-09-03T11:20:00Z',
          joinDate: '2024-03-10T14:15:00Z',
          examsTaken: 5,
          examsCreated: 0,
          averageScore: 92.5,
          location: 'Bangalore, India',
          department: 'Medical',
          position: 'Medical Resident',
          permissions: ['take_exams', 'view_results'],
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
          twoFactorEnabled: false,
          emailVerified: true,
          phoneVerified: false,
          lastPasswordChange: '2024-06-20T09:30:00Z',
          upcomingExams: 2,
          certificationsEarned: 3,
          loginHistory: [
            { date: '2024-09-03T11:20:00Z', ip: '192.168.3.75', device: 'Chrome on MacOS' },
            { date: '2024-09-01T15:10:00Z', ip: '192.168.3.75', device: 'Chrome on MacOS' }
          ]
        },
        {
          id: 'user_004',
          name: 'Emily Davis',
          email: 'emily.davis@edutech.com',
          phone: '+91 6543210987',
          role: 'Company Admin',
          company: 'EduTech Learning',
          companyId: 4,
          status: 'active',
          lastLogin: '2024-09-05T16:00:00Z',
          joinDate: '2024-01-08T11:45:00Z',
          examsTaken: 3,
          examsCreated: 15,
          averageScore: 88.7,
          location: 'Pune, India',
          department: 'Education Technology',
          position: 'Platform Manager',
          permissions: ['create_exam', 'manage_candidates', 'view_reports', 'manage_settings', 'billing_access'],
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
          twoFactorEnabled: true,
          emailVerified: true,
          phoneVerified: true,
          lastPasswordChange: '2024-08-30T12:15:00Z',
          loginHistory: [
            { date: '2024-09-05T16:00:00Z', ip: '192.168.4.120', device: 'Edge on Windows' },
            { date: '2024-09-04T13:20:00Z', ip: '192.168.4.120', device: 'Edge on Windows' }
          ]
        },
        {
          id: 'user_005',
          name: 'Robert Wilson',
          email: 'robert.w@financefirst.com',
          phone: '+91 5432109876',
          role: 'Candidate',
          company: 'FinanceFirst',
          companyId: 5,
          status: 'suspended',
          lastLogin: '2024-08-20T10:30:00Z',
          joinDate: '2024-04-05T13:00:00Z',
          examsTaken: 8,
          examsCreated: 0,
          averageScore: 65.3,
          location: 'Chennai, India',
          department: 'Finance',
          position: 'Financial Analyst',
          permissions: ['take_exams', 'view_results'],
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
          twoFactorEnabled: false,
          emailVerified: true,
          phoneVerified: true,
          lastPasswordChange: '2024-04-05T13:00:00Z',
          suspensionReason: 'Multiple exam violations detected',
          suspendedBy: 'admin@proctor.ai',
          suspendedDate: '2024-08-25T14:00:00Z',
          violationCount: 5,
          loginHistory: [
            { date: '2024-08-20T10:30:00Z', ip: '192.168.5.200', device: 'Chrome on Windows' }
          ]
        },
        {
          id: 'user_006',
          name: 'Alex Rodriguez',
          email: 'alex.r@startuphub.com',
          phone: '+91 9988776655',
          role: 'Company Admin',
          company: 'StartupHub',
          companyId: 6,
          status: 'active',
          lastLogin: '2024-09-05T12:15:00Z',
          joinDate: '2024-02-01T10:00:00Z',
          examsTaken: 7,
          examsCreated: 12,
          averageScore: 91.8,
          location: 'Hyderabad, India',
          department: 'Data Science',
          position: 'CTO',
          permissions: ['create_exam', 'manage_candidates', 'view_reports', 'manage_settings', 'billing_access', 'user_management'],
          avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150',
          twoFactorEnabled: true,
          emailVerified: true,
          phoneVerified: true,
          lastPasswordChange: '2024-09-01T09:00:00Z',
          loginHistory: [
            { date: '2024-09-05T12:15:00Z', ip: '192.168.6.150', device: 'Chrome on Linux' },
            { date: '2024-09-04T18:30:00Z', ip: '192.168.6.150', device: 'Chrome on Linux' }
          ]
        },
        {
          id: 'user_007',
          name: 'Lisa Thompson',
          email: 'lisa.t@proctorteam.com',
          phone: '+91 8877665544',
          role: 'Proctor',
          company: 'ProctorAI Team',
          companyId: 0,
          status: 'active',
          lastLogin: '2024-09-05T17:30:00Z',
          joinDate: '2023-12-01T09:00:00Z',
          examsTaken: 0,
          examsCreated: 0,
          examsProctored: 120,
          averageRating: 4.9,
          location: 'Mumbai, India',
          department: 'Proctoring Services',
          position: 'Lead Proctor',
          permissions: ['proctor_exams', 'view_candidate_feeds', 'report_violations', 'proctor_training'],
          avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150',
          twoFactorEnabled: true,
          emailVerified: true,
          phoneVerified: true,
          lastPasswordChange: '2024-08-20T11:00:00Z',
          proctorCertification: 'Master Proctor Certification',
          specializations: ['Technical Exams', 'Financial Certifications', 'Medical Exams'],
          loginHistory: [
            { date: '2024-09-05T17:30:00Z', ip: '10.0.1.100', device: 'Chrome on Windows' },
            { date: '2024-09-05T08:00:00Z', ip: '10.0.1.100', device: 'Chrome on Windows' }
          ]
        }
      ];
      
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  // Filter users based on search, role, status, and company
  React.useEffect(() => {
    let filtered = users;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.position?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    // Company filter
    if (companyFilter !== 'all') {
      filtered = filtered.filter(user => user.company === companyFilter);
    }

    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, roleFilter, statusFilter, companyFilter, users]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', icon: FaUserCheck, text: 'Active' },
      inactive: { color: 'bg-gray-100 text-gray-800', icon: FaUserTimes, text: 'Inactive' },
      suspended: { color: 'bg-red-100 text-red-800', icon: FaBan, text: 'Suspended' },
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: FaClock, text: 'Pending' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="mr-1" />
        {config.text}
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const roleColors = {
      'Company Admin': 'bg-blue-100 text-blue-800',
      'Proctor': 'bg-purple-100 text-purple-800',
      'Candidate': 'bg-green-100 text-green-800',
      'Super Admin': 'bg-red-100 text-red-800'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleColors[role] || 'bg-gray-100 text-gray-800'}`}>
        {role}
      </span>
    );
  };

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowDetailsModal(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleToggleStatus = (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
  };

  const exportUsers = () => {
    const csvContent = [
      ['Name', 'Email', 'Role', 'Company', 'Status', 'Last Login', 'Join Date', 'Exams Taken', 'Average Score'],
      ...filteredUsers.map(user => [
        user.name,
        user.email,
        user.role,
        user.company,
        user.status,
        new Date(user.lastLogin).toLocaleDateString(),
        new Date(user.joinDate).toLocaleDateString(),
        user.examsTaken,
        user.averageScore || 'N/A'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Calculate summary statistics
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === 'active').length;
  const companyAdmins = users.filter(user => user.role === 'Company Admin').length;
  const proctors = users.filter(user => user.role === 'Proctor').length;
  const candidates = users.filter(user => user.role === 'Candidate').length;

  // Get unique companies and roles for filters
  const companies = [...new Set(users.map(user => user.company))];
  const roles = [...new Set(users.map(user => user.role))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Users</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{totalUsers}</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-100">
              <FaUsers className="text-xl text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Users</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{activeUsers}</p>
            </div>
            <div className="p-3 rounded-xl bg-green-100">
              <FaUserCheck className="text-xl text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Company Admins</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">{companyAdmins}</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-100">
              <FaShieldAlt className="text-xl text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Proctors</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">{proctors}</p>
            </div>
            <div className="p-3 rounded-xl bg-orange-100">
              <FaBinoculars className="text-xl text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
          <div className="flex gap-2">
            <button
              onClick={exportUsers}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FaDownload className="mr-2" />
              Export
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <FaPlus className="mr-2" />
              Add User
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Roles</option>
            {roles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
            <option value="pending">Pending</option>
          </select>

          <select
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Companies</option>
            {companies.map(company => (
              <option key={company} value={company}>{company}</option>
            ))}
          </select>

          <div className="flex items-center text-sm text-gray-500">
            <FaFilter className="mr-2" />
            {filteredUsers.length} of {users.length} users
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role & Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={user.avatar}
                          alt={user.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                        <div className="text-xs text-gray-400">
                          {user.position} • {user.department}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>{getRoleBadge(user.role)}</div>
                    <div className="text-sm text-gray-500 mt-1">{user.company}</div>
                    <div className="text-xs text-gray-400">{user.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(user.status)}
                    <div className="flex items-center mt-1 text-xs">
                      {user.twoFactorEnabled ? (
                        <span className="text-green-600 flex items-center">
                          <FaShieldAlt className="mr-1" /> 2FA
                        </span>
                      ) : (
                        <span className="text-gray-400">No 2FA</span>
                      )}
                      {user.emailVerified && (
                        <span className="text-green-600 ml-2 flex items-center">
                          <FaEnvelope className="mr-1" /> ✓
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.role === 'Proctor' ? (
                      <div>
                        <div className="text-sm text-gray-900">
                          Proctored: {user.examsProctored}
                        </div>
                        <div className="text-xs text-yellow-600">
                          Rating: {user.averageRating}/5.0
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-sm text-gray-900">
                          Exams: {user.examsTaken}
                        </div>
                        {user.examsCreated > 0 && (
                          <div className="text-xs text-blue-600">
                            Created: {user.examsCreated}
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.averageScore ? (
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {user.averageScore}%
                        </div>
                        {user.certificationsEarned && (
                          <div className="text-xs text-green-600">
                            {user.certificationsEarned} certs
                          </div>
                        )}
                      </div>
                    ) : user.role === 'Proctor' ? (
                      <div className="text-sm text-gray-900">
                        {user.proctorCertification && (
                          <div className="text-xs text-purple-600">
                            Certified
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400">No data</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>
                      <div>{new Date(user.lastLogin).toLocaleDateString()}</div>
                      <div className="text-xs">{new Date(user.lastLogin).toLocaleTimeString()}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleViewDetails(user)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                      title="Edit User"
                    >
                      <FaUserEdit />
                    </button>
                    <button
                      onClick={() => handleToggleStatus(user.id, user.status)}
                      className={`mr-3 ${user.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                      title={user.status === 'active' ? 'Suspend User' : 'Activate User'}
                    >
                      {user.status === 'active' ? <FaBan /> : <FaUserCheck />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{' '}
                  <span className="font-medium">{indexOfFirstUser + 1}</span>
                  {' '}to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastUser, filteredUsers.length)}
                  </span>
                  {' '}of{' '}
                  <span className="font-medium">{filteredUsers.length}</span>
                  {' '}results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <FaChevronLeft />
                  </button>
                  {[...Array(Math.min(totalPages, 5))].map((_, index) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = index + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = index + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + index;
                    } else {
                      pageNumber = currentPage - 2 + index;
                    }
                    
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === pageNumber
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <FaChevronRight />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {showDetailsModal && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border max-w-4xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                User Details - {selectedUser.name}
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* User Profile */}
              <div className="flex items-start space-x-6">
                <img
                  className="h-20 w-20 rounded-full object-cover"
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                />
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Full Name</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedUser.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Email</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedUser.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Phone</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedUser.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Location</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedUser.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Role & Company Information */}
              <div className="border-t pt-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">Role & Company Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Role</label>
                    <div className="mt-1">
                      {getRoleBadge(selectedUser.role)}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Status</label>
                    <div className="mt-1">
                      {getStatusBadge(selectedUser.status)}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Company</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedUser.company}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Department</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedUser.department}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Position</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedUser.position}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Join Date</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(selectedUser.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Security Information */}
              <div className="border-t pt-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">Security & Verification</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <FaShieldAlt className={`mr-2 ${selectedUser.twoFactorEnabled ? 'text-green-600' : 'text-gray-400'}`} />
                    <span className="text-sm">Two-Factor Authentication</span>
                    <span className={`ml-auto text-xs px-2 py-1 rounded ${selectedUser.twoFactorEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                      {selectedUser.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className={`mr-2 ${selectedUser.emailVerified ? 'text-green-600' : 'text-gray-400'}`} />
                    <span className="text-sm">Email Verification</span>
                    <span className={`ml-auto text-xs px-2 py-1 rounded ${selectedUser.emailVerified ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                      {selectedUser.emailVerified ? 'Verified' : 'Unverified'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FaPhone className={`mr-2 ${selectedUser.phoneVerified ? 'text-green-600' : 'text-gray-400'}`} />
                    <span className="text-sm">Phone Verification</span>
                    <span className={`ml-auto text-xs px-2 py-1 rounded ${selectedUser.phoneVerified ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                      {selectedUser.phoneVerified ? 'Verified' : 'Unverified'}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Last Password Change</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(selectedUser.lastPasswordChange).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Activity & Performance */}
              <div className="border-t pt-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">Activity & Performance</h4>
                {selectedUser.role === 'Proctor' ? (
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">{selectedUser.examsProctored}</p>
                      <p className="text-sm text-gray-500">Exams Proctored</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-yellow-600">{selectedUser.averageRating}</p>
                      <p className="text-sm text-gray-500">Average Rating</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-blue-600">{selectedUser.proctorCertification}</p>
                      <p className="text-sm text-gray-500">Certification</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">{selectedUser.specializations?.join(', ')}</p>
                      <p className="text-sm text-gray-500">Specializations</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{selectedUser.examsTaken}</p>
                      <p className="text-sm text-gray-500">Exams Taken</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{selectedUser.examsCreated}</p>
                      <p className="text-sm text-gray-500">Exams Created</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">{selectedUser.averageScore || 'N/A'}</p>
                      <p className="text-sm text-gray-500">Average Score</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">{selectedUser.certificationsEarned || 0}</p>
                      <p className="text-sm text-gray-500">Certifications</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Permissions */}
              <div className="border-t pt-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">Permissions</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedUser.permissions.map((permission, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {permission.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  ))}
                </div>
              </div>

              {/* Suspension Information */}
              {selectedUser.status === 'suspended' && selectedUser.suspensionReason && (
                <div className="border-t pt-6">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Suspension Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Reason</label>
                      <p className="mt-1 text-sm text-red-600">{selectedUser.suspensionReason}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Suspended By</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedUser.suspendedBy}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Suspended Date</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(selectedUser.suspendedDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Violation Count</label>
                      <p className="mt-1 text-sm text-red-600">{selectedUser.violationCount}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Login History */}
              <div className="border-t pt-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">Recent Login History</h4>
                <div className="space-y-2">
                  {selectedUser.loginHistory.slice(0, 5).map((login, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div>
                        <p className="text-sm text-gray-900">{new Date(login.date).toLocaleString()}</p>
                        <p className="text-xs text-gray-500">{login.device}</p>
                      </div>
                      <p className="text-xs text-gray-500">{login.ip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => handleEditUser(selectedUser)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Edit User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ExamManagementTab Component
const ExamManagementTab = () => {
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [companyFilter, setCompanyFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [examsPerPage] = useState(10);
  const [selectedExam, setSelectedExam] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Mock exam data - simulate API call
  React.useEffect(() => {
    const fetchExams = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const mockExams = [
        {
          id: 'exam_001',
          title: 'Java Developer Assessment',
          examCode: 'JDA-2024-001',
          company: 'TechCorp Solutions',
          companyId: 1,
          status: 'completed',
          startDate: '2024-09-01T09:00:00Z',
          endDate: '2024-09-01T11:00:00Z',
          duration: 120, // minutes
          totalCandidates: 25,
          completedCandidates: 23,
          activeCandidates: 0,
          pendingCandidates: 2,
          category: 'Technical',
          difficulty: 'Intermediate',
          proctorType: 'AI + Human',
          examType: 'Coding',
          violations: 3,
          averageScore: 78.5,
          passRate: 84,
          description: 'Comprehensive Java programming assessment covering OOP, data structures, and algorithms',
          createdBy: 'john@techcorp.com',
          proctorAssigned: 'Sarah Johnson',
          technologies: ['Java', 'Spring Boot', 'MySQL'],
          browserLockdown: true,
          webcamMonitoring: true,
          screenRecording: true,
          microphoneMonitoring: true,
          networkMonitoring: true
        },
        {
          id: 'exam_002',
          title: 'Digital Marketing Certification',
          examCode: 'DMC-2024-002',
          company: 'Digital Innovations',
          companyId: 2,
          status: 'active',
          startDate: '2024-09-05T14:00:00Z',
          endDate: '2024-09-05T16:30:00Z',
          duration: 150,
          totalCandidates: 42,
          completedCandidates: 28,
          activeCandidates: 8,
          pendingCandidates: 6,
          category: 'Marketing',
          difficulty: 'Beginner',
          proctorType: 'AI Only',
          examType: 'Multiple Choice',
          violations: 1,
          averageScore: 82.3,
          passRate: 91,
          description: 'Digital marketing fundamentals including SEO, SEM, social media marketing, and analytics',
          createdBy: 'sarah@digitalinnovations.com',
          proctorAssigned: 'AI Proctor System',
          technologies: ['Google Analytics', 'Facebook Ads', 'SEO Tools'],
          browserLockdown: true,
          webcamMonitoring: true,
          screenRecording: false,
          microphoneMonitoring: false,
          networkMonitoring: true
        },
        {
          id: 'exam_003',
          title: 'Medical Ethics and Compliance',
          examCode: 'MEC-2024-003',
          company: 'Healthcare Plus',
          companyId: 3,
          status: 'scheduled',
          startDate: '2024-09-10T10:00:00Z',
          endDate: '2024-09-10T12:00:00Z',
          duration: 120,
          totalCandidates: 18,
          completedCandidates: 0,
          activeCandidates: 0,
          pendingCandidates: 18,
          category: 'Healthcare',
          difficulty: 'Advanced',
          proctorType: 'Human Only',
          examType: 'Essay + MCQ',
          violations: 0,
          averageScore: null,
          passRate: null,
          description: 'Advanced medical ethics, patient confidentiality, and healthcare compliance regulations',
          createdBy: 'michael@healthcareplus.com',
          proctorAssigned: 'Dr. Emily Carter',
          technologies: ['HIPAA Guidelines', 'Medical Records'],
          browserLockdown: true,
          webcamMonitoring: true,
          screenRecording: true,
          microphoneMonitoring: true,
          networkMonitoring: true
        },
        {
          id: 'exam_004',
          title: 'React Frontend Development',
          examCode: 'RFD-2024-004',
          company: 'EduTech Learning',
          companyId: 4,
          status: 'completed',
          startDate: '2024-08-28T13:00:00Z',
          endDate: '2024-08-28T15:30:00Z',
          duration: 150,
          totalCandidates: 33,
          completedCandidates: 31,
          activeCandidates: 0,
          pendingCandidates: 2,
          category: 'Technical',
          difficulty: 'Intermediate',
          proctorType: 'AI + Human',
          examType: 'Coding + MCQ',
          violations: 5,
          averageScore: 71.8,
          passRate: 75,
          description: 'Modern React development including hooks, context, state management, and best practices',
          createdBy: 'emily@edutech.com',
          proctorAssigned: 'Mark Thompson',
          technologies: ['React', 'JavaScript', 'HTML/CSS', 'Node.js'],
          browserLockdown: true,
          webcamMonitoring: true,
          screenRecording: true,
          microphoneMonitoring: true,
          networkMonitoring: true
        },
        {
          id: 'exam_005',
          title: 'Financial Analysis Certification',
          examCode: 'FAC-2024-005',
          company: 'FinanceFirst',
          companyId: 5,
          status: 'cancelled',
          startDate: '2024-08-25T11:00:00Z',
          endDate: '2024-08-25T13:00:00Z',
          duration: 120,
          totalCandidates: 15,
          completedCandidates: 0,
          activeCandidates: 0,
          pendingCandidates: 0,
          category: 'Finance',
          difficulty: 'Advanced',
          proctorType: 'Human Only',
          examType: 'Case Study',
          violations: 0,
          averageScore: null,
          passRate: null,
          description: 'Advanced financial modeling, risk assessment, and investment analysis',
          createdBy: 'robert@financefirst.com',
          proctorAssigned: 'Jennifer Lee',
          technologies: ['Excel', 'Financial Modeling', 'Bloomberg Terminal'],
          browserLockdown: true,
          webcamMonitoring: true,
          screenRecording: true,
          microphoneMonitoring: false,
          networkMonitoring: true,
          cancellationReason: 'Technical difficulties with examination platform'
        },
        {
          id: 'exam_006',
          title: 'Data Science Fundamentals',
          examCode: 'DSF-2024-006',
          company: 'StartupHub',
          companyId: 6,
          status: 'active',
          startDate: '2024-09-05T09:30:00Z',
          endDate: '2024-09-05T12:30:00Z',
          duration: 180,
          totalCandidates: 55,
          completedCandidates: 35,
          activeCandidates: 12,
          pendingCandidates: 8,
          category: 'Data Science',
          difficulty: 'Intermediate',
          proctorType: 'AI + Human',
          examType: 'Coding + Theory',
          violations: 2,
          averageScore: 79.2,
          passRate: 88,
          description: 'Python programming, statistics, machine learning basics, and data visualization',
          createdBy: 'alex@startuphub.com',
          proctorAssigned: 'David Wilson',
          technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib'],
          browserLockdown: true,
          webcamMonitoring: true,
          screenRecording: true,
          microphoneMonitoring: true,
          networkMonitoring: true
        }
      ];
      
      setExams(mockExams);
      setFilteredExams(mockExams);
      setLoading(false);
    };

    fetchExams();
  }, []);

  // Filter exams based on search, status, and company
  React.useEffect(() => {
    let filtered = exams;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(exam =>
        exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.examCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(exam => exam.status === statusFilter);
    }

    // Company filter
    if (companyFilter !== 'all') {
      filtered = filtered.filter(exam => exam.company === companyFilter);
    }

    setFilteredExams(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, companyFilter, exams]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-blue-100 text-blue-800', icon: FaPlay, text: 'Active' },
      completed: { color: 'bg-green-100 text-green-800', icon: FaCheckCircle, text: 'Completed' },
      scheduled: { color: 'bg-yellow-100 text-yellow-800', icon: FaClock, text: 'Scheduled' },
      cancelled: { color: 'bg-red-100 text-red-800', icon: FaTimesCircle, text: 'Cancelled' },
      paused: { color: 'bg-gray-100 text-gray-800', icon: FaPause, text: 'Paused' }
    };

    const config = statusConfig[status] || statusConfig.scheduled;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="mr-1" />
        {config.text}
      </span>
    );
  };

  const getDifficultyBadge = (difficulty) => {
    const difficultyColors = {
      Beginner: 'bg-green-100 text-green-800',
      Intermediate: 'bg-yellow-100 text-yellow-800',
      Advanced: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyColors[difficulty] || 'bg-gray-100 text-gray-800'}`}>
        {difficulty}
      </span>
    );
  };

  const getProctorTypeBadge = (proctorType) => {
    const proctorColors = {
      'AI Only': 'bg-purple-100 text-purple-800',
      'Human Only': 'bg-blue-100 text-blue-800',
      'AI + Human': 'bg-indigo-100 text-indigo-800'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${proctorColors[proctorType] || 'bg-gray-100 text-gray-800'}`}>
        {proctorType}
      </span>
    );
  };

  // Pagination
  const indexOfLastExam = currentPage * examsPerPage;
  const indexOfFirstExam = indexOfLastExam - examsPerPage;
  const currentExams = filteredExams.slice(indexOfFirstExam, indexOfLastExam);
  const totalPages = Math.ceil(filteredExams.length / examsPerPage);

  const handleViewDetails = (exam) => {
    setSelectedExam(exam);
    setShowDetailsModal(true);
  };

  const exportExams = () => {
    const csvContent = [
      ['Exam Code', 'Title', 'Company', 'Status', 'Start Date', 'Duration', 'Total Candidates', 'Completed', 'Average Score', 'Pass Rate'],
      ...filteredExams.map(exam => [
        exam.examCode,
        exam.title,
        exam.company,
        exam.status,
        new Date(exam.startDate).toLocaleDateString(),
        `${exam.duration} mins`,
        exam.totalCandidates,
        exam.completedCandidates,
        exam.averageScore || 'N/A',
        exam.passRate ? `${exam.passRate}%` : 'N/A'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exams.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Calculate summary statistics
  const totalExams = exams.length;
  const activeExams = exams.filter(exam => exam.status === 'active').length;
  const completedExams = exams.filter(exam => exam.status === 'completed').length;
  const totalCandidates = exams.reduce((sum, exam) => sum + exam.totalCandidates, 0);
  const totalViolations = exams.reduce((sum, exam) => sum + exam.violations, 0);
  const avgPassRate = exams.filter(exam => exam.passRate !== null).reduce((sum, exam, _, arr) => 
    sum + (exam.passRate / arr.length), 0);

  // Get unique companies for filter
  const companies = [...new Set(exams.map(exam => exam.company))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Exams</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{totalExams}</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-100">
              <FaFileAlt className="text-xl text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Exams</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{activeExams}</p>
            </div>
            <div className="p-3 rounded-xl bg-green-100">
              <FaPlay className="text-xl text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Candidates</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">{totalCandidates}</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-100">
              <FaUserTie className="text-xl text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Avg Pass Rate</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">{Math.round(avgPassRate)}%</p>
            </div>
            <div className="p-3 rounded-xl bg-orange-100">
              <FaGraduationCap className="text-xl text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Exam Management</h3>
          <button
            onClick={exportExams}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FaDownload className="mr-2" />
            Export
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search exams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="scheduled">Scheduled</option>
            <option value="cancelled">Cancelled</option>
            <option value="paused">Paused</option>
          </select>

          <select
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Companies</option>
            {companies.map(company => (
              <option key={company} value={company}>{company}</option>
            ))}
          </select>

          <div className="flex items-center text-sm text-gray-500">
            <FaFilter className="mr-2" />
            {filteredExams.length} of {exams.length} exams
          </div>
        </div>

        {/* Exams Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exam Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Candidates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentExams.map((exam) => (
                <tr key={exam.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <FaCertificate className="text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {exam.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {exam.examCode} • {exam.category}
                        </div>
                        <div className="flex gap-2 mt-1">
                          {getDifficultyBadge(exam.difficulty)}
                          {getProctorTypeBadge(exam.proctorType)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{exam.company}</div>
                    <div className="text-sm text-gray-500">{exam.createdBy}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(exam.status)}
                    {exam.violations > 0 && (
                      <div className="text-xs text-red-600 mt-1">
                        {exam.violations} violations
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="text-sm text-gray-900">
                      Total: {exam.totalCandidates}
                    </div>
                    <div className="text-xs text-green-600">
                      Completed: {exam.completedCandidates}
                    </div>
                    {exam.activeCandidates > 0 && (
                      <div className="text-xs text-blue-600">
                        Active: {exam.activeCandidates}
                      </div>
                    )}
                    {exam.pendingCandidates > 0 && (
                      <div className="text-xs text-yellow-600">
                        Pending: {exam.pendingCandidates}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {exam.averageScore !== null ? (
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          Avg: {exam.averageScore}%
                        </div>
                        <div className="text-xs text-green-600">
                          Pass Rate: {exam.passRate}%
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-400">Not available</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>
                      <div>{new Date(exam.startDate).toLocaleDateString()}</div>
                      <div className="text-xs">
                        {new Date(exam.startDate).toLocaleTimeString()} - 
                        {new Date(exam.endDate).toLocaleTimeString()}
                      </div>
                      <div className="text-xs text-gray-400">
                        Duration: {exam.duration} mins
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleViewDetails(exam)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                    <button
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                      title="Edit Exam"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => window.open(`/admin/reports/${exam.examCode}`, '_blank')}
                      className="text-green-600 hover:text-green-900"
                      title="View Report"
                    >
                      <FaDownload />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{' '}
                  <span className="font-medium">{indexOfFirstExam + 1}</span>
                  {' '}to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastExam, filteredExams.length)}
                  </span>
                  {' '}of{' '}
                  <span className="font-medium">{filteredExams.length}</span>
                  {' '}results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <FaChevronLeft />
                  </button>
                  {[...Array(Math.min(totalPages, 5))].map((_, index) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = index + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = index + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + index;
                    } else {
                      pageNumber = currentPage - 2 + index;
                    }
                    
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === pageNumber
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <FaChevronRight />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Exam Details Modal */}
      {showDetailsModal && selectedExam && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border max-w-4xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Exam Details - {selectedExam.title}
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Exam Code</label>
                    <p className="mt-1 text-sm text-gray-900 font-mono">{selectedExam.examCode}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Company</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedExam.company}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Category</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedExam.category}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Difficulty</label>
                    <div className="mt-1">
                      {getDifficultyBadge(selectedExam.difficulty)}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Exam Type</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedExam.examType}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Status</label>
                    <div className="mt-1">
                      {getStatusBadge(selectedExam.status)}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Duration</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedExam.duration} minutes</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Proctor Type</label>
                    <div className="mt-1">
                      {getProctorTypeBadge(selectedExam.proctorType)}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Proctor Assigned</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedExam.proctorAssigned}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Created By</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedExam.createdBy}</p>
                  </div>
                </div>
              </div>

              {/* Candidate Statistics */}
              <div className="border-t pt-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">Candidate Statistics</h4>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{selectedExam.totalCandidates}</p>
                    <p className="text-sm text-gray-500">Total</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{selectedExam.completedCandidates}</p>
                    <p className="text-sm text-gray-500">Completed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{selectedExam.activeCandidates}</p>
                    <p className="text-sm text-gray-500">Active</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-600">{selectedExam.pendingCandidates}</p>
                    <p className="text-sm text-gray-500">Pending</p>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              {selectedExam.averageScore !== null && (
                <div className="border-t pt-6">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Performance Metrics</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">{selectedExam.averageScore}%</p>
                      <p className="text-sm text-gray-500">Average Score</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{selectedExam.passRate}%</p>
                      <p className="text-sm text-gray-500">Pass Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-red-600">{selectedExam.violations}</p>
                      <p className="text-sm text-gray-500">Violations</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              <div className="border-t pt-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">Security & Monitoring</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <FaDesktop className={`mr-2 ${selectedExam.browserLockdown ? 'text-green-600' : 'text-gray-400'}`} />
                      <span className="text-sm">Browser Lockdown</span>
                      <span className={`ml-auto text-xs px-2 py-1 rounded ${selectedExam.browserLockdown ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                        {selectedExam.browserLockdown ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FaVideo className={`mr-2 ${selectedExam.webcamMonitoring ? 'text-green-600' : 'text-gray-400'}`} />
                      <span className="text-sm">Webcam Monitoring</span>
                      <span className={`ml-auto text-xs px-2 py-1 rounded ${selectedExam.webcamMonitoring ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                        {selectedExam.webcamMonitoring ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FaBinoculars className={`mr-2 ${selectedExam.screenRecording ? 'text-green-600' : 'text-gray-400'}`} />
                      <span className="text-sm">Screen Recording</span>
                      <span className={`ml-auto text-xs px-2 py-1 rounded ${selectedExam.screenRecording ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                        {selectedExam.screenRecording ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <FaMicrophone className={`mr-2 ${selectedExam.microphoneMonitoring ? 'text-green-600' : 'text-gray-400'}`} />
                      <span className="text-sm">Microphone Monitoring</span>
                      <span className={`ml-auto text-xs px-2 py-1 rounded ${selectedExam.microphoneMonitoring ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                        {selectedExam.microphoneMonitoring ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FaWifi className={`mr-2 ${selectedExam.networkMonitoring ? 'text-green-600' : 'text-gray-400'}`} />
                      <span className="text-sm">Network Monitoring</span>
                      <span className={`ml-auto text-xs px-2 py-1 rounded ${selectedExam.networkMonitoring ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                        {selectedExam.networkMonitoring ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technologies */}
              <div className="border-t pt-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">Technologies/Skills Assessed</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedExam.technologies.map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="border-t pt-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">Description</h4>
                <p className="text-sm text-gray-700">{selectedExam.description}</p>
              </div>

              {/* Cancellation Reason */}
              {selectedExam.cancellationReason && (
                <div className="border-t pt-6">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Cancellation Reason</h4>
                  <p className="text-sm text-red-600">{selectedExam.cancellationReason}</p>
                </div>
              )}

              {/* Schedule Information */}
              <div className="border-t pt-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">Schedule Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Start Date & Time</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(selectedExam.startDate).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">End Date & Time</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(selectedExam.endDate).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => window.open(`/admin/reports/${selectedExam.examCode}`, '_blank')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
              >
                View Full Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// PaymentHistoryTab Component
const PaymentHistoryTab = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsPerPage] = useState(10);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Mock payment data - simulate API call
  React.useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockPayments = [
        {
          id: 'txn_1234567890',
          companyId: 1,
          companyName: 'TechCorp Solutions',
          razorpayPaymentId: 'pay_L8JGGx8o9uEXF2',
          razorpayOrderId: 'order_L8JGGx8o9uEXF2',
          amount: 2499,
          currency: 'INR',
          status: 'captured',
          plan: 'professional',
          billingCycle: 'monthly',
          paymentDate: '2024-01-15T10:30:00Z',
          dueDate: '2024-02-15T00:00:00Z',
          method: 'card',
          description: 'Monthly subscription - Professional Plan',
          invoiceNumber: 'INV-2024-001',
          gst: 449.82,
          totalAmount: 2948.82,
          customerEmail: 'john@techcorp.com',
          customerPhone: '+91 9876543210'
        },
        {
          id: 'txn_1234567891',
          companyId: 2,
          companyName: 'Digital Innovations',
          razorpayPaymentId: 'pay_L8JGGx8o9uEXF3',
          razorpayOrderId: 'order_L8JGGx8o9uEXF3',
          amount: 999,
          currency: 'INR',
          status: 'captured',
          plan: 'basic',
          billingCycle: 'monthly',
          paymentDate: '2024-01-20T14:15:00Z',
          dueDate: '2024-02-20T00:00:00Z',
          method: 'upi',
          description: 'Monthly subscription - Basic Plan',
          invoiceNumber: 'INV-2024-002',
          gst: 179.82,
          totalAmount: 1178.82,
          customerEmail: 'sarah@digitalinnovations.com',
          customerPhone: '+91 8765432109'
        },
        {
          id: 'txn_1234567892',
          companyId: 3,
          companyName: 'Healthcare Plus',
          razorpayPaymentId: 'pay_L8JGGx8o9uEXF4',
          razorpayOrderId: 'order_L8JGGx8o9uEXF4',
          amount: 4999,
          currency: 'INR',
          status: 'failed',
          plan: 'enterprise',
          billingCycle: 'monthly',
          paymentDate: '2024-01-10T09:45:00Z',
          dueDate: '2024-01-10T00:00:00Z',
          method: 'netbanking',
          description: 'Monthly subscription - Enterprise Plan',
          invoiceNumber: 'INV-2024-003',
          gst: 899.82,
          totalAmount: 5898.82,
          customerEmail: 'michael@healthcareplus.com',
          customerPhone: '+91 7654321098',
          failureReason: 'Insufficient balance'
        },
        {
          id: 'txn_1234567893',
          companyId: 4,
          companyName: 'EduTech Learning',
          razorpayPaymentId: 'pay_L8JGGx8o9uEXF5',
          razorpayOrderId: 'order_L8JGGx8o9uEXF5',
          amount: 2499,
          currency: 'INR',
          status: 'authorized',
          plan: 'professional',
          billingCycle: 'monthly',
          paymentDate: '2024-01-05T16:20:00Z',
          dueDate: '2024-02-05T00:00:00Z',
          method: 'card',
          description: 'Monthly subscription - Professional Plan',
          invoiceNumber: 'INV-2024-004',
          gst: 449.82,
          totalAmount: 2948.82,
          customerEmail: 'emily@edutech.com',
          customerPhone: '+91 6543210987'
        },
        {
          id: 'txn_1234567894',
          companyId: 5,
          companyName: 'FinanceFirst',
          razorpayPaymentId: null,
          razorpayOrderId: 'order_L8JGGx8o9uEXF6',
          amount: 999,
          currency: 'INR',
          status: 'pending',
          plan: 'basic',
          billingCycle: 'monthly',
          paymentDate: null,
          dueDate: '2024-02-25T00:00:00Z',
          method: null,
          description: 'Monthly subscription - Basic Plan',
          invoiceNumber: 'INV-2024-005',
          gst: 179.82,
          totalAmount: 1178.82,
          customerEmail: 'robert@financefirst.com',
          customerPhone: '+91 5432109876'
        },
        {
          id: 'txn_1234567895',
          companyId: 6,
          companyName: 'StartupHub',
          razorpayPaymentId: 'pay_L8JGGx8o9uEXF7',
          razorpayOrderId: 'order_L8JGGx8o9uEXF7',
          amount: 4999,
          currency: 'INR',
          status: 'captured',
          plan: 'enterprise',
          billingCycle: 'annual',
          paymentDate: '2024-01-22T11:15:00Z',
          dueDate: '2025-01-22T00:00:00Z',
          method: 'card',
          description: 'Annual subscription - Enterprise Plan',
          invoiceNumber: 'INV-2024-006',
          gst: 899.82,
          totalAmount: 5898.82,
          customerEmail: 'alex@startuphub.com',
          customerPhone: '+91 9988776655'
        }
      ];
      
      setPayments(mockPayments);
      setFilteredPayments(mockPayments);
      setLoading(false);
    };

    fetchPayments();
  }, []);

  // Filter payments based on search, status, and date
  React.useEffect(() => {
    let filtered = payments;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(payment =>
        payment.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.razorpayPaymentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(payment => payment.status === statusFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();

      switch (dateFilter) {
        case 'today':
          filterDate.setDate(now.getDate());
          filtered = filtered.filter(payment => {
            if (!payment.paymentDate) return false;
            const paymentDate = new Date(payment.paymentDate);
            return paymentDate.toDateString() === filterDate.toDateString();
          });
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          filtered = filtered.filter(payment => {
            if (!payment.paymentDate) return false;
            const paymentDate = new Date(payment.paymentDate);
            return paymentDate >= filterDate;
          });
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          filtered = filtered.filter(payment => {
            if (!payment.paymentDate) return false;
            const paymentDate = new Date(payment.paymentDate);
            return paymentDate >= filterDate;
          });
          break;
      }
    }

    setFilteredPayments(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, dateFilter, payments]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      captured: { color: 'bg-green-100 text-green-800', icon: FaCheckCircle, text: 'Captured' },
      authorized: { color: 'bg-blue-100 text-blue-800', icon: FaClock, text: 'Authorized' },
      failed: { color: 'bg-red-100 text-red-800', icon: FaTimes, text: 'Failed' },
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: FaClock, text: 'Pending' },
      refunded: { color: 'bg-gray-100 text-gray-800', icon: FaExclamationTriangle, text: 'Refunded' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="mr-1" />
        {config.text}
      </span>
    );
  };

  const getMethodBadge = (method) => {
    if (!method) return <span className="text-gray-400">-</span>;
    
    const methodColors = {
      card: 'bg-purple-100 text-purple-800',
      upi: 'bg-orange-100 text-orange-800',
      netbanking: 'bg-blue-100 text-blue-800',
      wallet: 'bg-green-100 text-green-800'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${methodColors[method] || 'bg-gray-100 text-gray-800'}`}>
        {method.toUpperCase()}
      </span>
    );
  };

  // Pagination
  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = filteredPayments.slice(indexOfFirstPayment, indexOfLastPayment);
  const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
    setShowDetailsModal(true);
  };

  const exportPayments = () => {
    const csvContent = [
      ['Invoice Number', 'Company', 'Amount', 'GST', 'Total', 'Status', 'Payment Date', 'Method', 'Razorpay Payment ID'],
      ...filteredPayments.map(payment => [
        payment.invoiceNumber,
        payment.companyName,
        payment.amount,
        payment.gst,
        payment.totalAmount,
        payment.status,
        payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString() : 'N/A',
        payment.method || 'N/A',
        payment.razorpayPaymentId || 'N/A'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'payments.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Calculate summary statistics
  const totalRevenue = payments.reduce((sum, payment) => 
    payment.status === 'captured' ? sum + payment.totalAmount : sum, 0
  );
  const pendingAmount = payments.reduce((sum, payment) => 
    payment.status === 'pending' ? sum + payment.totalAmount : sum, 0
  );
  const failedAmount = payments.reduce((sum, payment) => 
    payment.status === 'failed' ? sum + payment.totalAmount : sum, 0
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600 mt-1">₹{totalRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-xl bg-green-100">
              <FaRupeeSign className="text-xl text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Pending Amount</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">₹{pendingAmount.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-xl bg-yellow-100">
              <FaClock className="text-xl text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Failed Amount</p>
              <p className="text-2xl font-bold text-red-600 mt-1">₹{failedAmount.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-xl bg-red-100">
              <FaTimes className="text-xl text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Transactions</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{payments.length}</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-100">
              <FaCreditCard className="text-xl text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Payment History</h3>
          <button
            onClick={exportPayments}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FaDownload className="mr-2" />
            Export
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search payments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="captured">Captured</option>
            <option value="authorized">Authorized</option>
            <option value="failed">Failed</option>
            <option value="pending">Pending</option>
            <option value="refunded">Refunded</option>
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
          </select>

          <div className="flex items-center text-sm text-gray-500">
            <FaFilter className="mr-2" />
            {filteredPayments.length} of {payments.length} payments
          </div>
        </div>

        {/* Payments Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <FaFileInvoiceDollar className="text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {payment.invoiceNumber}
                        </div>
                        <div className="text-sm text-gray-500">
                          {payment.razorpayPaymentId || 'No payment ID'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{payment.companyName}</div>
                    <div className="text-sm text-gray-500">{payment.customerEmail}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ₹{payment.totalAmount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      Base: ₹{payment.amount} + GST: ₹{payment.gst}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(payment.status)}
                    {payment.failureReason && (
                      <div className="text-xs text-red-600 mt-1">
                        {payment.failureReason}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getMethodBadge(payment.method)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {payment.paymentDate ? (
                      <div>
                        <div>{new Date(payment.paymentDate).toLocaleDateString()}</div>
                        <div className="text-xs">{new Date(payment.paymentDate).toLocaleTimeString()}</div>
                      </div>
                    ) : (
                      <span className="text-gray-400">Pending</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleViewDetails(payment)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => window.open(`/admin/invoices/${payment.invoiceNumber}`, '_blank')}
                      className="text-indigo-600 hover:text-indigo-900"
                      title="Download Invoice"
                    >
                      <FaDownload />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{' '}
                  <span className="font-medium">{indexOfFirstPayment + 1}</span>
                  {' '}to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastPayment, filteredPayments.length)}
                  </span>
                  {' '}of{' '}
                  <span className="font-medium">{filteredPayments.length}</span>
                  {' '}results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <FaChevronLeft />
                  </button>
                  {[...Array(Math.min(totalPages, 5))].map((_, index) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = index + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = index + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + index;
                    } else {
                      pageNumber = currentPage - 2 + index;
                    }
                    
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === pageNumber
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <FaChevronRight />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Payment Details Modal */}
      {showDetailsModal && selectedPayment && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border max-w-2xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Payment Details
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Invoice Number</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedPayment.invoiceNumber}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Company</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedPayment.companyName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Razorpay Payment ID</label>
                  <p className="mt-1 text-sm text-gray-900 font-mono">
                    {selectedPayment.razorpayPaymentId || 'N/A'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Razorpay Order ID</label>
                  <p className="mt-1 text-sm text-gray-900 font-mono">
                    {selectedPayment.razorpayOrderId}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Amount</label>
                  <p className="mt-1 text-sm text-gray-900">₹{selectedPayment.amount.toLocaleString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">GST (18%)</label>
                  <p className="mt-1 text-sm text-gray-900">₹{selectedPayment.gst.toLocaleString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Total Amount</label>
                  <p className="mt-1 text-sm text-gray-900 font-semibold">
                    ₹{selectedPayment.totalAmount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Status</label>
                  <div className="mt-1">
                    {getStatusBadge(selectedPayment.status)}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Payment Method</label>
                  <div className="mt-1">
                    {getMethodBadge(selectedPayment.method)}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Plan</label>
                  <p className="mt-1 text-sm text-gray-900 capitalize">
                    {selectedPayment.plan} ({selectedPayment.billingCycle})
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Customer Email</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedPayment.customerEmail}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Customer Phone</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedPayment.customerPhone}</p>
                </div>
                {selectedPayment.paymentDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Payment Date</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(selectedPayment.paymentDate).toLocaleString()}
                    </p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-500">Due Date</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(selectedPayment.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {selectedPayment.failureReason && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Failure Reason</label>
                  <p className="mt-1 text-sm text-red-600">{selectedPayment.failureReason}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-500">Description</label>
                <p className="mt-1 text-sm text-gray-900">{selectedPayment.description}</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => window.open(`/admin/invoices/${selectedPayment.invoiceNumber}`, '_blank')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Download Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

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
        return <UserManagementTab />;

      case 'exams':
        return <ExamManagementTab />;

      case 'payments':
        return <PaymentHistoryTab />;

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
