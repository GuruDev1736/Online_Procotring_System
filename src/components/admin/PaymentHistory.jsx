import React, { useState } from 'react';
import { 
  FaDollarSign,
  FaCreditCard,
  FaSearch,
  FaFilter,
  FaEye,
  FaDownload,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaExclamationTriangle,
  FaBuilding,
  FaCalendarAlt,
  FaFileInvoiceDollar,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaHistory
} from 'react-icons/fa';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [companyFilter, setCompanyFilter] = useState('all');
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
          id: 'pay_001',
          transactionId: 'TXN_202409001',
          companyName: 'TechCorp Solutions',
          companyId: 1,
          amount: 2500.00,
          currency: 'USD',
          status: 'completed',
          paymentMethod: 'Credit Card',
          paymentDate: '2024-09-01T10:30:00Z',
          invoiceNumber: 'INV-2024-001',
          description: 'Monthly subscription - 100 exam credits',
          serviceType: 'Subscription',
          billingPeriod: '2024-09-01 to 2024-09-30',
          cardLastFour: '4532',
          cardBrand: 'Visa',
          receiptUrl: '/receipts/pay_001.pdf',
          examCredits: 100,
          usedCredits: 45,
          remainingCredits: 55,
          discount: 0,
          tax: 200.00,
          netAmount: 2300.00,
          refundAmount: 0,
          notes: 'Regular monthly subscription payment'
        },
        {
          id: 'pay_002',
          transactionId: 'TXN_202409002',
          companyName: 'Digital Innovations',
          companyId: 2,
          amount: 1200.00,
          currency: 'USD',
          status: 'pending',
          paymentMethod: 'Bank Transfer',
          paymentDate: '2024-09-02T14:15:00Z',
          invoiceNumber: 'INV-2024-002',
          description: 'Additional exam credits purchase',
          serviceType: 'Credits',
          billingPeriod: null,
          cardLastFour: null,
          cardBrand: null,
          receiptUrl: null,
          examCredits: 50,
          usedCredits: 0,
          remainingCredits: 50,
          discount: 100.00,
          tax: 120.00,
          netAmount: 1080.00,
          refundAmount: 0,
          notes: 'Additional credits for upcoming assessments'
        },
        {
          id: 'pay_003',
          transactionId: 'TXN_202409003',
          companyName: 'EduTech Learning',
          companyId: 4,
          amount: 5000.00,
          currency: 'USD',
          status: 'completed',
          paymentMethod: 'Credit Card',
          paymentDate: '2024-08-28T09:45:00Z',
          invoiceNumber: 'INV-2024-003',
          description: 'Annual enterprise subscription',
          serviceType: 'Subscription',
          billingPeriod: '2024-09-01 to 2025-08-31',
          cardLastFour: '8765',
          cardBrand: 'MasterCard',
          receiptUrl: '/receipts/pay_003.pdf',
          examCredits: 500,
          usedCredits: 125,
          remainingCredits: 375,
          discount: 500.00,
          tax: 450.00,
          netAmount: 4550.00,
          refundAmount: 0,
          notes: 'Annual subscription with 10% discount for early payment'
        },
        {
          id: 'pay_004',
          transactionId: 'TXN_202409004',
          companyName: 'StartupHub',
          companyId: 5,
          amount: 750.00,
          currency: 'USD',
          status: 'failed',
          paymentMethod: 'Credit Card',
          paymentDate: '2024-09-03T16:20:00Z',
          invoiceNumber: 'INV-2024-004',
          description: 'Monthly subscription - 30 exam credits',
          serviceType: 'Subscription',
          billingPeriod: '2024-09-01 to 2024-09-30',
          cardLastFour: '1234',
          cardBrand: 'Visa',
          receiptUrl: null,
          examCredits: 30,
          usedCredits: 0,
          remainingCredits: 0,
          discount: 0,
          tax: 67.50,
          netAmount: 682.50,
          refundAmount: 0,
          notes: 'Payment failed - insufficient funds'
        },
        {
          id: 'pay_005',
          transactionId: 'TXN_202409005',
          companyName: 'TechCorp Solutions',
          companyId: 1,
          amount: 300.00,
          currency: 'USD',
          status: 'refunded',
          paymentMethod: 'Credit Card',
          paymentDate: '2024-08-25T11:10:00Z',
          invoiceNumber: 'INV-2024-005',
          description: 'Overage charges refund',
          serviceType: 'Refund',
          billingPeriod: null,
          cardLastFour: '4532',
          cardBrand: 'Visa',
          receiptUrl: '/receipts/pay_005.pdf',
          examCredits: 0,
          usedCredits: 0,
          remainingCredits: 0,
          discount: 0,
          tax: 0,
          netAmount: 300.00,
          refundAmount: 300.00,
          notes: 'Refund for incorrectly charged overage fees'
        }
      ];
      
      setPayments(mockPayments);
      setFilteredPayments(mockPayments);
      setLoading(false);
    };

    fetchPayments();
  }, []);

  // Filter payments based on search, status, and company
  React.useEffect(() => {
    let filtered = payments;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(payment =>
        payment.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(payment => payment.status === statusFilter);
    }

    // Company filter
    if (companyFilter !== 'all') {
      filtered = filtered.filter(payment => payment.companyName === companyFilter);
    }

    setFilteredPayments(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, companyFilter, payments]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { color: 'bg-green-100 text-green-800', icon: FaCheckCircle, text: 'Completed' },
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: FaClock, text: 'Pending' },
      failed: { color: 'bg-red-100 text-red-800', icon: FaTimesCircle, text: 'Failed' },
      refunded: { color: 'bg-blue-100 text-blue-800', icon: FaHistory, text: 'Refunded' },
      processing: { color: 'bg-purple-100 text-purple-800', icon: FaClock, text: 'Processing' }
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

  const getPaymentMethodBadge = (method) => {
    const methodColors = {
      'Credit Card': 'bg-blue-100 text-blue-800',
      'Bank Transfer': 'bg-green-100 text-green-800',
      'PayPal': 'bg-yellow-100 text-yellow-800',
      'Wire Transfer': 'bg-purple-100 text-purple-800'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${methodColors[method] || 'bg-gray-100 text-gray-800'}`}>
        <FaCreditCard className="mr-1" />
        {method}
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
      ['Transaction ID', 'Company', 'Amount', 'Status', 'Payment Date', 'Payment Method', 'Invoice Number', 'Service Type'],
      ...filteredPayments.map(payment => [
        payment.transactionId,
        payment.companyName,
        `${payment.currency} ${payment.amount.toFixed(2)}`,
        payment.status,
        new Date(payment.paymentDate).toLocaleDateString(),
        payment.paymentMethod,
        payment.invoiceNumber,
        payment.serviceType
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'payment_history.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Calculate summary statistics
  const totalRevenue = payments.reduce((sum, payment) => 
    payment.status === 'completed' ? sum + payment.amount : sum, 0
  );
  const totalRefunds = payments.reduce((sum, payment) => 
    payment.status === 'refunded' ? sum + payment.refundAmount : sum, 0
  );
  const totalPending = payments.reduce((sum, payment) => 
    payment.status === 'pending' ? sum + payment.amount : sum, 0
  );
  const totalTransactions = payments.length;
  const successRate = payments.length > 0 
    ? (payments.filter(p => p.status === 'completed').length / payments.length * 100).toFixed(1)
    : 0;

  // Get unique companies for filter
  const companies = [...new Set(payments.map(payment => payment.companyName))];

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
              <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600 mt-1">${totalRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-xl bg-green-100">
              <FaDollarSign className="text-xl text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Pending Payments</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">${totalPending.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-xl bg-yellow-100">
              <FaClock className="text-xl text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Refunds</p>
              <p className="text-2xl font-bold text-red-600 mt-1">${totalRefunds.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-xl bg-red-100">
              <FaHistory className="text-xl text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Success Rate</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{successRate}%</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-100">
              <FaCheckCircle className="text-xl text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Payment History Table */}
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
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
            <option value="processing">Processing</option>
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
            {filteredPayments.length} of {payments.length} payments
          </div>
        </div>

        {/* Payments Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction Details
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
                  Payment Method
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
                          {payment.transactionId}
                        </div>
                        <div className="text-sm text-gray-500">
                          {payment.invoiceNumber}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {payment.serviceType}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FaBuilding className="text-gray-400 mr-2" />
                      <div className="text-sm text-gray-900">{payment.companyName}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {payment.currency} ${payment.amount.toLocaleString()}
                    </div>
                    {payment.discount > 0 && (
                      <div className="text-xs text-green-600">
                        Discount: -${payment.discount.toLocaleString()}
                      </div>
                    )}
                    {payment.refundAmount > 0 && (
                      <div className="text-xs text-red-600">
                        Refunded: ${payment.refundAmount.toLocaleString()}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(payment.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPaymentMethodBadge(payment.paymentMethod)}
                    {payment.cardLastFour && (
                      <div className="text-xs text-gray-500 mt-1">
                        {payment.cardBrand} **** {payment.cardLastFour}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <FaCalendarAlt className="text-gray-400 mr-2" />
                      <div>
                        <div>{new Date(payment.paymentDate).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-400">
                          {new Date(payment.paymentDate).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleViewDetails(payment)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                    {payment.receiptUrl && (
                      <button
                        onClick={() => window.open(payment.receiptUrl, '_blank')}
                        className="text-green-600 hover:text-green-900"
                        title="Download Receipt"
                      >
                        <FaDownload />
                      </button>
                    )}
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
          <div className="relative top-20 mx-auto p-5 border max-w-4xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Payment Details - {selectedPayment.transactionId}
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Transaction Information */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Transaction ID</label>
                    <p className="mt-1 text-sm text-gray-900 font-mono">{selectedPayment.transactionId}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Invoice Number</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedPayment.invoiceNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Company</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedPayment.companyName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Service Type</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedPayment.serviceType}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Status</label>
                    <div className="mt-1">
                      {getStatusBadge(selectedPayment.status)}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Payment Date</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(selectedPayment.paymentDate).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Payment Method</label>
                    <div className="mt-1">
                      {getPaymentMethodBadge(selectedPayment.paymentMethod)}
                    </div>
                  </div>
                  {selectedPayment.cardBrand && (
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Card Details</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedPayment.cardBrand} ending in {selectedPayment.cardLastFour}
                      </p>
                    </div>
                  )}
                  {selectedPayment.billingPeriod && (
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Billing Period</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedPayment.billingPeriod}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Amount Breakdown */}
              <div className="border-t pt-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">Amount Breakdown</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Net Amount:</span>
                      <span className="text-sm font-medium text-gray-900">
                        ${selectedPayment.netAmount.toLocaleString()}
                      </span>
                    </div>
                    {selectedPayment.discount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Discount:</span>
                        <span className="text-sm font-medium text-green-600">
                          -${selectedPayment.discount.toLocaleString()}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Tax:</span>
                      <span className="text-sm font-medium text-gray-900">
                        ${selectedPayment.tax.toLocaleString()}
                      </span>
                    </div>
                    <div className="border-t pt-2 flex justify-between">
                      <span className="text-base font-medium text-gray-900">Total Amount:</span>
                      <span className="text-base font-bold text-gray-900">
                        ${selectedPayment.amount.toLocaleString()}
                      </span>
                    </div>
                    {selectedPayment.refundAmount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Refund Amount:</span>
                        <span className="text-sm font-medium text-red-600">
                          ${selectedPayment.refundAmount.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Exam Credits */}
              {selectedPayment.examCredits > 0 && (
                <div className="border-t pt-6">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Exam Credits</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{selectedPayment.examCredits}</p>
                      <p className="text-sm text-gray-500">Total Credits</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">{selectedPayment.usedCredits}</p>
                      <p className="text-sm text-gray-500">Used Credits</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{selectedPayment.remainingCredits}</p>
                      <p className="text-sm text-gray-500">Remaining Credits</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="border-t pt-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">Description</h4>
                <p className="text-sm text-gray-700">{selectedPayment.description}</p>
              </div>

              {/* Notes */}
              {selectedPayment.notes && (
                <div className="border-t pt-6">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Notes</h4>
                  <p className="text-sm text-gray-700">{selectedPayment.notes}</p>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              {selectedPayment.receiptUrl && (
                <button
                  onClick={() => window.open(selectedPayment.receiptUrl, '_blank')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Download Receipt
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
