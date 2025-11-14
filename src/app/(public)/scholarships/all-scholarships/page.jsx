'use client';
import { getAllScholarships } from '@/lib/scholarshipApi';
import React, { useState, useEffect } from 'react';

const ScholarshipsPage = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    country: [],
    level: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 6;

  const countries = ['China', 'Malaysia', 'USA', 'UK', 'Canada', 'Australia'];
  const levels = ['Diploma', 'Bachelor', 'Master', 'PhD'];

  // Fetch Scholarships from backend with filters & pagination
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const query = {
          ...filters,
          page: currentPage,
          limit: pageSize,
        };
        const data = await getAllScholarships(query);
        setScholarships(data.data || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error('Error fetching scholarships:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters, currentPage]);

  // Handle checkbox change
  const handleCheckboxChange = e => {
    const { name, value, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: checked
        ? [...prev[name], value]
        : prev[name].filter(item => item !== value),
    }));
    setCurrentPage(1); // reset to page 1 on filter change
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      country: [],
      level: [],
    });
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading scholarships...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto min-h-screen py-5 px-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar */}
        <aside className="w-full lg:w-1/4 bg-white rounded-xl shadow-lg p-6 sticky top-20 h-fit">
          <h2 className="text-xl font-bold mb-2">Filters</h2>
          <p className="text-gray-500 mb-4">Find your perfect scholarship</p>
          <p className="text-gray-600 mb-4">
            {scholarships.length} scholarships found
          </p>

          {/* Country Filter */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">Country</label>
            <div className="space-y-2">
              {countries.map(country => (
                <div key={country} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`country-${country}`}
                    name="country"
                    value={country}
                    checked={filters.country.includes(country)}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`country-${country}`}
                    className="ml-2 text-sm cursor-pointer"
                  >
                    {country}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Level Filter */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">Study Level</label>
            <div className="space-y-2">
              {levels.map(level => (
                <div key={level} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`level-${level}`}
                    name="level"
                    value={level}
                    checked={filters.level.includes(level)}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`level-${level}`}
                    className="ml-2 text-sm cursor-pointer"
                  >
                    {level}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={clearAllFilters}
            className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 rounded-xl font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-200"
          >
            Reset All Filters
          </button>
        </aside>

        {/* Right Side: Scholarships List */}
        <main className="w-full lg:w-3/4 space-y-4">
          {scholarships.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <p className="text-gray-500">
                No scholarships found. Try adjusting filters.
              </p>
            </div>
          ) : (
            scholarships.map(sch => (
              <div
                key={sch._id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <img
                      src={sch.universityLogo}
                      alt={sch.universityName}
                      className="w-20 h-20 rounded-xl object-cover border border-gray-200"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold">
                        {sch.universityName}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200">
                          {sch.level}
                        </span>
                        <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full border border-green-200">
                          {sch.country}
                        </span>
                        {sch.worldRanking && (
                          <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full border border-purple-200">
                            Rank: #{sch.worldRanking}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Deadline:{' '}
                        <span className="font-semibold">
                          {sch.applicationDeadline}
                        </span>
                      </p>
                      {sch.scholarshipAmount && (
                        <p className="text-sm text-amber-600 font-semibold">
                          🎓 Scholarship: {sch.scholarshipAmount}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      View
                    </button>
                    <a
                      href={sch.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                    >
                      Visit
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Pagination */}
          <div className="flex justify-end items-center mt-12 gap-3">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-blue-600 hover:bg-blue-50 hover:shadow-md border border-gray-200 hover:border-blue-300'
              }`}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${
                  currentPage === i + 1
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage(prev => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-blue-600 hover:bg-blue-50 hover:shadow-md border border-gray-200 hover:border-blue-300'
              }`}
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ScholarshipsPage;
