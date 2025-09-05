import React, { useState, useEffect } from 'react';
import { 
  FaCreditCard,
  FaDownload,
  FaEye,
  FaSearch,
  FaFilter,
  FaCheckCircle,
  FaClock,
  FaTimes,
  FaExclamationTriangle,
  FaCalendarAlt,
  FaRupeeSign,
  FaChevronLeft,
  FaChevronRight,
  FaFileInvoiceDollar
} from 'react-icons/fa';
import AdminLayout from '../components/layout/AdminLayout';
import { PAYMENT_PLANS } from '../constants';

const PaymentDetails = () => {
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

  // Mock payment data
  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      
      // Simulate API call
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
        }
      ];
      
      setPayments(mockPayments);
      setFilteredPayments(mockPayments);
      setLoading(false);
    };

    fetchPayments();
  }, []);

  // Filter payments
  useEffect(() => {
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
            const paymentDate = new Date(payment.paymentDate);
            return paymentDate.toDateString() === filterDate.toDateString();
          });
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          filtered = filtered.filter(payment => {
            const paymentDate = new Date(payment.paymentDate);
            return paymentDate >= filterDate;
          });
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          filtered = filtered.filter(payment => {
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
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Header */}
          <div className="md:flex md:items-center md:justify-between mb-8">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Payment Details
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Track all Razorpay payments and transactions
              </p>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <button
                onClick={exportPayments}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <FaDownload className="mr-2" />
                Export
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FaRupeeSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Revenue
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        ₹{totalRevenue.toLocaleString()}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FaClock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Pending Amount
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        ₹{pendingAmount.toLocaleString()}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FaTimes className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Failed Amount
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        ₹{failedAmount.toLocaleString()}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FaCreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Transactions
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {payments.length}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white shadow rounded-lg mb-6">
            <div className="px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search payments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
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
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
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
            </div>
          </div>

          {/* Payments Table */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
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
                            <div className="h-10 w-10 rounded-lg bg-sky-100 flex items-center justify-center">
                              <FaFileInvoiceDollar className="text-sky-600" />
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
                          className="text-sky-600 hover:text-sky-900 mr-3"
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
                className="px-4 py-2 bg-sky-600 text-white rounded-md text-sm font-medium hover:bg-sky-700"
              >
                Download Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default PaymentDetails;
