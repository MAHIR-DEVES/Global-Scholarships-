'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const Bachelors = () => {
  const bachelorsScholarships = [
    {
      id: 1,
      university: 'University of Malaya',
      logo: 'https://en.your-uni.com/assets/images/university/universiti-malaya-um.png',
      country: 'Malaysia',
      program: 'Bachelor of Business Administration',
      scholarship: '60%',
      duration: '3 years',
      deadline: '2024-08-15',
      requirements: 'Minimum 3.2 GPA, IELTS 6.0',
      rating: 4.8,
      students: 350,
      degree: 'BBA',
    },
    {
      id: 2,
      university: 'Tsinghua University',
      logo: 'https://i.pinimg.com/736x/f5/0d/e7/f50de799b3e705d770d11ec87e411a2f.jpg',
      country: 'China',
      program: 'Bachelor of Computer Science',
      scholarship: '70%',
      duration: '4 years',
      deadline: '2024-09-01',
      requirements: 'Minimum 3.5 GPA, IELTS 6.5',
      rating: 4.9,
      students: 280,
      degree: 'BSc',
    },
    {
      id: 3,
      university: 'Universiti Putra Malaysia',
      logo: 'https://logodix.com/logo/1959380.png',
      country: 'Malaysia',
      program: 'Bachelor of Engineering',
      scholarship: '50%',
      duration: '4 years',
      deadline: '2024-07-20',
      requirements: 'Minimum 3.3 GPA, IELTS 6.0',
      rating: 4.7,
      students: 420,
      degree: 'BE',
    },
    {
      id: 4,
      university: 'Peking University',
      logo: 'https://english.pku.edu.cn/Uploads/Bden/Picture/2021/04/27/s6087dd6901d02.png',
      country: 'China',
      program: 'Bachelor of International Relations',
      scholarship: '75%',
      duration: '4 years',
      deadline: '2024-08-30',
      requirements: 'Minimum 3.6 GPA, IELTS 6.5',
      rating: 4.9,
      students: 180,
      degree: 'BA',
    },
    {
      id: 5,
      university: 'Zhejiang University',
      logo: 'https://www.zju.edu.cn/_upload/article/images/b3/3e/4d14d4c54f638bfeac3d775ce621/fffe781e-e322-42e4-bf42-7704b32a2e7a.png',
      country: 'China',
      program: 'Bachelor of Medicine',
      scholarship: '65%',
      duration: '5 years',
      deadline: '2024-09-15',
      requirements: 'Minimum 3.7 GPA, IELTS 7.0',
      rating: 4.8,
      students: 150,
      degree: 'MBBS',
    },
    {
      id: 6,
      university: 'Universiti Sains Malaysia',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlYK7pcQAFNCd1I32McFtIGaCISuvHKJXnjQ&s',
      country: 'Malaysia',
      program: 'Bachelor of Pharmacy',
      scholarship: '55%',
      duration: '4 years',
      deadline: '2024-08-25',
      requirements: 'Minimum 3.4 GPA, IELTS 6.0',
      rating: 4.6,
      students: 200,
      degree: 'BPharm',
    },
    {
      id: 7,
      university: 'Fudan University',
      logo: 'https://careers.aapt.org/getasset/660df083-246d-4b11-87c8-7d55b1e6347b/',
      country: 'China',
      program: 'Bachelor of Economics',
      scholarship: '70%',
      duration: '3 years',
      deadline: '2024-09-10',
      requirements: 'Minimum 3.5 GPA, IELTS 6.5',
      rating: 4.8,
      students: 220,
      degree: 'BEC',
    },
    {
      id: 8,
      university: 'Universiti Teknologi Malaysia',
      logo: 'https://civilexer.wordpress.com/wp-content/uploads/2011/03/utm-ibs.png?w=584',
      country: 'Malaysia',
      program: 'Bachelor of Architecture',
      scholarship: '60%',
      duration: '5 years',
      deadline: '2024-08-18',
      requirements: 'Minimum 3.3 GPA, IELTS 6.0, Portfolio',
      rating: 4.7,
      students: 120,
      degree: 'BArch',
    },
    {
      id: 9,
      university: 'Shanghai Jiao Tong University',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2mYVcxqmWMX50EAT3YKYqyshKWuWSFz3fBA&s',
      country: 'China',
      program: 'Bachelor of Mechanical Engineering',
      scholarship: '68%',
      duration: '4 years',
      deadline: '2024-09-05',
      requirements: 'Minimum 3.4 GPA, IELTS 6.0',
      rating: 4.7,
      students: 300,
      degree: 'BEng',
    },
  ];

  const [showAll, setShowAll] = useState(false);

  const visibleScholarships = showAll
    ? bachelorsScholarships
    : bachelorsScholarships.slice(0, 3);

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
              key={scholarship.id}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Scholarship Badge */}
              <div className="relative">
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 py-2 rounded-full shadow-lg z-10">
                  <span className="font-bold text-lg">
                    {scholarship.scholarship} Scholarship
                  </span>
                </div>

                {/* University Header */}
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

              {/* Program Details */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-800 text-lg">
                    {scholarship.program}
                  </h4>
                  <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">
                    {scholarship.degree}
                  </span>
                </div>

                {/* Key Information */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">
                      {scholarship.duration}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Application Deadline:</span>
                    <span className="font-semibold text-red-600">
                      {scholarship.deadline}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Current Students:</span>
                    <span className="font-semibold">
                      {scholarship.students}+ enrolled
                    </span>
                  </div>
                </div>

                {/* Requirements */}
                <div className="bg-cyan-50 rounded-lg p-3 mb-4">
                  <h5 className="font-semibold text-cyan-800 text-sm mb-1">
                    Requirements:
                  </h5>
                  <p className="text-cyan-700 text-xs">
                    {scholarship.requirements}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                    Apply Now
                  </button>
                  <button className="px-4 py-2 border border-gray-300 hover:border-green-600 text-gray-700 hover:text-green-600 rounded-lg transition duration-300">
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
