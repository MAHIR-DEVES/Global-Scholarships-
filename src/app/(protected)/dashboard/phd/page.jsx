'use client';

import React, { useState } from 'react';

const PhdProgramsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState('all');
  const [durationFilter, setDurationFilter] = useState('all');
  const [fieldFilter, setFieldFilter] = useState('all');

  // Sample diploma programs data
  const diplomaPrograms = [
    {
      id: 1,
      programName: 'Diploma in Hospitality Management',
      university: "Taylor's University",
      country: 'Malaysia',
      field: 'Hospitality & Tourism',
      duration: '2 years',
      intake: 'January, May, September',
      tuitionFee: '$8,500 per year',
      applicationDeadline: '2024-03-15',
      requirements: 'High School Diploma, IELTS 5.5',
      scholarshipAvailable: true,
      scholarshipAmount: 'Up to 40% tuition',
      status: 'active',
      studentsEnrolled: 45,
      accreditation: 'MQA Accredited',
      campus: 'Main Campus',
      language: 'English',
    },
    {
      id: 2,
      programName: 'Diploma in Business Administration',
      university: 'Sunway University',
      country: 'Malaysia',
      field: 'Business',
      duration: '2.5 years',
      intake: 'February, July, October',
      tuitionFee: '$7,200 per year',
      applicationDeadline: '2024-04-20',
      requirements: 'High School Diploma, IELTS 5.5',
      scholarshipAvailable: true,
      scholarshipAmount: 'Up to 30% tuition',
      status: 'active',
      studentsEnrolled: 68,
      accreditation: 'MQA Accredited',
      campus: 'Main Campus',
      language: 'English',
    },
    {
      id: 3,
      programName: 'Diploma in Information Technology',
      university: 'INTI International University',
      country: 'Malaysia',
      field: 'Computer Science',
      duration: '2 years',
      intake: 'January, April, August',
      tuitionFee: '$9,100 per year',
      applicationDeadline: '2024-02-28',
      requirements: 'High School Diploma, IELTS 6.0',
      scholarshipAvailable: true,
      scholarshipAmount: 'Up to 35% tuition',
      status: 'active',
      studentsEnrolled: 52,
      accreditation: 'MQA Accredited',
      campus: 'Nilai Campus',
      language: 'English',
    },
    {
      id: 4,
      programName: 'Diploma in Culinary Arts',
      university: 'KDU University College',
      country: 'Malaysia',
      field: 'Culinary Arts',
      duration: '2 years',
      intake: 'March, July, November',
      tuitionFee: '$10,500 per year',
      applicationDeadline: '2024-05-10',
      requirements: 'High School Diploma, IELTS 5.0',
      scholarshipAvailable: false,
      scholarshipAmount: 'Not available',
      status: 'active',
      studentsEnrolled: 38,
      accreditation: 'MQA Accredited',
      campus: 'Damansara Campus',
      language: 'English',
    },
    {
      id: 5,
      programName: 'Diploma in Graphic Design',
      university: 'The One Academy',
      country: 'Malaysia',
      field: 'Design & Creative',
      duration: '2.5 years',
      intake: 'January, June, September',
      tuitionFee: '$11,200 per year',
      applicationDeadline: '2024-03-30',
      requirements: 'High School Diploma, Portfolio, IELTS 5.5',
      scholarshipAvailable: true,
      scholarshipAmount: 'Up to 50% tuition',
      status: 'active',
      studentsEnrolled: 41,
      accreditation: 'MQA Accredited',
      campus: 'Sunway Campus',
      language: 'English',
    },
    {
      id: 6,
      programName: 'Diploma in Mechanical Engineering',
      university: 'UCSI University',
      country: 'Malaysia',
      field: 'Engineering',
      duration: '3 years',
      intake: 'February, September',
      tuitionFee: '$12,800 per year',
      applicationDeadline: '2024-01-31',
      requirements: 'High School Diploma, Math & Science, IELTS 5.5',
      scholarshipAvailable: true,
      scholarshipAmount: 'Up to 25% tuition',
      status: 'active',
      studentsEnrolled: 29,
      accreditation: 'MQA Accredited',
      campus: 'Kuala Lumpur Campus',
      language: 'English',
    },
    {
      id: 7,
      programName: 'Diploma in Early Childhood Education',
      university: 'SEGi University',
      country: 'Malaysia',
      field: 'Education',
      duration: '2 years',
      intake: 'January, May, September',
      tuitionFee: '$6,500 per year',
      applicationDeadline: '2024-04-15',
      requirements: 'High School Diploma, IELTS 5.5',
      scholarshipAvailable: false,
      scholarshipAmount: 'Not available',
      status: 'active',
      studentsEnrolled: 33,
      accreditation: 'MQA Accredited',
      campus: 'Kota Damansara',
      language: 'English',
    },
    {
      id: 8,
      programName: 'Diploma in Hotel Management',
      university: 'Berjaya University College',
      country: 'Malaysia',
      field: 'Hospitality & Tourism',
      duration: '2 years',
      intake: 'February, June, October',
      tuitionFee: '$9,800 per year',
      applicationDeadline: '2024-03-01',
      requirements: 'High School Diploma, IELTS 5.5',
      scholarshipAvailable: true,
      scholarshipAmount: 'Up to 40% tuition',
      status: 'pending',
      studentsEnrolled: 27,
      accreditation: 'MQA Accredited',
      campus: 'Kuala Lumpur',
      language: 'English',
    },
  ];

  // Filter programs based on search and filters
  const filteredPrograms = diplomaPrograms.filter(program => {
    const matchesSearch =
      program.programName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.field.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry =
      countryFilter === 'all' || program.country === countryFilter;
    const matchesDuration =
      durationFilter === 'all' || program.duration === durationFilter;
    const matchesField = fieldFilter === 'all' || program.field === fieldFilter;

    return matchesSearch && matchesCountry && matchesDuration && matchesField;
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

  const getFieldColor = field => {
    switch (field) {
      case 'Hospitality & Tourism':
        return 'bg-blue-100 text-blue-800';
      case 'Business':
        return 'bg-purple-100 text-purple-800';
      case 'Computer Science':
        return 'bg-orange-100 text-orange-800';
      case 'Culinary Arts':
        return 'bg-red-100 text-red-800';
      case 'Design & Creative':
        return 'bg-pink-100 text-pink-800';
      case 'Engineering':
        return 'bg-indigo-100 text-indigo-800';
      case 'Education':
        return 'bg-teal-100 text-teal-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getScholarshipColor = available => {
    return available
      ? 'bg-green-100 text-green-800'
      : 'bg-gray-100 text-gray-800';
  };

  const countries = [...new Set(diplomaPrograms.map(p => p.country))];
  const durations = [...new Set(diplomaPrograms.map(p => p.duration))];
  const fields = [...new Set(diplomaPrograms.map(p => p.field))];

  return (
    <div className="min-h-screen py-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Phd Programs
              </h1>
              <p className="text-gray-600">
                Explore comprehensive Phd programs for international students
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-50 transition duration-200 flex items-center space-x-2">
                <span>📊</span>
                <span>Program Analytics</span>
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition duration-200 flex items-center space-x-2">
                <span>+</span>
                <span>Add Program</span>
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
                  Total Programs
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {diplomaPrograms.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎓</span>
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600 font-medium">
              +3 new programs
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Active Students
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {diplomaPrograms.reduce(
                    (sum, p) => sum + p.studentsEnrolled,
                    0
                  )}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600 font-medium">
              +15 this month
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Scholarship Programs
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {diplomaPrograms.filter(p => p.scholarshipAvailable).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600 font-medium">
              75% with scholarships
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Success Rate
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">96%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600 font-medium">
              +4% improvement
            </div>
          </div>
        </div>

        {/* Field Distribution */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Programs by Field of Study
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {fields.map(field => {
              const count = diplomaPrograms.filter(
                p => p.field === field
              ).length;
              const percentage = (count / diplomaPrograms.length) * 100;
              return (
                <div
                  key={field}
                  className="text-center p-4 bg-gray-50 rounded-xl"
                >
                  <div className="text-2xl font-bold text-blue-600">
                    {count}
                  </div>
                  <div className="text-sm text-gray-600">{field}</div>
                  <div className="text-xs text-gray-400">
                    {percentage.toFixed(1)}% of total
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
                  placeholder="Search programs by name, university, or field..."
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
              <select
                value={durationFilter}
                onChange={e => setDurationFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              >
                <option value="all">All Durations</option>
                {durations.map(duration => (
                  <option key={duration} value={duration}>
                    {duration}
                  </option>
                ))}
              </select>
              <select
                value={fieldFilter}
                onChange={e => setFieldFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              >
                <option value="all">All Fields</option>
                {fields.map(field => (
                  <option key={field} value={field}>
                    {field}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Programs Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Program Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    University & Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Program Info
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fees & Scholarship
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
                {filteredPrograms.map(program => (
                  <tr
                    key={program.id}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                          <span className="text-lg font-semibold text-blue-600">
                            {program.programName
                              .split(' ')
                              .map(n => n[0])
                              .join('')
                              .substring(0, 2)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-gray-900">
                            {program.programName}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getFieldColor(
                                program.field
                              )}`}
                            >
                              {program.field}
                            </span>
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {program.accreditation}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {program.university}
                      </div>
                      <div className="text-sm text-gray-500">
                        {program.country}
                      </div>
                      <div className="text-xs text-gray-400">
                        {program.campus}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-900">
                          <span className="font-medium">Duration:</span>{' '}
                          {program.duration}
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Intake:</span>{' '}
                          {program.intake}
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Language:</span>{' '}
                          {program.language}
                        </div>
                        <div className="text-xs text-gray-500">
                          <span className="font-medium">Deadline:</span>{' '}
                          {program.applicationDeadline}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className="text-sm font-semibold text-gray-900">
                          {program.tuitionFee}
                        </div>
                        <div>
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getScholarshipColor(
                              program.scholarshipAvailable
                            )}`}
                          >
                            {program.scholarshipAvailable
                              ? `Scholarship: ${program.scholarshipAmount}`
                              : 'No Scholarship'}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Students: {program.studentsEnrolled}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          program.status
                        )}`}
                      >
                        {program.status.charAt(0).toUpperCase() +
                          program.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded hover:bg-blue-50 transition duration-150">
                          View
                        </button>
                        <button className="text-green-600 hover:text-green-900 px-2 py-1 rounded hover:bg-green-50 transition duration-150">
                          Apply
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
          {filteredPrograms.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎓</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No diploma programs found
              </h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search or filters
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setCountryFilter('all');
                  setDurationFilter('all');
                  setFieldFilter('all');
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
              <div className="text-2xl font-bold text-gray-900">8+</div>
              <div className="text-gray-500 text-sm">Study Fields</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">100%</div>
              <div className="text-gray-500 text-sm">Accredited Programs</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">6</div>
              <div className="text-gray-500 text-sm">Partner Universities</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">24/7</div>
              <div className="text-gray-500 text-sm">Admission Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhdProgramsPage;
