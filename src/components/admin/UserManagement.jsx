import React, { useState } from 'react';
import { 
  FaUsers, 
  FaSearch,
  FaFilter,
  FaEye,
  FaDownload,
  FaPlus,
  FaShieldAlt,
  FaUserCheck,
  FaUserTimes,
  FaBan,
  FaClock,
  FaBinoculars,
  FaEnvelope,
  FaPhone,
  FaUserEdit,
  FaChevronLeft,
  FaChevronRight,
  FaTimes
} from 'react-icons/fa';

const UserManagement = () => {
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
          role: 'Admin',
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
          role: 'User',
          company: 'Digital Innovations',
          companyId: 2,
          status: 'active',
          lastLogin: '2024-09-05T08:45:00Z',
          joinDate: '2024-02-20T10:30:00Z',
          examsTaken: 15,
          examsCreated: 0,
          averageScore: 92.5,
          location: 'Delhi, India',
          department: 'Quality Assurance',
          position: 'QA Engineer',
          permissions: ['take_exams', 'view_results'],
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150',
          twoFactorEnabled: true,
          emailVerified: true,
          phoneVerified: true,
          lastPasswordChange: '2024-07-10T14:20:00Z',
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
          role: 'User',
          company: 'Healthcare Plus',
          companyId: 3,
          status: 'active',
          lastLogin: '2024-09-03T11:20:00Z',
          joinDate: '2024-03-10T14:15:00Z',
          examsTaken: 5,
          examsCreated: 0,
          averageScore: 88.7,
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
      'Admin': 'bg-blue-100 text-blue-800',
      'User': 'bg-green-100 text-green-800'
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
  const adminUsers = users.filter(user => user.role === 'Admin').length;
  const regularUsers = users.filter(user => user.role === 'User').length;

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
              <p className="text-gray-600 text-sm font-medium">Admin Users</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">{adminUsers}</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-100">
              <FaShieldAlt className="text-xl text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Regular Users</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">{regularUsers}</p>
            </div>
            <div className="p-3 rounded-xl bg-orange-100">
              <FaBinoculars className="text-xl text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* User Management Table */}
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

export default UserManagement;
