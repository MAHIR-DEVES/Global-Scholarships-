'use client';
import { getAllScholarships } from '@/lib/scholarshipApi';
import React, { useState, useEffect } from 'react';

const ScholarshipsPage = () => {
  const [scholarships, setScholarships] = useState([]);
  const [filters, setFilters] = useState({
    country: [],
    level: [],
  });

  const countries = ['China', 'Malaysia', 'USA', 'UK', 'Canada', 'Australia'];
  const levels = ['Diploma', 'Bachelor', 'Master', 'PhD'];

  // Fetch Scholarships
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllScholarships(filters);
        setScholarships(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [filters]);

  // Handle checkbox change
  const handleCheckboxChange = e => {
    const { name, value, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: checked
        ? [...prev[name], value]
        : prev[name].filter(item => item !== value),
    }));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      country: [],
      level: [],
    });
  };

  return (
    <div className="max-w-7xl mx-auto  min-h-screen py-5">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left Sidebar */}
        <aside className="w-full min-h-screen lg:w-1/4 bg-white rounded-xs shadow-lg p-6 h-fit sticky top-20">
          <div className="border-b border-gray-200 pb-4 mb-6">
            <h2 className="text-xl font-bold text-gray-800">Filters</h2>
            <p className="text-sm text-gray-500 mt-1">
              Find your perfect scholarship
            </p>

            <p className="text-gray-600 ">
              {scholarships.length} scholarships found
            </p>
          </div>

          {/* Country Filter */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Country
            </label>
            <div className="space-y-3">
              {countries.map(country => (
                <div key={country} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`country-${country}`}
                    name="country"
                    value={country}
                    checked={filters.country.includes(country)}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label
                    htmlFor={`country-${country}`}
                    className="ml-3 text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    {country}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Level Filter */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Study Level
            </label>
            <div className="space-y-3">
              {levels.map(level => (
                <div key={level} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`level-${level}`}
                    name="level"
                    value={level}
                    checked={filters.level.includes(level)}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label
                    htmlFor={`level-${level}`}
                    className="ml-3 text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    {level}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Filters Display */}
          {(filters.country.length > 0 || filters.level.length > 0) && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Active Filters:
              </h3>
              <div className="flex flex-wrap gap-2">
                {filters.country.map(country => (
                  <span
                    key={country}
                    className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {country}
                  </span>
                ))}
                {filters.level.map(level => (
                  <span
                    key={level}
                    className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                  >
                    {level}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Reset Button */}
          <button
            onClick={clearAllFilters}
            className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
          >
            Reset All Filters
          </button>
        </aside>

        {/* Right Side: Scholarship List */}
        <main className="w-full lg:w-3/4 space-y-3">
          {scholarships.length === 0 ? (
            <div className="bg-white rounded-xs shadow-lg p-12 text-center">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                No scholarships found
              </h3>
              <p className="text-gray-500">
                Try adjusting your filters to see more results
              </p>
            </div>
          ) : (
            scholarships.map(sch => (
              <div
                key={sch._id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-100"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* University Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="flex-shrink-0">
                      <img
                        src={sch.universityLogo}
                        alt={sch.universityName}
                        className="w-16 h-16 rounded-lg object-cover border border-gray-200 shadow-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        {sch.universityName}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-200">
                          {sch.level}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-200">
                          {sch.country}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium border border-purple-200">
                          Rank #{sch.worldRanking}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-gray-600 text-sm">
                          📅 Deadline:{' '}
                          <span className="font-semibold text-gray-800">
                            {sch.applicationDeadline}
                          </span>
                        </p>
                        {sch.scholarshipAmount && (
                          <p className="text-sm text-amber-600 font-semibold">
                            💰 {sch.scholarshipAmount}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons - Vertical Stack */}
                  <div className="flex flex-col gap-3 min-w-[180px]">
                    <button className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg text-sm">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      View Details
                    </button>

                    <a
                      href={sch.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-all duration-200 shadow-md hover:shadow-lg text-sm"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      Visit Website
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </main>
      </div>
    </div>
  );
};

export default ScholarshipsPage;
