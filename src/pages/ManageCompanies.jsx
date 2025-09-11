/*
// Company management system functionality - Commented out as requested
// This included complex company listing, filtering, status management, payment tracking, etc.
*/

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaPlus,
  FaSearch,
  FaFilter,
  FaEye,
  FaEdit,
  FaTrash,
  FaBan,
  FaCheckCircle,
  FaDownload,
  FaBuilding,
  FaUser,
  FaCalendarAlt,
  FaCreditCard,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import AdminLayout from '../components/layout/AdminLayout';
import { ROUTES, PAYMENT_PLANS } from '../constants';

const ManageCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [companiesPerPage] = useState(10);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);
  
  const navigate = useNavigate();

  // Fetch companies data
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        
        // Simulate API call - In production, replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockCompanies = [
        {
          id: 1,
          companyName: 'TechCorp Solutions',
          contactPerson: 'John Doe',
          email: 'john@techcorp.com',
          phone: '+91 9876543210',
          industry: 'Technology',
          plan: 'professional',
          status: 'active',
          registrationDate: '2024-01-15',
          lastPayment: '2024-01-15',
          nextPayment: '2024-02-15',
          totalRevenue: 2499,
          employeeCount: '51-200',
          city: 'Mumbai',
          state: 'Maharashtra'
        },
        {
          id: 2,
          companyName: 'Digital Innovations',
          contactPerson: 'Sarah Smith',
          email: 'sarah@digitalinnovations.com',
          phone: '+91 8765432109',
          industry: 'Marketing',
          plan: 'basic',
          status: 'active',
          registrationDate: '2024-01-20',
          lastPayment: '2024-01-20',
          nextPayment: '2024-02-20',
          totalRevenue: 999,
          employeeCount: '11-50',
          city: 'Bangalore',
          state: 'Karnataka'
        },
        {
          id: 3,
          companyName: 'Healthcare Plus',
          contactPerson: 'Dr. Michael Brown',
          email: 'michael@healthcareplus.com',
          phone: '+91 7654321098',
          industry: 'Healthcare',
          plan: 'enterprise',
          status: 'suspended',
          registrationDate: '2023-12-10',
          lastPayment: '2023-12-10',
          nextPayment: '2024-01-10',
          totalRevenue: 4999,
          employeeCount: '201-500',
          city: 'Delhi',
          state: 'Delhi'
        },
        {
          id: 4,
          companyName: 'EduTech Learning',
          contactPerson: 'Emily Johnson',
          email: 'emily@edutech.com',
          phone: '+91 6543210987',
          industry: 'Education',
          plan: 'professional',
          status: 'active',
          registrationDate: '2024-01-05',
          lastPayment: '2024-01-05',
          nextPayment: '2024-02-05',
          totalRevenue: 2499,
          employeeCount: '51-200',
          city: 'Pune',
          state: 'Maharashtra'
        },
        {
          id: 5,
          companyName: 'FinanceFirst',
          contactPerson: 'Robert Wilson',
          email: 'robert@financefirst.com',
          phone: '+91 5432109876',
          industry: 'Finance',
          plan: 'basic',
          status: 'pending',
          registrationDate: '2024-01-25',
          lastPayment: null,
          nextPayment: '2024-02-25',
          totalRevenue: 0,
          employeeCount: '1-10',
          city: 'Hyderabad',
          state: 'Telangana'
        }
      ];
      
      setCompanies(mockCompanies);
      setFilteredCompanies(mockCompanies);
    } catch (error) {
      console.error('Error fetching companies:', error);
      // You can add error handling UI here if needed
    } finally {
      setLoading(false);
    }
  };

  fetchCompanies();
  }, []);

  // Filter companies based on search and filters
  useEffect(() => {
    let filtered = companies;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(company =>
        company.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(company => company.status === statusFilter);
    }

    // Plan filter
    if (planFilter !== 'all') {
      filtered = filtered.filter(company => company.plan === planFilter);
    }

    setFilteredCompanies(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, planFilter, companies]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', icon: FaCheckCircle },
      suspended: { color: 'bg-red-100 text-red-800', icon: FaBan },
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: FaCalendarAlt },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPlanInfo = (planId) => {
    const planKey = planId.toUpperCase();
    return PAYMENT_PLANS[planKey] || { name: planId, price: 0 };
  };

  // Pagination
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);
  const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage);

  const handleSelectCompany = (companyId) => {
    setSelectedCompanies(prev =>
      prev.includes(companyId)
        ? prev.filter(id => id !== companyId)
        : [...prev, companyId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCompanies.length === currentCompanies.length) {
      setSelectedCompanies([]);
    } else {
      setSelectedCompanies(currentCompanies.map(company => company.id));
    }
  };

  const handleDeleteCompany = (company) => {
    setCompanyToDelete(company);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (companyToDelete) {
      setCompanies(prev => prev.filter(company => company.id !== companyToDelete.id));
      setShowDeleteModal(false);
      setCompanyToDelete(null);
    }
  };

  const handleStatusChange = (companyId, newStatus) => {
    setCompanies(prev =>
      prev.map(company =>
        company.id === companyId
          ? { ...company, status: newStatus }
          : company
      )
    );
  };

  const exportCompanies = () => {
    // In a real application, this would generate and download a CSV/Excel file
    const csvContent = [
      ['Company Name', 'Contact Person', 'Email', 'Phone', 'Industry', 'Plan', 'Status', 'Registration Date'],
      ...filteredCompanies.map(company => [
        company.companyName,
        company.contactPerson,
        company.email,
        company.phone,
        company.industry,
        getPlanInfo(company.plan).name,
        company.status,
        company.registrationDate
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'companies.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
          <span className="ml-4 text-gray-600">Loading companies...</span>
        </div>
      </AdminLayout>
    );
  }

  if (filteredCompanies.length === 0) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-64">
          <FaBuilding className="text-gray-400 text-5xl mb-4" />
          <h3 className="text-xl font-medium text-gray-600">No Companies Found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setPlanFilter('all');
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  <div className="bg-blue-50 rounded-lg p-3 mr-4">
                    <FaBuilding className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
                      Manage Companies
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Manage all registered companies and their subscriptions
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
                <button
                  onClick={exportCompanies}
                  className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FaDownload className="mr-2" />
                  Export Data
                </button>
                <button
                  onClick={() => navigate(ROUTES.ADMIN_ADD_COMPANY)}
                  className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FaPlus className="mr-2" />
                  Add Company
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                <div className="flex items-center">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <FaBuilding className="text-blue-600 text-xl" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-600 font-medium">Total Companies</p>
                    <p className="text-2xl font-bold text-blue-900">{companies.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
                <div className="flex items-center">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <FaCheckCircle className="text-green-600 text-xl" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-600 font-medium">Active Companies</p>
                    <p className="text-2xl font-bold text-green-900">
                      {companies.filter(c => c.status === 'active').length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4">
                <div className="flex items-center">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <FaCalendarAlt className="text-yellow-600 text-xl" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-600 font-medium">Pending</p>
                    <p className="text-2xl font-bold text-yellow-900">
                      {companies.filter(c => c.status === 'pending').length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
                <div className="flex items-center">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <FaCreditCard className="text-purple-600 text-xl" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-purple-600 font-medium">Total Revenue</p>
                    <p className="text-2xl font-bold text-purple-900">
                      ₹{companies.reduce((sum, company) => sum + company.totalRevenue, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white shadow-sm rounded-2xl mb-6">
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="appearance-none bg-white pl-4 pr-10 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer hover:border-gray-400 transition-colors duration-200"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="suspended">Suspended</option>
                      <option value="pending">Pending</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  <div className="relative">
                    <select
                      value={planFilter}
                      onChange={(e) => setPlanFilter(e.target.value)}
                      className="appearance-none bg-white pl-4 pr-10 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer hover:border-gray-400 transition-colors duration-200"
                    >
                      <option value="all">All Plans</option>
                      <option value="basic">Basic Plan</option>
                      <option value="professional">Professional Plan</option>
                      <option value="enterprise">Enterprise Plan</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex items-center px-4 py-2 bg-gray-50 rounded-xl">
                    <FaFilter className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600 font-medium">
                      {filteredCompanies.length} of {companies.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Companies Table */}
          <div className="bg-white shadow-sm rounded-2xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedCompanies.length === currentCompanies.length && currentCompanies.length > 0}
                          onChange={handleSelectAll}
                          className="rounded-md border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 cursor-pointer"
                        />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentCompanies.map((company) => {
                    const planInfo = getPlanInfo(company.plan);
                    
                    return (
                      <tr key={company.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedCompanies.includes(company.id)}
                            onChange={() => handleSelectCompany(company.id)}
                            className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-lg bg-sky-100 flex items-center justify-center">
                                <FaBuilding className="text-sky-600" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {company.companyName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {company.industry} • {company.employeeCount}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{company.contactPerson}</div>
                          <div className="text-sm text-gray-500">{company.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {planInfo.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ₹{planInfo.price}/month
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(company.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{company.totalRevenue.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(company.registrationDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => navigate(`/admin/companies/${company.id}`)}
                              className="text-sky-600 hover:text-sky-900"
                              title="View Details"
                            >
                              <FaEye />
                            </button>
                            <button
                              onClick={() => navigate(`/admin/companies/${company.id}/edit`)}
                              className="text-indigo-600 hover:text-indigo-900"
                              title="Edit Company"
                            >
                              <FaEdit />
                            </button>
                            <div className="relative group">
                              <button
                                className="text-gray-600 hover:text-gray-900"
                                title="Change Status"
                              >
                                <FaCheckCircle />
                              </button>
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                                <button
                                  onClick={() => handleStatusChange(company.id, 'active')}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                >
                                  Mark as Active
                                </button>
                                <button
                                  onClick={() => handleStatusChange(company.id, 'suspended')}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                >
                                  Suspend
                                </button>
                                <button
                                  onClick={() => handleStatusChange(company.id, 'pending')}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                >
                                  Mark as Pending
                                </button>
                              </div>
                            </div>
                            <button
                              onClick={() => handleDeleteCompany(company)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete Company"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
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
                      <span className="font-medium">{indexOfFirstCompany + 1}</span>
                      {' '}to{' '}
                      <span className="font-medium">
                        {Math.min(indexOfLastCompany, filteredCompanies.length)}
                      </span>
                      {' '}of{' '}
                      <span className="font-medium">{filteredCompanies.length}</span>
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
                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index + 1}
                          onClick={() => setCurrentPage(index + 1)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === index + 1
                              ? 'z-10 bg-sky-50 border-sky-500 text-sky-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
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
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && companyToDelete && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <FaTrash className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mt-4">
                Delete Company
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete "{companyToDelete.companyName}"? 
                  This action cannot be undone.
                </p>
              </div>
              <div className="flex gap-4 justify-center mt-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ManageCompanies;
