import React, { useState } from 'react';
import { 
  FaFileAlt,
  FaSearch,
  FaFilter,
  FaEye,
  FaDownload,
  FaEdit,
  FaPlay,
  FaPause,
  FaStop,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaCertificate,
  FaUserTie,
  FaGraduationCap,
  FaDesktop,
  FaVideo,
  FaMicrophone,
  FaWifi,
  FaBinoculars,
  FaChevronLeft,
  FaChevronRight,
  FaTimes
} from 'react-icons/fa';

const ExamManagement = () => {
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
          title: 'React Frontend Development',
          examCode: 'RFD-2024-004',
          company: 'EduTech Learning',
          companyId: 4,
          status: 'scheduled',
          startDate: '2024-09-10T13:00:00Z',
          endDate: '2024-09-10T15:30:00Z',
          duration: 150,
          totalCandidates: 33,
          completedCandidates: 0,
          activeCandidates: 0,
          pendingCandidates: 33,
          category: 'Technical',
          difficulty: 'Intermediate',
          proctorType: 'AI + Human',
          examType: 'Coding + MCQ',
          violations: 0,
          averageScore: null,
          passRate: null,
          description: 'Modern React development including hooks, context, state management, and best practices',
          createdBy: 'emily@edutech.com',
          proctorAssigned: 'Mark Thompson',
          technologies: ['React', 'JavaScript', 'HTML/CSS', 'Node.js'],
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

      {/* Exam Management Table */}
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

export default ExamManagement;
