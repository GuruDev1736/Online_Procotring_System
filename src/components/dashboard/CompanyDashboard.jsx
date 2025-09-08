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
  FaClock,
  FaChartLine,
  FaChartPie,
  FaTrophy,
  FaCode,
  FaBrain,
  FaRobot,
  FaFilter,
  FaDownload,
  FaArrowUp,
  FaArrowDown,
  FaMinus,
  FaGraduationCap,
  FaLightbulb,
  FaMicrophone,
  FaUserGraduate,
  FaStar,
  FaPercentage,
  FaStopwatch,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle
} from 'react-icons/fa';

const PerformanceAnalytics = () => {
  const [selectedModule, setSelectedModule] = useState('overview');
  const [timeRange, setTimeRange] = useState('30days');
  const [selectedCandidate, setSelectedCandidate] = useState('all');
  const [viewType, setViewType] = useState('summary');

  // Mock performance data
  const performanceData = {
    overview: {
      totalCandidates: 245,
      totalAssessments: 1847,
      averageScore: 78.5,
      completionRate: 89.2,
      passRate: 76.8,
      timeSpent: '45m 32s'
    },
    aptitude: {
      totalTests: 520,
      averageScore: 82.3,
      topPerformers: 45,
      timePerQuestion: '1m 45s',
      strengthAreas: ['Logical Reasoning', 'Quantitative Aptitude'],
      weaknessAreas: ['Data Interpretation', 'Verbal Ability'],
      categories: [
        { name: 'Logical Reasoning', score: 85.2, trend: 'up', improvement: 5.2 },
        { name: 'Quantitative Aptitude', score: 79.8, trend: 'up', improvement: 3.1 },
        { name: 'Verbal Ability', score: 74.5, trend: 'down', improvement: -2.3 },
        { name: 'Data Interpretation', score: 71.2, trend: 'down', improvement: -1.8 },
        { name: 'General Knowledge', score: 77.9, trend: 'stable', improvement: 0.5 }
      ]
    },
    coding: {
      totalChallenges: 342,
      averageScore: 75.6,
      codeQuality: 82.1,
      timeToSolve: '25m 18s',
      languagesUsed: ['Python', 'JavaScript', 'Java', 'C++'],
      difficultyBreakdown: [
        { level: 'Easy', attempted: 156, solved: 142, percentage: 91.0 },
        { level: 'Medium', attempted: 134, solved: 98, percentage: 73.1 },
        { level: 'Hard', attempted: 52, solved: 23, percentage: 44.2 }
      ],
      topicPerformance: [
        { topic: 'Arrays & Strings', score: 89.3, trend: 'up' },
        { topic: 'Data Structures', score: 78.5, trend: 'up' },
        { topic: 'Algorithms', score: 72.1, trend: 'stable' },
        { topic: 'Dynamic Programming', score: 65.8, trend: 'down' },
        { topic: 'System Design', score: 71.2, trend: 'up' }
      ]
    },
    aiInterview: {
      totalInterviews: 189,
      averageConfidence: 7.8,
      communicationScore: 8.2,
      technicalScore: 7.4,
      avgDuration: '32m 15s',
      passRate: 68.2,
      skills: [
        { name: 'Communication', score: 8.2, trend: 'up', weight: 30 },
        { name: 'Technical Knowledge', score: 7.4, trend: 'stable', weight: 40 },
        { name: 'Problem Solving', score: 7.8, trend: 'up', weight: 20 },
        { name: 'Confidence', score: 7.6, trend: 'down', weight: 10 }
      ],
      sentimentAnalysis: {
        positive: 65.3,
        neutral: 28.7,
        negative: 6.0
      },
      commonKeywords: ['experience', 'project', 'team', 'challenge', 'solution']
    }
  };

  // Mock candidate data
  const candidates = [
    {
      id: 1,
      name: 'Alice Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150',
      overallScore: 89.5,
      aptitudeScore: 92.1,
      codingScore: 87.3,
      aiInterviewScore: 8.9,
      testsCompleted: 15,
      rank: 1,
      improvement: 12.3,
      status: 'excellent'
    },
    {
      id: 2,
      name: 'Bob Smith',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      overallScore: 76.8,
      aptitudeScore: 78.5,
      codingScore: 74.2,
      aiInterviewScore: 7.7,
      testsCompleted: 12,
      rank: 15,
      improvement: -2.1,
      status: 'good'
    },
    {
      id: 3,
      name: 'Carol Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      overallScore: 82.3,
      aptitudeScore: 85.7,
      codingScore: 79.1,
      aiInterviewScore: 8.2,
      testsCompleted: 18,
      rank: 8,
      improvement: 7.8,
      status: 'excellent'
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      excellent: { color: 'bg-green-100 text-green-800', icon: FaTrophy },
      good: { color: 'bg-blue-100 text-blue-800', icon: FaCheckCircle },
      average: { color: 'bg-yellow-100 text-yellow-800', icon: FaMinus },
      poor: { color: 'bg-red-100 text-red-800', icon: FaTimesCircle }
    };
    const config = statusConfig[status] || statusConfig.average;
    const Icon = config.icon;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <FaArrowUp className="text-green-500" />;
      case 'down': return <FaArrowDown className="text-red-500" />;
      default: return <FaMinus className="text-gray-500" />;
    }
  };

  const renderOverviewDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Candidates</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{performanceData.overview.totalCandidates}</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-100">
              <FaUsers className="text-xl text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Assessments</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{performanceData.overview.totalAssessments}</p>
            </div>
            <div className="p-3 rounded-xl bg-green-100">
              <FaFileAlt className="text-xl text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Avg Score</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">{performanceData.overview.averageScore}%</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-100">
              <FaChartLine className="text-xl text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Completion Rate</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">{performanceData.overview.completionRate}%</p>
            </div>
            <div className="p-3 rounded-xl bg-orange-100">
              <FaCheckCircle className="text-xl text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Pass Rate</p>
              <p className="text-2xl font-bold text-teal-600 mt-1">{performanceData.overview.passRate}%</p>
            </div>
            <div className="p-3 rounded-xl bg-teal-100">
              <FaTrophy className="text-xl text-teal-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Avg Time</p>
              <p className="text-2xl font-bold text-indigo-600 mt-1">{performanceData.overview.timeSpent}</p>
            </div>
            <div className="p-3 rounded-xl bg-indigo-100">
              <FaStopwatch className="text-xl text-indigo-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Module Performance Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Aptitude Module</h3>
            <FaLightbulb className="text-3xl text-yellow-500" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600 text-base">Average Score</span>
              <span className="font-bold text-lg text-yellow-600">{performanceData.aptitude.averageScore}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 text-base">Tests Completed</span>
              <span className="font-bold text-lg">{performanceData.aptitude.totalTests}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 text-base">Top Performers</span>
              <span className="font-bold text-lg text-green-600">{performanceData.aptitude.topPerformers}</span>
            </div>
            <button className="w-full bg-yellow-100 text-yellow-800 py-3 px-4 rounded-lg hover:bg-yellow-200 transition-colors font-semibold text-base">
              View Details
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Coding Module</h3>
            <FaCode className="text-3xl text-blue-500" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600 text-base">Average Score</span>
              <span className="font-bold text-lg text-blue-600">{performanceData.coding.averageScore}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 text-base">Challenges Solved</span>
              <span className="font-bold text-lg">{performanceData.coding.totalChallenges}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 text-base">Code Quality</span>
              <span className="font-bold text-lg text-green-600">{performanceData.coding.codeQuality}%</span>
            </div>
            <button className="w-full bg-blue-100 text-blue-800 py-3 px-4 rounded-lg hover:bg-blue-200 transition-colors font-semibold text-base">
              View Details
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">AI Interview</h3>
            <FaRobot className="text-3xl text-purple-500" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600 text-base">Avg Confidence</span>
              <span className="font-bold text-lg text-purple-600">{performanceData.aiInterview.averageConfidence}/10</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 text-base">Interviews</span>
              <span className="font-bold text-lg">{performanceData.aiInterview.totalInterviews}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 text-base">Pass Rate</span>
              <span className="font-bold text-lg text-green-600">{performanceData.aiInterview.passRate}%</span>
            </div>
            <button className="w-full bg-purple-100 text-purple-800 py-3 px-4 rounded-lg hover:bg-purple-200 transition-colors font-semibold text-base">
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performers</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-500">Rank</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Candidate</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Overall Score</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Aptitude</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Coding</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">AI Interview</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      {candidate.rank === 1 && <FaTrophy className="text-yellow-500 mr-2" />}
                      <span className="font-semibold">#{candidate.rank}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <img src={candidate.avatar} alt={candidate.name} className="w-8 h-8 rounded-full mr-3" />
                      <span className="font-medium">{candidate.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-blue-600">{candidate.overallScore}%</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium">{candidate.aptitudeScore}%</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium">{candidate.codingScore}%</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium">{candidate.aiInterviewScore}/10</span>
                  </td>
                  <td className="py-3 px-4">
                    {getStatusBadge(candidate.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAptitudeAnalytics = () => (
    <div className="space-y-6">
      {/* Aptitude Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Tests</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{performanceData.aptitude.totalTests}</p>
            </div>
            <div className="p-3 rounded-xl bg-yellow-100">
              <FaLightbulb className="text-xl text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Average Score</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{performanceData.aptitude.averageScore}%</p>
            </div>
            <div className="p-3 rounded-xl bg-green-100">
              <FaChartLine className="text-xl text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Top Performers</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">{performanceData.aptitude.topPerformers}</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-100">
              <FaTrophy className="text-xl text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Avg Time/Question</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{performanceData.aptitude.timePerQuestion}</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-100">
              <FaStopwatch className="text-xl text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Category Performance */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Category Performance Analysis</h3>
        <div className="space-y-4">
          {performanceData.aptitude.categories.map((category, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <FaBrain className="text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{category.name}</h4>
                  <p className="text-sm text-gray-600">Average Performance</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{category.score}%</p>
                  <div className="flex items-center text-sm">
                    {getTrendIcon(category.trend)}
                    <span className={`ml-1 ${category.improvement > 0 ? 'text-green-600' : category.improvement < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                      {category.improvement > 0 ? '+' : ''}{category.improvement}%
                    </span>
                  </div>
                </div>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full" 
                    style={{ width: `${category.score}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths and Weaknesses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Strength Areas</h3>
          <div className="space-y-3">
            {performanceData.aptitude.strengthAreas.map((area, index) => (
              <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                <FaCheckCircle className="text-green-600 mr-3" />
                <span className="font-medium text-green-800">{area}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Areas for Improvement</h3>
          <div className="space-y-3">
            {performanceData.aptitude.weaknessAreas.map((area, index) => (
              <div key={index} className="flex items-center p-3 bg-red-50 rounded-lg border border-red-200">
                <FaExclamationTriangle className="text-red-600 mr-3" />
                <span className="font-medium text-red-800">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCodingAnalytics = () => (
    <div className="space-y-6">
      {/* Coding Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Challenges</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{performanceData.coding.totalChallenges}</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-100">
              <FaCode className="text-xl text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Average Score</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{performanceData.coding.averageScore}%</p>
            </div>
            <div className="p-3 rounded-xl bg-green-100">
              <FaStar className="text-xl text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Code Quality</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">{performanceData.coding.codeQuality}%</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-100">
              <FaGraduationCap className="text-xl text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Avg Solve Time</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">{performanceData.coding.timeToSolve}</p>
            </div>
            <div className="p-3 rounded-xl bg-orange-100">
              <FaStopwatch className="text-xl text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Difficulty Breakdown */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Difficulty Level Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {performanceData.coding.difficultyBreakdown.map((difficulty, index) => (
            <div key={index} className="text-center">
              <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 ${
                difficulty.level === 'Easy' ? 'bg-green-100' :
                difficulty.level === 'Medium' ? 'bg-yellow-100' : 'bg-red-100'
              }`}>
                <div className={`text-2xl font-bold ${
                  difficulty.level === 'Easy' ? 'text-green-600' :
                  difficulty.level === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {difficulty.percentage.toFixed(0)}%
                </div>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{difficulty.level}</h4>
              <p className="text-sm text-gray-600">
                {difficulty.solved} / {difficulty.attempted} solved
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Topic Performance */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Topic-wise Performance</h3>
        <div className="space-y-4">
          {performanceData.coding.topicPerformance.map((topic, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FaCode className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{topic.topic}</h4>
                  <p className="text-sm text-gray-600">Performance Score</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{topic.score}%</p>
                  <div className="flex items-center justify-end text-sm">
                    {getTrendIcon(topic.trend)}
                  </div>
                </div>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${topic.score}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Languages */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Used Programming Languages</h3>
        <div className="flex flex-wrap gap-3">
          {performanceData.coding.languagesUsed.map((language, index) => (
            <span key={index} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium">
              {language}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAIInterviewAnalytics = () => (
    <div className="space-y-6">
      {/* AI Interview Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Interviews</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">{performanceData.aiInterview.totalInterviews}</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-100">
              <FaRobot className="text-xl text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Avg Confidence</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{performanceData.aiInterview.averageConfidence}/10</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-100">
              <FaMicrophone className="text-xl text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Pass Rate</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{performanceData.aiInterview.passRate}%</p>
            </div>
            <div className="p-3 rounded-xl bg-green-100">
              <FaCheckCircle className="text-xl text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Avg Duration</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">{performanceData.aiInterview.avgDuration}</p>
            </div>
            <div className="p-3 rounded-xl bg-orange-100">
              <FaStopwatch className="text-xl text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Skill Assessment */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Skill Assessment Breakdown</h3>
        <div className="space-y-4">
          {performanceData.aiInterview.skills.map((skill, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FaBrain className="text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{skill.name}</h4>
                  <p className="text-sm text-gray-600">Weight: {skill.weight}%</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{skill.score}/10</p>
                  <div className="flex items-center justify-end text-sm">
                    {getTrendIcon(skill.trend)}
                  </div>
                </div>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full" 
                    style={{ width: `${(skill.score / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sentiment Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Sentiment Analysis</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-700">Positive</span>
              </div>
              <span className="font-semibold text-green-600">{performanceData.aiInterview.sentimentAnalysis.positive}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-400 rounded-full mr-3"></div>
                <span className="text-gray-700">Neutral</span>
              </div>
              <span className="font-semibold text-gray-600">{performanceData.aiInterview.sentimentAnalysis.neutral}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                <span className="text-gray-700">Negative</span>
              </div>
              <span className="font-semibold text-red-600">{performanceData.aiInterview.sentimentAnalysis.negative}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Common Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {performanceData.aiInterview.commonKeywords.map((keyword, index) => (
              <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Performance Analytics Dashboard</h2>
            <p className="text-gray-600 mt-1">Track and analyze candidate performance across all modules</p>
          </div>
          
          <div className="flex space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 3 Months</option>
              <option value="1year">Last Year</option>
            </select>
            
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <FaDownload className="mr-2" />
              Export
            </button>
          </div>
        </div>
        
        {/* Module Navigation */}
        <div className="flex space-x-6 mt-6">
          {[
            { id: 'overview', label: 'Overview', icon: FaChartBar },
            { id: 'aptitude', label: 'Aptitude', icon: FaLightbulb },
            { id: 'coding', label: 'Coding', icon: FaCode },
            { id: 'aiInterview', label: 'AI Interview', icon: FaRobot }
          ].map((module) => (
            <button
              key={module.id}
              onClick={() => setSelectedModule(module.id)}
              className={`flex items-center space-x-5 px-10 py-5 rounded-lg font-semibold text-lg transition-colors ${
                selectedModule === module.id
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <module.icon className="text-2xl" />
              <span>{module.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Content Based on Selected Module */}
      {selectedModule === 'overview' && renderOverviewDashboard()}
      {selectedModule === 'aptitude' && renderAptitudeAnalytics()}
      {selectedModule === 'coding' && renderCodingAnalytics()}
      {selectedModule === 'aiInterview' && renderAIInterviewAnalytics()}
    </div>
  );
};

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
          return <PerformanceAnalytics />;      case 'settings':
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
