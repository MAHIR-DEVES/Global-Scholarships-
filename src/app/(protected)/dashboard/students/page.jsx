'use client';
import React, { useState } from 'react';

const StudentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [programFilter, setProgramFilter] = useState('all');

  // Sample student data
  const students = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      country: 'United States',
      program: 'Bachelor of Computer Science',
      university: 'Tsinghua University',
      status: 'active',
      applicationDate: '2024-01-15',
      lastActivity: '2 hours ago',
      avatar: 'JS',
    },
    {
      id: 2,
      name: 'Sarah Chen',
      email: 'sarah.chen@email.com',
      phone: '+86 138 0000 0000',
      country: 'China',
      program: 'Master of Business Administration',
      university: 'Peking University',
      status: 'pending',
      applicationDate: '2024-01-20',
      lastActivity: '1 day ago',
      avatar: 'SC',
    },
    {
      id: 3,
      name: 'Michael Rodriguez',
      email: 'm.rodriguez@email.com',
      phone: '+34 612 345 678',
      country: 'Spain',
      program: 'Diploma in Engineering',
      university: 'University of Malaya',
      status: 'active',
      applicationDate: '2024-01-10',
      lastActivity: '5 hours ago',
      avatar: 'MR',
    },
    {
      id: 4,
      name: 'Emma Wilson',
      email: 'emma.wilson@email.com',
      phone: '+44 7911 123456',
      country: 'United Kingdom',
      program: 'PhD in Medicine',
      university: 'Zhejiang University',
      status: 'inactive',
      applicationDate: '2023-12-05',
      lastActivity: '2 weeks ago',
      avatar: 'EW',
    },
    {
      id: 5,
      name: 'David Kim',
      email: 'david.kim@email.com',
      phone: '+82 10 1234 5678',
      country: 'South Korea',
      program: 'Bachelor of Architecture',
      university: 'Universiti Putra Malaysia',
      status: 'active',
      applicationDate: '2024-01-18',
      lastActivity: '30 minutes ago',
      avatar: 'DK',
    },
    {
      id: 6,
      name: 'Lisa Wang',
      email: 'lisa.wang@email.com',
      phone: '+1 (555) 987-6543',
      country: 'Canada',
      program: 'Master of Economics',
      university: 'Fudan University',
      status: 'pending',
      applicationDate: '2024-01-22',
      lastActivity: '3 hours ago',
      avatar: 'LW',
    },
  ];

  // Filter students based on search and filters
  const filteredStudents = students.filter(student => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.university.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || student.status === statusFilter;
    const matchesProgram =
      programFilter === 'all' || student.program.includes(programFilter);

    return matchesSearch && matchesStatus && matchesProgram;
  });

  const getStatusColor = status => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = status => {
    switch (status) {
      case 'active':
        return '🟢';
      case 'pending':
        return '🟡';
      case 'inactive':
        return '🔴';
      default:
        return '⚪';
    }
  };

  return (
    <div className="min-h-screen  py-6">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Student Management
              </h1>
              <p className="text-gray-600">
                Manage and track all student applications and profiles
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-50 transition duration-200">
                Export Data
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition duration-200 flex items-center space-x-2">
                <span>+</span>
                <span>Add Student</span>
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
                  Total Students
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">1,247</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600 font-medium">
              +12% from last month
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Active Applications
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">45</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📋</span>
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600 font-medium">
              +5 this week
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Pending Reviews
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">23</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">⏳</span>
              </div>
            </div>
            <div className="mt-2 text-sm text-red-600 font-medium">
              -3 from yesterday
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Success Rate
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">95%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600 font-medium">
              +2% improvement
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
                  placeholder="Search students by name, email, or university..."
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
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
              <select
                value={programFilter}
                onChange={e => setProgramFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              >
                <option value="all">All Programs</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Master">Master</option>
                <option value="Diploma">Diploma</option>
                <option value="PhD">PhD</option>
              </select>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Program & University
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Country
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Activity
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map(student => (
                  <tr
                    key={student.id}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">
                            {student.avatar}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {student.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {student.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 font-medium">
                        {student.program}
                      </div>
                      <div className="text-sm text-gray-500">
                        {student.university}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {student.country}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          student.status
                        )}`}
                      >
                        {getStatusIcon(student.status)}{' '}
                        {student.status.charAt(0).toUpperCase() +
                          student.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.lastActivity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <button className="text-blue-600 hover:text-blue-900">
                          View
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing{' '}
                <span className="font-medium">{filteredStudents.length}</span>{' '}
                of <span className="font-medium">{students.length}</span>{' '}
                students
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsPage;
