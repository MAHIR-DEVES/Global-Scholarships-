'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const UniversityLogo = () => {
  const universities = [
    {
      name: 'Peking University',
      logo: 'https://english.pku.edu.cn/Uploads/Bden/Picture/2021/04/27/s6087dd6901d02.png',
      short: 'PKU',
      country: 'China',
    },
    {
      name: 'Tsinghua University',
      logo: 'https://i.pinimg.com/736x/f5/0d/e7/f50de799b3e705d770d11ec87e411a2f.jpg',
      short: 'THU',
      country: 'China',
    },
    {
      name: 'Fudan University',
      logo: 'https://careers.aapt.org/getasset/660df083-246d-4b11-87c8-7d55b1e6347b/',
      short: 'FDU',
      country: 'China',
    },
    {
      name: 'Shanghai Jiao Tong University',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2mYVcxqmWMX50EAT3YKYqyshKWuWSFz3fBA&s',
      short: 'SJTU',
      country: 'China',
    },
    {
      name: 'Zhejiang University',
      logo: 'https://www.zju.edu.cn/_upload/article/images/b3/3e/4d14d4c54f638bfeac3d775ce621/fffe781e-e322-42e4-bf42-7704b32a2e7a.png',
      short: 'ZJU',
      country: 'China',
    },
    {
      name: 'Beijing Normal University',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSojWKgTDPzMFta0K9SvPHbcJw7twmVP22eVA&s',
      short: 'BNU',
      country: 'China',
    },
    {
      name: 'University of Malaya',
      logo: 'https://en.your-uni.com/assets/images/university/universiti-malaya-um.png',
      short: 'UM',
      country: 'Malaysia',
    },
    {
      name: 'Universiti Kebangsaan Malaysia',
      logo: 'https://www.uni-due.de/imperia/md/images/iw/ukm/logoukm5.jpg',
      short: 'UKM',
      country: 'Malaysia',
    },
    {
      name: 'Universiti Putra Malaysia',
      logo: 'https://logodix.com/logo/1959380.png',
      short: 'UPM',
      country: 'Malaysia',
    },
    {
      name: 'Universiti Sains Malaysia',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlYK7pcQAFNCd1I32McFtIGaCISuvHKJXnjQ&s',
      short: 'USM',
      country: 'Malaysia',
    },
    {
      name: 'Universiti Teknologi Malaysia',
      logo: 'https://civilexer.wordpress.com/wp-content/uploads/2011/03/utm-ibs.png?w=584',
      short: 'UTM',
      country: 'Malaysia',
    },
    {
      name: "Taylor's University",
      logo: 'https://vectorseek.com/wp-content/uploads/2023/08/Taylors-University-Logo-Vector.svg-.png',
      short: 'TU',
      country: 'Malaysia',
    },
  ];

  // Duplicate for seamless scroll
  const logos = [...universities, ...universities];

  return (
    <div className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Partner Universities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We collaborate with prestigious universities in China and Malaysia
            to provide world-class education opportunities for international
            students.
          </p>
        </motion.div>

        {/* Slider Section */}
        <div className="relative overflow-hidden py-4">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>

          <motion.div
            className="flex space-x-12"
            animate={{
              x: [0, -1800], // move left
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 50,
                ease: 'linear',
              },
            }}
          >
            {logos.map((uni, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group flex-shrink-0 w-56 bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300  overflow-visible"
              >
                <div className="text-center">
                  <div className="relative w-full h-20">
                    <Image
                      src={uni.logo}
                      alt={uni.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Tooltip */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-0 bg-blue-500 text-white text-xs px-3 py-2 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
                  <p className="font-bold">{uni.short}</p>
                  <p>{uni.name}</p>
                  <p className="text-blue-300">{uni.country}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UniversityLogo;
