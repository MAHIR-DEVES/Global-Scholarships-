'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const Masters = () => {
  // Demo data for master's scholarships
  const mastersScholarships = [
    {
      id: 1,
      university: 'University of Malaya',
      logo: 'https://en.your-uni.com/assets/images/university/universiti-malaya-um.png',
      country: 'Malaysia',
      program: 'Master of  Administration (MBA)',
      scholarship: '80%',
      duration: '1.5 years',
      deadline: '2024-08-15',
      requirements:
        'Bachelor Degree, Minimum 3.0 GPA, IELTS 6.5, 2 years work experience',
      rating: 4.9,
      students: 120,
      degree: 'MBA',
    },
    {
      id: 2,
      university: 'Tsinghua University',
      logo: 'https://i.pinimg.com/736x/f5/0d/e7/f50de799b3e705d770d11ec87e411a2f.jpg',
      country: 'China',
      program: 'Master of Computer Science',
      scholarship: '85%',
      duration: '2 years',
      deadline: '2024-09-01',
      requirements:
        'Bachelor in CS, Minimum 3.5 GPA, IELTS 7.0, Research experience',
      rating: 4.9,
      students: 80,
      degree: 'MSc',
    },
    {
      id: 3,
      university: 'Universiti Putra Malaysia',
      logo: 'https://logodix.com/logo/1959380.png',
      country: 'Malaysia',
      program: 'Master of Engineering',
      scholarship: '75%',
      duration: '2 years',
      deadline: '2024-07-20',
      requirements:
        'Bachelor in Engineering, Minimum 3.3 GPA, IELTS 6.5, for Engineering',
      rating: 4.8,
      students: 95,
      degree: 'MEng',
    },
    {
      id: 4,
      university: 'Peking University',
      logo: 'https://english.pku.edu.cn/Uploads/Bden/Picture/2021/04/27/s6087dd6901d02.png',
      country: 'China',
      program: 'Master of International Relations',
      scholarship: '90%',
      duration: '2 years',
      deadline: '2024-08-30',
      requirements:
        'Bachelor Degree, Minimum 3.6 GPA, IELTS 7.0, Thesis proposal',
      rating: 4.9,
      students: 60,
      degree: 'MA',
    },
    {
      id: 5,
      university: 'Zhejiang University',
      logo: 'https://www.zju.edu.cn/_upload/article/images/b3/3e/4d14d4c54f638bfeac3d775ce621/fffe781e-e322-42e4-bf42-7704b32a2e7a.png',
      country: 'China',
      program: 'Master of Public Health',
      scholarship: '80%',
      duration: '2 years',
      deadline: '2024-09-15',
      requirements: 'Bachelor in Health Sciences, Minimum 3.4 GPA, IELTS 6.5',
      rating: 4.8,
      students: 75,
      degree: 'MPH',
    },
    {
      id: 6,
      university: 'Universiti Sains Malaysia',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlYK7pcQAFNCd1I32McFtIGaCISuvHKJXnjQ&s',
      country: 'Malaysia',
      program: 'Master of Pharmacy',
      scholarship: '70%',
      duration: '2 years',
      deadline: '2024-08-25',
      requirements: 'Bachelor of Pharmacy, Minimum 3.2 GPA, IELTS 6.5, License',
      rating: 4.7,
      students: 50,
      degree: 'MPharm',
    },
    {
      id: 7,
      university: 'Fudan University',
      logo: 'https://careers.aapt.org/getasset/660df083-246d-4b11-87c8-7d55b1e6347b/',
      country: 'China',
      program: 'Master of Economics',
      scholarship: '85%',
      duration: '1.5 years',
      deadline: '2024-09-10',
      requirements:
        'Bachelor in Economics, Minimum 3.5 GPA, IELTS 7.0, GMAT recommended',
      rating: 4.9,
      students: 65,
      degree: 'MEcon',
    },
    {
      id: 8,
      university: 'Universiti Teknologi Malaysia',
      logo: 'https://civilexer.wordpress.com/wp-content/uploads/2011/03/utm-ibs.png?w=584',
      country: 'Malaysia',
      program: 'Master of Architecture',
      scholarship: '75%',
      duration: '2 years',
      deadline: '2024-08-18',
      requirements:
        'Bachelor of Architecture, Minimum 3.3 GPA, IELTS 6.5, Portfolio',
      rating: 4.7,
      students: 40,
      degree: 'MArch',
    },
    {
      id: 9,
      university: 'Shanghai Jiao Tong University',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2mYVcxqmWMX50EAT3YKYqyshKWuWSFz3fBA&s',
      country: 'China',
      program: 'Master of Data Science',
      scholarship: '88%',
      duration: '2 years',
      deadline: '2024-09-05',
      requirements:
        'Bachelor in CS/Math, Minimum 3.4 GPA, IELTS 6.5, Programming skills',
      rating: 4.8,
      students: 70,
      degree: 'MSc',
    },
    {
      id: 10,
      university: 'Beijing Normal University',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSojWKgTDPzMFta0K9SvPHbcJw7twmVP22eVA&s',
      country: 'China',
      program: 'Master of Education',
      scholarship: '82%',
      duration: '2 years',
      deadline: '2024-09-20',
      requirements:
        'Bachelor in Education, Minimum 3.3 GPA, IELTS 6.5, Teaching experience',
      rating: 4.7,
      students: 85,
      degree: 'MEd',
    },
  ];

  const [showAll, setShowAll] = useState(false);

  const visibleScholarships = showAll
    ? mastersScholarships
    : mastersScholarships.slice(0, 3);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Master's Programs with Scholarships
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advance your career with prestigious master's degrees and generous
            scholarship opportunities at top universities in China and Malaysia.
            Specialize in your field of expertise.
          </p>
        </div>

        {/* Statistics Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-purple-600">
              {mastersScholarships.length}+
            </div>
            <div className="text-gray-600">Master's Programs</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-indigo-600">70-90%</div>
            <div className="text-gray-600">Scholarship Range</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-pink-600">1.5-2</div>
            <div className="text-gray-600">Years Duration</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-orange-600">100%</div>
            <div className="text-gray-600">Research Support</div>
          </div>
        </div>

        {/* Scholarship Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleScholarships.map(scholarship => (
            <div
              key={scholarship.id}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Scholarship Badge */}
              <div className="relative">
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-full shadow-lg z-10">
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
                  <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2 py-1 rounded">
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
                      {scholarship.studits}+ enrolled
                    </span>
                  </div>
                </div>

                {/* Requirements */}
                <div className="bg-purple-50 rounded-lg p-3 mb-4">
                  <h5 className="font-semibold text-purple-800 text-sm mb-1">
                    Requirements:
                  </h5>
                  <p className="text-purple-700 text-xs">
                    {scholarship.requirements}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                    Apply Now
                  </button>
                  <button className="px-4 py-2 border border-gray-300 hover:border-purple-600 text-gray-700 hover:text-purple-600 rounded-lg transition duration-300">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Toggle Button */}
        <div className="text-center pt-10">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition duration-300"
          >
            {showAll ? 'Show Less' : 'See All Programs'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Masters;
