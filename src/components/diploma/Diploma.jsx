'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getAllScholarships } from '@/lib/scholarshipApi';
import Link from 'next/link';

const Diploma = () => {
  const [diplomas, setDiplomas] = useState([]);

  useEffect(() => {
    const fetchDiploma = async () => {
      try {
        const data = await getAllScholarships({ level: 'diploma' });
        setDiplomas(data.data);
      } catch (error) {
        console.error('Error fetching diploma scholarships:', error);
      }
    };

    fetchDiploma();
  }, []);

  const [showAll, setShowAll] = useState(false);

  const visibleScholarships = showAll ? diplomas : diplomas.slice(0, 3);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Diploma Programs with Scholarships
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover exclusive scholarship opportunities for diploma programs at
            top universities in China and Malaysia. Start your international
            education journey today.
          </p>
        </div>

        {/* Scholarship Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleScholarships.map(sch => (
            <div
              key={sch._id}
              className="bg-white/80 backdrop-blur-xl rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_10px_40px_rgb(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              {/* ---------- Top Badge ---------- */}
              <div className="relative">
                <div className="absolute -top-5 right-4 bg-gradient-to-r from-blue-600 to-cyan-400 text-white px-5 py-2 rounded-full shadow-lg">
                  <span className="font-bold text-base uppercase tracking-wide">
                    {sch.level} Scholarship
                  </span>
                </div>

                {/* ---------- University Section ---------- */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 relative rounded-xl overflow-hidden bg-gray-100 shadow-inner">
                      <Image
                        src={
                          sch.universityLogo &&
                          sch.universityLogo.startsWith('http')
                            ? sch.universityLogo
                            : '/fallback.png'
                        }
                        alt={sch.universityName || 'University Logo'}
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900 text-xl leading-tight">
                        {sch.universityName}
                      </h3>

                      <div className="flex items-center gap-2 mt-1 text-sm">
                        <span className="text-gray-500">{sch.country}</span>
                        <span className="text-yellow-500">★</span>
                        <span className="text-gray-700">
                          {sch.worldRanking}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ---------- Program Info ---------- */}
              <div className="p-6">
                <h4 className="font-semibold text-gray-900 text-lg mb-2">
                  {sch.majors?.[0]}
                </h4>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">{sch.duration} Years</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Start Date:</span>
                    <span className="font-semibold">
                      {sch.applicationStartDate}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Deadline:</span>
                    <span className="font-semibold text-red-600">
                      {sch.applicationDeadline}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Tuition Fee:</span>
                    <span className="font-semibold">{sch.tuitionFee} USD</span>
                  </div>
                </div>

                {/* ---------- Requirements Box ---------- */}
                <div className="mt-5 bg-blue-50/60 border border-blue-100 rounded-xl p-4 flex gap-2 items-center">
                  <h5 className="font-semibold text-blue-800 mb-1">
                    language Requirement
                  </h5>
                  <p className="text-blue-700 text-sm leading-relaxed">
                    {sch.languageRequirement}
                  </p>
                </div>

                {/* ---------- Buttons ---------- */}
                <div className="flex gap-4 mt-6">
                  {/* Apply Now */}
                  <Link href={sch.website} target="_blank" className="flex-1">
                    <div className="w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold py-2.5 rounded-xl transition-all cursor-pointer">
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

        {/* See All / Show Less Button */}
        <div className="text-center mt-10">
          {showAll ? (
            <button
              onClick={() => setShowAll(false)}
              className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105"
            >
              Show Less
            </button>
          ) : (
            <button
              onClick={() => setShowAll(true)}
              className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105"
            >
              See All Programs
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Diploma;
