'use client';
import React, { useState } from 'react';

const UniversitiesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState('all');
  const [programFilter, setProgramFilter] = useState('all');

  // Sample universities data
  const universities = [
    {
      id: 1,
      name: 'Tsinghua University',
      country: 'China',
      logo: '🎓',
      programs: ['Bachelor', 'Master', 'PhD'],
      students: 1250,
      scholarships: 45,
      ranking: 'World #16',
      contact: 'admissions@tsinghua.edu.cn',
      website: 'www.tsinghua.edu.cn',
      status: 'active',
      partnership: 'Premium',
    },
    {
      id: 2,
      name: 'University of Malaya',
      country: 'Malaysia',
      logo: '🏛️',
      programs: ['Bachelor', 'Master', 'Diploma'],
      students: 890,
      scholarships: 32,
      ranking: 'World #65',
      contact: 'international@um.edu.my',
      website: 'www.um.edu.my',
      status: 'active',
      partnership: 'Standard',
    },
    {
      id: 3,
      name: 'Peking University',
      country: 'China',
      logo: '🎯',
      programs: ['Bachelor', 'Master', 'PhD'],
      students: 1100,
      scholarships: 38,
      ranking: 'World #23',
      contact: 'admissions@pku.edu.cn',
      website: 'www.pku.edu.cn',
      status: 'active',
      partnership: 'Premium',
    },
    {
      id: 4,
      name: 'Universiti Putra Malaysia',
      country: 'Malaysia',
      logo: '🌾',
      programs: ['Bachelor', 'Master', 'PhD'],
      students: 720,
      scholarships: 28,
      ranking: 'World #132',
      contact: 'admission@upm.edu.my',
      website: 'www.upm.edu.my',
      status: 'pending',
      partnership: 'Standard',
    },
    {
      id: 5,
      name: 'Zhejiang University',
      country: 'China',
      logo: '🌊',
      programs: ['Bachelor', 'Master'],
      students: 950,
      scholarships: 41,
      ranking: 'World #45',
      contact: 'iso@zju.edu.cn',
      website: 'www.zju.edu.cn',
      status: 'active',
      partnership: 'Premium',
    },
    {
      id: 6,
      name: "Taylor's University",
      country: 'Malaysia',
      logo: '🎯',
      programs: ['Bachelor', 'Diploma'],
      students: 680,
      scholarships: 25,
      ranking: 'World #284',
      contact: 'enquiries@taylors.edu.my',
      website: 'www.taylors.edu.my',
      status: 'active',
      partnership: 'Standard',
    },
    {
      id: 7,
      name: 'Fudan University',
      country: 'China',
      logo: '📚',
      programs: ['Bachelor', 'Master', 'PhD'],
      students: 1050,
      scholarships: 36,
      ranking: 'World #34',
      contact: 'fso@fudan.edu.cn',
      website: 'www.fudan.edu.cn',
      status: 'active',
      partnership: 'Premium',
    },
    {
      id: 8,
      name: 'Universiti Sains Malaysia',
      country: 'Malaysia',
      logo: '🔬',
      programs: ['Bachelor', 'Master'],
      students: 610,
      scholarships: 22,
      ranking: 'World #142',
      contact: 'registry@usm.my',
      website: 'www.usm.my',
      status: 'inactive',
      partnership: 'Basic',
    },
  ];

  // Filter universities based on search and filters
  const filteredUniversities = universities.filter(university => {
    const matchesSearch =
      university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      university.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry =
      countryFilter === 'all' || university.country === countryFilter;
    const matchesProgram =
      programFilter === 'all' || university.programs.includes(programFilter);

    return matchesSearch && matchesCountry && matchesProgram;
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

  const getPartnershipColor = partnership => {
    switch (partnership) {
      case 'Premium':
        return 'bg-purple-100 text-purple-800';
      case 'Standard':
        return 'bg-blue-100 text-blue-800';
      case 'Basic':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const countries = [...new Set(universities.map(u => u.country))];
  const programs = ['Bachelor', 'Master', 'PhD', 'Diploma'];

  return (
    <div className="min-h-screen py-6">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                University Partnerships
              </h1>
              <p className="text-gray-600">
                Manage partner universities and their scholarship programs
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-50 transition duration-200 flex items-center space-x-2">
                <span>📊</span>
                <span>Analytics</span>
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition duration-200 flex items-center space-x-2">
                <span>+</span>
                <span>Add University</span>
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
                  Total Universities
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {universities.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🏛️</span>
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600 font-medium">
              +3 this month
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Active Students
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">6,250</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600 font-medium">
              +12% growth
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Scholarships
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">287</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600 font-medium">
              +15 new offers
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Success Rate
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">94%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600 font-medium">
              +2% improvement
            </div>
          </div>
        </div>

        {/* Country Distribution */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            University Distribution by Country
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {countries.map(country => {
              const count = universities.filter(
                u => u.country === country
              ).length;
              return (
                <div
                  key={country}
                  className="text-center p-4 bg-gray-50 rounded-xl"
                >
                  <div className="text-2xl font-bold text-blue-600">
                    {count}
                  </div>
                  <div className="text-sm text-gray-600">{country}</div>
                  <div className="text-xs text-gray-400">
                    {Math.round((count / universities.length) * 100)}% of total
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
                  placeholder="Search universities by name or country..."
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
                value={programFilter}
                onChange={e => setProgramFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              >
                <option value="all">All Programs</option>
                {programs.map(program => (
                  <option key={program} value={program}>
                    {program}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Universities Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    University
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Country
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Programs
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Students
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Scholarships
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ranking
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Partnership
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUniversities.map(university => (
                  <tr
                    key={university.id}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                          <span className="text-lg">{university.logo}</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {university.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {university.website}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {university.country}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {university.programs.map((program, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg"
                          >
                            {program}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {university.students.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-green-600">
                        {university.scholarships}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {university.ranking}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          university.status
                        )}`}
                      >
                        {university.status.charAt(0).toUpperCase() +
                          university.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPartnershipColor(
                          university.partnership
                        )}`}
                      >
                        {university.partnership}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          View
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
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
          {filteredUniversities.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏛️</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No universities found
              </h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search or filters
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setCountryFilter('all');
                  setProgramFilter('all');
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
              <div className="text-2xl font-bold text-gray-900">12</div>
              <div className="text-gray-500 text-sm">Countries Covered</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">$5.2M</div>
              <div className="text-gray-500 text-sm">
                Total Scholarship Value
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">98%</div>
              <div className="text-gray-500 text-sm">Partner Satisfaction</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">24/7</div>
              <div className="text-gray-500 text-sm">Partner Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversitiesPage;
