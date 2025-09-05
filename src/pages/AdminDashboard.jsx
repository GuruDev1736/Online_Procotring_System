import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBuilding, 
  FaUsers, 
  FaDollarSign, 
  FaChartLine,
  FaPlus,
  FaEye,
  FaTrendUp,
  FaTrendDown
} from 'react-icons/fa';
import { MdPayment, MdVerified, MdPending } from 'react-icons/md';
import AdminLayout from '../components/layout/AdminLayout';
import { ROUTES } from '../constants';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalCompanies: 0,
    activeCompanies: 0,
    totalRevenue: 0,
    pendingPayments: 0,
    totalUsers: 0,
    recentCompanies: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        setStats({
          totalCompanies: 45,
          activeCompanies: 38,
          totalRevenue: 1245000,
          pendingPayments: 8,
          totalUsers: 1250,
          recentCompanies: [
            {
              id: 1,
              name: 'TechCorp Solutions',
              email: 'admin@techcorp.com',
              plan: 'Enterprise',
              status: 'active',
              joinDate: '2025-01-15',
              lastPayment: '2025-01-15'
            },
            {
              id: 2,
              name: 'StartupXYZ',
              email: 'contact@startupxyz.com',
              plan: 'Professional',
              status: 'pending',
              joinDate: '2025-01-10',
              lastPayment: null
            },
            {
              id: 3,
              name: 'Global Industries',
              email: 'hr@globalindustries.com',
              plan: 'Basic',
              status: 'active',
              joinDate: '2025-01-08',
              lastPayment: '2025-01-08'
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: 'Total Companies',
      value: stats.totalCompanies,
      icon: FaBuilding,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'Active Companies',
      value: stats.activeCompanies,
      icon: MdVerified,
      color: 'bg-green-500',
      change: '+8%',
      changeType: 'increase'
    },
    {
      title: 'Total Revenue',
      value: `₹${(stats.totalRevenue / 100000).toFixed(1)}L`,
      icon: FaDollarSign,
      color: 'bg-yellow-500',
      change: '+15%',
      changeType: 'increase'
    },
    {
      title: 'Pending Payments',
      value: stats.pendingPayments,
      icon: MdPending,
      color: 'bg-red-500',
      change: '-5%',
      changeType: 'decrease'
    }
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Page header */}
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Dashboard Overview
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Welcome back! Here's what's happening with your platform.
              </p>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
              <Link
                to={ROUTES.ADMIN_ADD_COMPANY}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              >
                <FaPlus className="mr-2" />
                Add Company
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 ${stat.color} rounded-md flex items-center justify-center`}>
                          <Icon className="text-white text-lg" />
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            {stat.title}
                          </dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">
                              {stat.value}
                            </div>
                            <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                              stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {stat.changeType === 'increase' ? (
                                <FaTrendUp className="self-center flex-shrink-0 h-3 w-3 mr-1" />
                              ) : (
                                <FaTrendDown className="self-center flex-shrink-0 h-3 w-3 mr-1" />
                              )}
                              {stat.change}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Link
                  to={ROUTES.ADMIN_ADD_COMPANY}
                  className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-500 rounded-lg border border-gray-300 hover:border-sky-500 transition-colors"
                >
                  <div>
                    <span className="rounded-lg inline-flex p-3 bg-sky-50 text-sky-700 ring-4 ring-white">
                      <FaBuilding className="h-6 w-6" />
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Add New Company
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Register a new company on the platform with payment plans.
                    </p>
                  </div>
                </Link>

                <Link
                  to={ROUTES.ADMIN_MANAGE_COMPANIES}
                  className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-500 rounded-lg border border-gray-300 hover:border-sky-500 transition-colors"
                >
                  <div>
                    <span className="rounded-lg inline-flex p-3 bg-green-50 text-green-700 ring-4 ring-white">
                      <FaUsers className="h-6 w-6" />
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Manage Companies
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      View, edit, and manage all registered companies.
                    </p>
                  </div>
                </Link>

                <Link
                  to={ROUTES.ADMIN_PAYMENTS}
                  className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-500 rounded-lg border border-gray-300 hover:border-sky-500 transition-colors"
                >
                  <div>
                    <span className="rounded-lg inline-flex p-3 bg-yellow-50 text-yellow-700 ring-4 ring-white">
                      <MdPayment className="h-6 w-6" />
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Payment Details
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Track payments, invoices, and financial reports.
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Companies */}
          <div className="mt-8 bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Recent Companies
                </h3>
                <Link
                  to={ROUTES.ADMIN_MANAGE_COMPANIES}
                  className="text-sm text-sky-600 hover:text-sky-500 font-medium"
                >
                  View all
                </Link>
              </div>
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Plan
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Join Date
                      </th>
                      <th className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {stats.recentCompanies.map((company) => (
                      <tr key={company.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {company.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {company.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {company.plan}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            company.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {company.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(company.joinDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-sky-600 hover:text-sky-900">
                            <FaEye />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
