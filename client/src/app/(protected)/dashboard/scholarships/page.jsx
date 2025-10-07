'use client';

import React, { useState } from 'react';

const AllScholarshipsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');

  // Sample scholarships data
  const scholarships = [
    {
      id: 1,
      title: 'Tsinghua University Full Scholarship',
      university: 'Tsinghua University',
      country: 'China',
      level: 'Bachelor',
      field: 'Computer Science',
      amount: 'Full Tuition + Stipend',
      deadline: '2024-08-15',
      applications: 45,
      status: 'active',
      featured: true,
      duration: '4 years',
      eligibility: 'High School Diploma, IELTS 6.5',
      created: '2024-01-10',
    },
    {
      id: 2,
      title: 'University of Malaya Merit Scholarship',
      university: 'University of Malaya',
      country: 'Malaysia',
      level: 'Master',
      field: 'Business Administration',
      amount: '50% Tuition',
      deadline: '2024-07-30',
      applications: 32,
      status: 'active',
      featured: false,
      duration: '2 years',
      eligibility: 'Bachelor Degree, GPA 3.2',
      created: '2024-01-15',
    },
    {
      id: 3,
      title: 'Peking University Research Grant',
      university: 'Peking University',
      country: 'China',
      level: 'PhD',
      field: 'Engineering',
      amount: 'Full Funding + Research',
      deadline: '2024-09-20',
      applications: 28,
      status: 'active',
      featured: true,
      duration: '3-5 years',
      eligibility: 'Master Degree, Research Proposal',
      created: '2024-01-08',
    },
    {
      id: 4,
      title: 'UPM International Student Award',
      university: 'Universiti Putra Malaysia',
      country: 'Malaysia',
      level: 'Bachelor',
      field: 'Agriculture',
      amount: '30% Tuition',
      deadline: '2024-06-15',
      applications: 18,
      status: 'active',
      featured: false,
      duration: '4 years',
      eligibility: 'High School, IELTS 6.0',
      created: '2024-01-20',
    },
    {
      id: 5,
      title: 'Zhejiang University Excellence Scholarship',
      university: 'Zhejiang University',
      country: 'China',
      level: 'Master',
      field: 'Medicine',
      amount: '75% Tuition',
      deadline: '2024-08-01',
      applications: 41,
      status: 'pending',
      featured: false,
      duration: '2 years',
      eligibility: 'Bachelor in Medicine, IELTS 7.0',
      created: '2024-01-12',
    },
    {
      id: 6,
      title: "Taylor's University Leadership Award",
      university: "Taylor's University",
      country: 'Malaysia',
      level: 'Diploma',
      field: 'Hospitality',
      amount: '40% Tuition',
      deadline: '2024-05-30',
      applications: 22,
      status: 'active',
      featured: true,
      duration: '2 years',
      eligibility: 'Leadership Experience',
      created: '2024-01-18',
    },
    {
      id: 7,
      title: 'Fudan University Cultural Exchange',
      university: 'Fudan University',
      country: 'China',
      level: 'Bachelor',
      field: 'International Relations',
      amount: '60% Tuition',
      deadline: '2024-07-20',
      applications: 35,
      status: 'active',
      featured: false,
      duration: '4 years',
      eligibility: 'Cultural Activities, IELTS 6.5',
      created: '2024-01-14',
    },
    {
      id: 8,
      title: 'USM STEM Scholarship',
      university: 'Universiti Sains Malaysia',
      country: 'Malaysia',
      level: 'PhD',
      field: 'Science & Technology',
      amount: 'Full Tuition + Research',
      deadline: '2024-10-15',
      applications: 15,
      status: 'expired',
      featured: false,
      duration: '3 years',
      eligibility: 'Master in STEM, Publications',
      created: '2023-12-05',
    },
  ];

  // Filter scholarships based on search and filters
  const filteredScholarships = scholarships.filter(scholarship => {
    const matchesSearch =
      scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship.field.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || scholarship.status === statusFilter;
    const matchesLevel =
      levelFilter === 'all' || scholarship.level === levelFilter;
    const matchesCountry =
      countryFilter === 'all' || scholarship.country === countryFilter;

    return matchesSearch && matchesStatus && matchesLevel && matchesCountry;
  });

  const getStatusColor = status => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = level => {
    switch (level) {
      case 'Bachelor':
        return 'bg-blue-100 text-blue-800';
      case 'Master':
        return 'bg-purple-100 text-purple-800';
      case 'PhD':
        return 'bg-orange-100 text-orange-800';
      case 'Diploma':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAmountColor = amount => {
    if (amount.includes('Full')) return 'text-green-600 font-bold';
    if (amount.includes('75%') || amount.includes('60%'))
      return 'text-blue-600 font-semibold';
    if (amount.includes('50%') || amount.includes('40%'))
      return 'text-purple-600 font-semibold';
    return 'text-gray-600';
  };

  const countries = [...new Set(scholarships.map(s => s.country))];
  const levels = [...new Set(scholarships.map(s => s.level))];
  const statuses = ['active', 'pending', 'expired'];

  return (
    <div className="min-h-screen py-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                All Scholarships
              </h1>
              <p className="text-gray-600">
                Manage and track all scholarship opportunities for international
                students
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-50 transition duration-200 flex items-center space-x-2">
                <span>📊</span>
                <span>Export Report</span>
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition duration-200 flex items-center space-x-2">
                <span>+</span>
                <span>Add Scholarship</span>
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
                  Total Scholarships
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {scholarships.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600 font-medium">
              +8 this month
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Active Scholarships
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {scholarships.filter(s => s.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600 font-medium">
              +5 new offers
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Applications
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {scholarships.reduce((sum, s) => sum + s.applications, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📋</span>
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600 font-medium">
              +23 this week
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Success Rate
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">92%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600 font-medium">
              +3% improvement
            </div>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Scholarship Insights
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">6</div>
              <div className="text-sm text-gray-600">Featured Offers</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600">$2.8M</div>
              <div className="text-sm text-gray-600">Total Value</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="text-2xl font-bold text-purple-600">12</div>
              <div className="text-sm text-gray-600">Days Avg. Response</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-xl">
              <div className="text-2xl font-bold text-orange-600">89%</div>
              <div className="text-sm text-gray-600">Student Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search scholarships by title, university, or field..."
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
                    {status.charAt(0).toUpperCase() + status.slice(1)}
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
              <select
                value={countryFilter}
                onChange={e => setCountryFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              >
                <option value="all">All Countries</option>
                {countries.map(country => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Scholarships Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Scholarship Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    University & Country
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Level & Field
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applications
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deadline
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredScholarships.map(scholarship => (
                  <tr
                    key={scholarship.id}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-3">
                        {scholarship.featured && (
                          <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                            ⭐ FEATURED
                          </span>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-gray-900 line-clamp-2">
                            {scholarship.title}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Duration: {scholarship.duration}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {scholarship.university}
                      </div>
                      <div className="text-sm text-gray-500">
                        {scholarship.country}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(
                          scholarship.level
                        )}`}
                      >
                        {scholarship.level}
                      </span>
                      <div className="text-sm text-gray-600 mt-1">
                        {scholarship.field}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className={`text-sm font-semibold ${getAmountColor(
                          scholarship.amount
                        )}`}
                      >
                        {scholarship.amount}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {scholarship.applications}
                      </div>
                      <div className="text-xs text-gray-500">applications</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {scholarship.deadline}
                      </div>
                      <div className="text-xs text-gray-500">deadline</div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          scholarship.status
                        )}`}
                      >
                        {scholarship.status.charAt(0).toUpperCase() +
                          scholarship.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded hover:bg-blue-50 transition duration-150">
                          View
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 px-2 py-1 rounded hover:bg-gray-50 transition duration-150">
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredScholarships.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No scholarships found
              </h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search or filters
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setLevelFilter('all');
                  setCountryFilter('all');
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
              <div className="text-gray-500 text-sm">Study Fields</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">98%</div>
              <div className="text-gray-500 text-sm">Application Success</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">24h</div>
              <div className="text-gray-500 text-sm">Avg. Response Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">100%</div>
              <div className="text-gray-500 text-sm">Verified Offers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllScholarshipsPage;
