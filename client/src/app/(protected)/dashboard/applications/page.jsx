'use client';

import React, { useState } from 'react';

const ApplicationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [universityFilter, setUniversityFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');

  // Sample applications data
  const applications = [
    {
      id: 1,
      studentName: 'Ahmad Rizki',
      studentId: 'STU2024001',
      email: 'ahmad.rizki@email.com',
      phone: '+62 812-3456-7890',
      nationality: 'Indonesia',
      university: 'Tsinghua University',
      scholarship: 'Tsinghua University Full Scholarship',
      level: 'Bachelor',
      field: 'Computer Science',
      applicationDate: '2024-01-15',
      status: 'under_review',
      documents: ['Transcript', 'IELTS', 'Recommendation'],
      lastUpdate: '2024-01-20',
      priority: 'high',
    },
    {
      id: 2,
      studentName: 'Sarah Chen',
      studentId: 'STU2024002',
      email: 'sarah.chen@email.com',
      phone: '+60 12-345-6789',
      nationality: 'Malaysia',
      university: 'University of Malaya',
      scholarship: 'University of Malaya Merit Scholarship',
      level: 'Master',
      field: 'Business Administration',
      applicationDate: '2024-01-12',
      status: 'approved',
      documents: ['Transcript', 'CV', 'Research Proposal'],
      lastUpdate: '2024-01-18',
      priority: 'medium',
    },
    {
      id: 3,
      studentName: 'David Park',
      studentId: 'STU2024003',
      email: 'david.park@email.com',
      phone: '+82 10-1234-5678',
      nationality: 'South Korea',
      university: 'Peking University',
      scholarship: 'Peking University Research Grant',
      level: 'PhD',
      field: 'Engineering',
      applicationDate: '2024-01-18',
      status: 'interview',
      documents: ['Transcript', 'Publications', 'Research Proposal'],
      lastUpdate: '2024-01-22',
      priority: 'high',
    },
    {
      id: 4,
      studentName: 'Maria Santos',
      studentId: 'STU2024004',
      email: 'maria.santos@email.com',
      phone: '+63 917-123-4567',
      nationality: 'Philippines',
      university: 'Universiti Putra Malaysia',
      scholarship: 'UPM International Student Award',
      level: 'Bachelor',
      field: 'Agriculture',
      applicationDate: '2024-01-10',
      status: 'pending',
      documents: ['Transcript', 'IELTS', 'Personal Statement'],
      lastUpdate: '2024-01-10',
      priority: 'low',
    },
    {
      id: 5,
      studentName: 'James Wilson',
      studentId: 'STU2024005',
      email: 'james.wilson@email.com',
      phone: '+44 7911-123456',
      nationality: 'United Kingdom',
      university: 'Zhejiang University',
      scholarship: 'Zhejiang University Excellence Scholarship',
      level: 'Master',
      field: 'Medicine',
      applicationDate: '2024-01-20',
      status: 'rejected',
      documents: ['Transcript', 'MCAT', 'Recommendation'],
      lastUpdate: '2024-01-25',
      priority: 'medium',
    },
    {
      id: 6,
      studentName: 'Lisa Wang',
      studentId: 'STU2024006',
      email: 'lisa.wang@email.com',
      phone: '+86 138-0011-2233',
      nationality: 'China',
      university: "Taylor's University",
      scholarship: "Taylor's University Leadership Award",
      level: 'Diploma',
      field: 'Hospitality',
      applicationDate: '2024-01-14',
      status: 'approved',
      documents: ['Transcript', 'Leadership Certificates'],
      lastUpdate: '2024-01-19',
      priority: 'low',
    },
    {
      id: 7,
      studentName: 'Raj Patel',
      studentId: 'STU2024007',
      email: 'raj.patel@email.com',
      phone: '+91 98765-43210',
      nationality: 'India',
      university: 'Fudan University',
      scholarship: 'Fudan University Cultural Exchange',
      level: 'Bachelor',
      field: 'International Relations',
      applicationDate: '2024-01-16',
      status: 'under_review',
      documents: ['Transcript', 'IELTS', 'Cultural Portfolio'],
      lastUpdate: '2024-01-21',
      priority: 'high',
    },
    {
      id: 8,
      studentName: 'Yuki Tanaka',
      studentId: 'STU2024008',
      email: 'yuki.tanaka@email.com',
      phone: '+81 90-1234-5678',
      nationality: 'Japan',
      university: 'Universiti Sains Malaysia',
      scholarship: 'USM STEM Scholarship',
      level: 'PhD',
      field: 'Science & Technology',
      applicationDate: '2024-01-11',
      status: 'interview',
      documents: ['Transcript', 'Publications', 'Research Proposal'],
      lastUpdate: '2024-01-17',
      priority: 'high',
    },
  ];

  // Filter applications based on search and filters
  const filteredApplications = applications.filter(application => {
    const matchesSearch =
      application.studentName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      application.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.university.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || application.status === statusFilter;
    const matchesUniversity =
      universityFilter === 'all' || application.university === universityFilter;
    const matchesLevel =
      levelFilter === 'all' || application.level === levelFilter;

    return matchesSearch && matchesStatus && matchesUniversity && matchesLevel;
  });

  const getStatusColor = status => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'under_review':
        return 'bg-blue-100 text-blue-800';
      case 'interview':
        return 'bg-purple-100 text-purple-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = status => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'under_review':
        return 'Under Review';
      case 'interview':
        return 'Interview';
      case 'pending':
        return 'Pending';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  const getPriorityColor = priority => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityText = priority => {
    switch (priority) {
      case 'high':
        return 'High';
      case 'medium':
        return 'Medium';
      case 'low':
        return 'Low';
      default:
        return priority;
    }
  };

  const universities = [...new Set(applications.map(a => a.university))];
  const levels = [...new Set(applications.map(a => a.level))];
  const statuses = [
    'pending',
    'under_review',
    'interview',
    'approved',
    'rejected',
  ];

  return (
    <div className="min-h-screen py-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Student Applications
              </h1>
              <p className="text-gray-600">
                Manage and track all student scholarship applications
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-50 transition duration-200 flex items-center space-x-2">
                <span>📊</span>
                <span>Export Report</span>
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition duration-200 flex items-center space-x-2">
                <span>+</span>
                <span>New Application</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Applications
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {applications.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📋</span>
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600 font-medium">
              +12 this week
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Under Review
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {applications.filter(a => a.status === 'under_review').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">⏳</span>
              </div>
            </div>
            <div className="mt-2 text-sm text-blue-600 font-medium">
              Needs attention
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Approved</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {applications.filter(a => a.status === 'approved').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600 font-medium">
              +5 today
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Success Rate
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">78%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📈</span>
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600 font-medium">
              +8% this month
            </div>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Application Status Distribution
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {statuses.map(status => {
              const count = applications.filter(
                a => a.status === status
              ).length;
              const percentage = (count / applications.length) * 100;
              return (
                <div
                  key={status}
                  className="text-center p-4 bg-gray-50 rounded-xl"
                >
                  <div className="text-2xl font-bold text-blue-600">
                    {count}
                  </div>
                  <div className="text-sm text-gray-600">
                    {getStatusText(status)}
                  </div>
                  <div className="text-xs text-gray-400">
                    {percentage.toFixed(1)}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by student name, ID, or university..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <span className="text-gray-400">🔍</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              >
                <option value="all">All Status</option>
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {getStatusText(status)}
                  </option>
                ))}
              </select>
              <select
                value={universityFilter}
                onChange={e => setUniversityFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              >
                <option value="all">All Universities</option>
                {universities.map(university => (
                  <option key={university} value={university}>
                    {university}
                  </option>
                ))}
              </select>
              <select
                value={levelFilter}
                onChange={e => setLevelFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              >
                <option value="all">All Levels</option>
                {levels.map(level => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student Info
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    University & Program
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Application Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.map(application => (
                  <tr
                    key={application.id}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                          <span className="text-lg font-semibold text-blue-600">
                            {application.studentName
                              .split(' ')
                              .map(n => n[0])
                              .join('')}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">
                            {application.studentName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {application.studentId}
                          </div>
                          <div className="text-xs text-gray-400">
                            {application.nationality}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {application.university}
                      </div>
                      <div className="text-sm text-gray-600">
                        {application.scholarship}
                      </div>
                      <div className="text-xs text-gray-500">
                        {application.level} in {application.field}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        Applied: {application.applicationDate}
                      </div>
                      <div className="text-xs text-gray-500">
                        Last updated: {application.lastUpdate}
                      </div>
                      <div className="mt-1">
                        <div className="text-xs text-gray-500 mb-1">
                          Documents:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {application.documents.map((doc, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg"
                            >
                              {doc}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          application.status
                        )}`}
                      >
                        {getStatusText(application.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                          application.priority
                        )}`}
                      >
                        {getPriorityText(application.priority)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded hover:bg-blue-50 transition duration-150">
                          View
                        </button>
                        <button className="text-green-600 hover:text-green-900 px-2 py-1 rounded hover:bg-green-50 transition duration-150">
                          Update
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 px-2 py-1 rounded hover:bg-gray-50 transition duration-150">
                          Docs
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredApplications.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📋</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No applications found
              </h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search or filters
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setUniversityFilter('all');
                  setLevelFilter('all');
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Footer Stats */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">15+</div>
              <div className="text-gray-500 text-sm">Countries</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">92%</div>
              <div className="text-gray-500 text-sm">Document Completion</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">48h</div>
              <div className="text-gray-500 text-sm">Avg. Processing Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">24/7</div>
              <div className="text-gray-500 text-sm">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsPage;
