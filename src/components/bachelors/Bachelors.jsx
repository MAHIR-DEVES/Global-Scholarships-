'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getAllScholarships } from '@/lib/scholarshipApi';
import Link from 'next/link';

const Bachelors = () => {
  const [bachelors, setBachelors] = useState([]);

  useEffect(() => {
    const fetchBachelors = async () => {
      try {
        const data = await getAllScholarships({ level: 'Bachelor' });
        setBachelors(data.data);
      } catch (error) {
        console.error('Error fetching diploma scholarships:', error);
      }
    };

    fetchBachelors();
  }, []);

  const [showAll, setShowAll] = useState(false);

  const visibleScholarships = showAll ? bachelors : bachelors.slice(0, 3);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Bachelor's Programs with Scholarships
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pursue your undergraduate degree with substantial scholarship
            support at prestigious universities in China and Malaysia. Transform
            your future with world-class education.
          </p>
        </div>

        {/* Scholarship Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {visibleScholarships.map(scholarship => (
            <div
              key={scholarship._id}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Scholarship Badge */}
              <div className="relative">
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 py-2 rounded-full shadow-lg z-10">
                  <span className="font-bold text-lg">
                    {scholarship.level} Program
                  </span>
                </div>

                {/* University Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 relative bg-gray-100 rounded-xl p-2">
                      <Image
                        src={
                          scholarship.universityLogo &&
                          scholarship.universityLogo.startsWith('http')
                            ? scholarship.universityLogo
                            : '/fallback.png'
                        }
                        alt={scholarship.universityName || 'University Logo'}
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg">
                        {scholarship.universityName}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-gray-500">
                          {scholarship.country}
                        </span>
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm text-gray-600">
                          {scholarship.worldRanking}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Program Details */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-800 text-lg">
                    {scholarship.majors?.[0] || 'Major Not Provided'}
                  </h4>

                  <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">
                    {scholarship.level}
                  </span>
                </div>

                {/* Key Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">
                      {scholarship.duration} Years
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Application Deadline:</span>
                    <span className="font-semibold text-red-600">
                      {scholarship.applicationDeadline}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tuition Fee:</span>
                    <span className="font-semibold text-green-700">
                      ${scholarship.tuitionFee}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-cyan-50 rounded-lg p-3 mb-4">
                  <h5 className="font-semibold text-cyan-800 text-sm mb-1">
                    Description:
                  </h5>
                  <p className="text-cyan-700 text-xs">
                    {scholarship.description}
                  </p>
                </div>

                <div className="flex gap-4 mt-6">
                  {/* Apply Now */}
                  <Link
                    href={scholarship.website}
                    target="_blank"
                    className="flex-1"
                  >
                    <div className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-center font-semibold py-2.5 rounded-xl transition-all cursor-pointer">
                      Apply Now
                    </div>
                  </Link>

                  {/* Details Button */}
                  <button className="px-5 py-2.5 border border-gray-400 hover:border-blue-600 text-gray-700 hover:text-blue-600 rounded-xl transition-all">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Toggle Button */}
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition duration-300"
          >
            {showAll ? 'Show Less' : 'See All Programs'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bachelors;
