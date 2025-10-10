'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const Diploma = () => {
  const [scholarships, setScholarships] = useState(null);
  const diplomaScholarships = [
    {
      id: 1,
      university: 'University of Malaya',
      logo: 'https://en.your-uni.com/assets/images/university/universiti-malaya-um.png',
      country: 'Malaysia',
      program: 'Diploma in Business Administration',
      scholarship: '50%',
      duration: '2 years',
      deadline: '2024-08-15',
      requirements: 'Minimum 3.0 GPA, IELTS 5.5',
      rating: 4.8,
      students: 250,
    },
    {
      id: 2,
      university: 'Taylors University',
      logo: 'https://vectorseek.com/wp-content/uploads/2023/08/Taylors-University-Logo-Vector.svg-.png',
      country: 'Malaysia',
      program: 'Diploma in Computer Science',
      scholarship: '60%',
      duration: '2.5 years',
      deadline: '2024-09-01',
      requirements: 'Minimum 3.2 GPA, IELTS 6.0',
      rating: 4.9,
      students: 180,
    },
    {
      id: 3,
      university: 'Universiti Putra Malaysia',
      logo: 'https://logodix.com/logo/1959380.png',
      country: 'Malaysia',
      program: 'Diploma in Engineering',
      scholarship: '40%',
      duration: '2 years',
      deadline: '2024-07-20',
      requirements: 'Minimum 3.0 GPA, IELTS 5.5',
      rating: 4.7,
      students: 320,
    },
    {
      id: 4,
      university: 'Beijing Normal University',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSojWKgTDPzMFta0K9SvPHbcJw7twmVP22eVA&s',
      country: 'China',
      program: 'Diploma in Chinese Language',
      scholarship: '70%',
      duration: '1.5 years',
      deadline: '2024-08-30',
      requirements: 'HSK Level 3, Minimum 2.8 GPA',
      rating: 4.6,
      students: 150,
    },
    {
      id: 5,
      university: 'Zhejiang University',
      logo: 'https://www.zju.edu.cn/_upload/article/images/b3/3e/4d14d4c54f638bfeac3d775ce621/fffe781e-e322-42e4-bf42-7704b32a2e7a.png',
      country: 'China',
      program: 'Diploma in International Trade',
      scholarship: '55%',
      duration: '2 years',
      deadline: '2024-09-15',
      requirements: 'Minimum 3.0 GPA, IELTS 5.5',
      rating: 4.8,
      students: 200,
    },
    {
      id: 6,
      university: 'Universiti Sains Malaysia',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlYK7pcQAFNCd1I32McFtIGaCISuvHKJXnjQ&s',
      country: 'Malaysia',
      program: 'Diploma in Hospitality Management',
      scholarship: '45%',
      duration: '2 years',
      deadline: '2024-08-25',
      requirements: 'Minimum 2.8 GPA, IELTS 5.0',
      rating: 4.5,
      students: 280,
    },
    {
      id: 7,
      university: 'Fudan University',
      logo: 'https://careers.aapt.org/getasset/660df083-246d-4b11-87c8-7d55b1e6347b/',
      country: 'China',
      program: 'Diploma in International Relations',
      scholarship: '65%',
      duration: '2 years',
      deadline: '2024-09-10',
      requirements: 'Minimum 3.2 GPA, IELTS 6.0',
      rating: 4.9,
      students: 120,
    },
    {
      id: 8,
      university: 'Universiti Teknologi Malaysia',
      logo: 'https://civilexer.wordpress.com/wp-content/uploads/2011/03/utm-ibs.png?w=584',
      country: 'Malaysia',
      program: 'Diploma in Information Technology',
      scholarship: '50%',
      duration: '2.5 years',
      deadline: '2024-08-18',
      requirements: 'Minimum 3.0 GPA, IELTS 5.5',
      rating: 4.7,
      students: 220,
    },
  ];
  console.log(scholarships);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/scholarships');
        if (!res.ok) {
          throw new Error('Failed to fetch scholarships');
        }
        const data = await res.json();
        setScholarships(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchScholarships();
  }, []);
  const [showAll, setShowAll] = useState(false);

  const visibleScholarships = showAll
    ? diplomaScholarships
    : diplomaScholarships.slice(0, 3);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleScholarships.map(scholarship => (
            <div
              key={scholarship.id}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative">
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-2 rounded-full shadow-lg z-10">
                  <span className="font-bold text-lg">
                    {scholarship.scholarship} Scholarship
                  </span>
                </div>
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 relative bg-gray-100 rounded-xl p-2">
                      <Image
                        src={scholarship.logo}
                        alt={scholarship.university}
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg">
                        {scholarship.university}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-gray-500">
                          {scholarship.country}
                        </span>
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm text-gray-600">
                          {scholarship.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h4 className="font-semibold text-gray-800 text-lg mb-2">
                  {scholarship.program}
                </h4>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">
                      {scholarship.duration}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Deadline:</span>
                    <span className="font-semibold text-red-600">
                      {scholarship.deadline}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Students:</span>
                    <span className="font-semibold">
                      {scholarship.students}+ enrolled
                    </span>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <h5 className="font-semibold text-blue-800 text-sm mb-1">
                    Requirements:
                  </h5>
                  <p className="text-blue-700 text-xs">
                    {scholarship.requirements}
                  </p>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                    Apply Now
                  </button>
                  <button className="px-4 py-2 border border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 rounded-lg transition duration-300">
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
