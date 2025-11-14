'use client';
import { getAllScholarships } from '@/lib/scholarshipApi';
import React, { useEffect, useState } from 'react';

const UpcomingScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(6); // items per page

  // Fetch scholarships from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllScholarships({ page: currentPage, limit });
        setScholarships(data.data);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching scholarships:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage, limit]);

  // Filter scholarships locally
  const filteredScholarships = scholarships.filter(scholarship => {
    const matchesLevel =
      selectedLevel === 'all' || scholarship.level === selectedLevel;
    const matchesSearch =
      scholarship.universityName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      scholarship.country?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship.majors?.some(major =>
        major.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesLevel && matchesSearch;
  });

  const levels = [
    'all',
    ...new Set(scholarships.map(s => s.level).filter(Boolean)),
  ];

  const getDaysUntilDeadline = deadline => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const formatCurrency = amount => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">
            Discovering amazing scholarships...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 md:px-0">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg mb-6">
            <span className="text-2xl">🎓</span>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Upcoming Scholarships
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find your perfect scholarship opportunity from top universities
            around the world. Start your educational journey today!
          </p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                🔍 Search Scholarships
              </label>
              <input
                type="text"
                placeholder="Search by university, country, or major..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                🎯 Study Level
              </label>
              <select
                value={selectedLevel}
                onChange={e => setSelectedLevel(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                {levels.map(level => (
                  <option key={level} value={level}>
                    {level === 'all' ? 'All Levels' : level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Scholarship Cards */}
        {filteredScholarships.length === 0 ? (
          <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
            <div className="text-8xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">
              No scholarships found
            </h3>
            <p className="text-gray-500 text-lg max-w-md mx-auto">
              Try adjusting your search criteria or check back later for new
              opportunities.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredScholarships.map(scholarship => {
              const daysUntilDeadline = getDaysUntilDeadline(
                scholarship.applicationDeadline
              );
              const isUrgent = daysUntilDeadline <= 7 && daysUntilDeadline > 3;
              const isVeryUrgent = daysUntilDeadline <= 3;

              return (
                <div
                  key={scholarship._id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden border border-gray-100"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Left Side - Logo */}
                    <div className="md:w-1/4 p-6 bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center border-r border-gray-200">
                      <div className="w-32 h-32 bg-white rounded-2xl shadow-md p-4 flex items-center justify-center mb-4">
                        <img
                          src={scholarship.universityLogo}
                          alt={scholarship.universityName}
                          className="w-full h-full object-contain"
                          onError={e => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="hidden flex-col items-center justify-center text-gray-600 text-center">
                          <span className="text-4xl mb-2">🏛️</span>
                          <span className="font-bold text-sm">
                            University Logo
                          </span>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 text-center line-clamp-2 mb-2">
                        {scholarship.universityName}
                      </h3>
                      <div className="flex items-center gap-1 text-gray-600 mb-3">
                        <span>📍</span>
                        <span className="text-sm">{scholarship.country}</span>
                      </div>
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {scholarship.level}
                      </div>
                    </div>

                    {/* Right Side - Info */}
                    <div className="md:w-3/4 p-6">
                      <div className="flex flex-col h-full">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">
                              Scholarship Program
                            </h4>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {scholarship.majors?.map((major, idx) => (
                                <span
                                  key={idx}
                                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                                >
                                  {major}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div
                            className={`px-4 py-2 rounded-full text-white font-bold text-sm ${
                              isVeryUrgent
                                ? 'bg-red-500 animate-pulse'
                                : isUrgent
                                ? 'bg-orange-500'
                                : 'bg-green-500'
                            }`}
                          >
                            {daysUntilDeadline <= 0
                              ? 'Closed'
                              : `${daysUntilDeadline} days left`}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <div className="text-center p-4 bg-blue-50 rounded-xl">
                            <div className="text-2xl mb-2">💰</div>
                            <div className="text-sm text-gray-600 font-semibold">
                              Tuition Fee
                            </div>
                            <div className="font-bold text-gray-900 text-lg">
                              {scholarship.tuitionFee
                                ? formatCurrency(scholarship.tuitionFee)
                                : 'Full Scholarship'}
                            </div>
                          </div>
                          <div className="text-center p-4 bg-green-50 rounded-xl">
                            <div className="text-2xl mb-2">⏱️</div>
                            <div className="text-sm text-gray-600 font-semibold">
                              Duration
                            </div>
                            <div className="font-bold text-gray-900 text-lg">
                              {scholarship.duration}{' '}
                              {scholarship.duration === '1' ? 'year' : 'years'}
                            </div>
                          </div>
                          <div className="text-center p-4 bg-purple-50 rounded-xl">
                            <div className="text-2xl mb-2">📚</div>
                            <div className="text-sm text-gray-600 font-semibold">
                              Language
                            </div>
                            <div className="font-bold text-gray-900 text-lg">
                              IELTS{' '}
                              {scholarship.languageRequirement ||
                                'Not specified'}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div>
                            <span className="text-sm font-semibold text-gray-700 block mb-1">
                              🎯 Requirements:
                            </span>
                            <p className="text-sm text-gray-600">
                              {scholarship.description ||
                                'Check official website for details'}
                            </p>
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-gray-700 block mb-1">
                              📅 Application Deadline:
                            </span>
                            <p className="text-sm text-red-600 font-bold">
                              {scholarship.applicationDeadline}
                            </p>
                            {scholarship.worldRanking && (
                              <p className="text-sm text-gray-600 mt-1">
                                World Ranking: #{scholarship.worldRanking}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-auto pt-4 border-t border-gray-200">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>📧</span>
                            <span>
                              {scholarship.contactEmail ||
                                'Contact via website'}
                            </span>
                          </div>
                          <div className="flex gap-3">
                            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold">
                              Apply Now
                            </button>
                            <button className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-300">
                              ❤️ Save
                            </button>
                            <button className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-300">
                              ℹ️ Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-end items-center mt-12 gap-3">
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`
      flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300
      ${
        currentPage === 1
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-white text-blue-600 hover:bg-blue-50 hover:shadow-md border border-gray-200 hover:border-blue-300'
      }
    `}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-2">
            {/* First Page */}
            {currentPage > 3 && (
              <>
                <button
                  onClick={() => setCurrentPage(1)}
                  className="w-10 h-10 rounded-lg font-semibold text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                >
                  1
                </button>
                {currentPage > 4 && (
                  <span className="px-2 text-gray-400">...</span>
                )}
              </>
            )}

            {/* Page Numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              if (pageNum > totalPages || pageNum < 1) return null;

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`
            w-10 h-10 rounded-lg font-semibold transition-all duration-300
            ${
              currentPage === pageNum
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
            }
          `}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Last Page */}
            {currentPage < totalPages - 2 && (
              <>
                {currentPage < totalPages - 3 && (
                  <span className="px-2 text-gray-400">...</span>
                )}
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className="w-10 h-10 rounded-lg font-semibold text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          {/* Next Button */}
          <button
            onClick={() =>
              setCurrentPage(prev => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`
      flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300
      ${
        currentPage === totalPages
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-white text-blue-600 hover:bg-blue-50 hover:shadow-md border border-gray-200 hover:border-blue-300'
      }
    `}
          >
            Next
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingScholarships;
