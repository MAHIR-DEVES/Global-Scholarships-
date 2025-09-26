'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Banner = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-100 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{
            duration: 2,
            delay: 0.5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl"
        ></motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-5 lg:px-0 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 lg:space-y-8 z-10">
            <div className="space-y-4 lg:space-y-6">
              {/* Main Heading */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Study <span className="text-blue-600">Abroad</span>
                </h1>
                <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-800 mt-2">
                  With Confidence
                </h2>
              </motion.div>

              {/* Scholarship Highlight */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-4 lg:p-6 shadow-xl"
              >
                <div className="flex items-center space-x-3">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                    className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-full flex items-center justify-center"
                  >
                    <span className="text-xl lg:text-2xl">🎓</span>
                  </motion.div>
                  <div>
                    <h3 className="text-lg lg:text-xl font-bold text-white">
                      Scholarship Opportunities
                    </h3>
                    <p className="text-blue-100 text-sm lg:text-base">
                      Up to 100% tuition coverage available
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                  Join thousands of students who have transformed their lives
                  through international education. Get expert guidance on
                  admissions, scholarships, and visa processing for your dream
                  university.
                </p>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-4 lg:gap-6"
            >
              {[
                { number: '50K+', label: 'Students Placed' },
                { number: '95%', label: 'Success Rate' },
                { number: '100+', label: 'Universities' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center p-3 lg:p-4 bg-white/60 rounded-xl backdrop-blur-sm border border-white/30 cursor-pointer"
                >
                  <div className="text-xl lg:text-2xl font-bold text-blue-600">
                    {stat.number}
                  </div>
                  <div className="text-xs lg:text-sm text-gray-600">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Images Section */}
          <div className="relative">
            {/* Plane Graphic */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute -top-4 -right-4 lg:-top-8 lg:-right-8 z-20"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    rotate: [45, 50, 45],
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-16 h-16 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full flex items-center justify-center shadow-2xl"
                >
                  <span className="text-2xl lg:text-3xl text-white">✈️</span>
                </motion.div>
                {/* Flight Path Dots */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '80px' }}
                  transition={{ duration: 1, delay: 1 }}
                  className="absolute -left-20 lg:-left-32 top-1/2 h-1 bg-gradient-to-r from-blue-200 to-blue-400 overflow-hidden"
                >
                  <motion.div
                    animate={{ x: [-20, 100] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="flex justify-between w-full"
                  >
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-blue-500 rounded-full"
                      ></div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Students Images Container */}
            <div className="relative grid grid-cols-2 gap-4 lg:gap-6">
              {/* Female Student 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition duration-300">
                  <div className="w-full h-64 lg:h-100 bg-gradient-to-br from-purple-400 to-pink-500 relative">
                    <Image
                      src="/img/image-3.jpg"
                      alt="Banner"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -bottom-2 -right-2 lg:-bottom-4 lg:-right-4 bg-white rounded-lg lg:rounded-xl p-2 lg:p-3 shadow-lg mr-5"
                >
                  <div className="flex items-center space-x-1 lg:space-x-2">
                    <span className="text-lg lg:text-2xl">👩‍🎓</span>
                    <span className="font-semibold text-xs lg:text-sm">
                      MBA Candidate
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Male Student */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                whileHover={{ y: -10 }}
                className="relative group mt-8 lg:mt-12"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition duration-300">
                  <div className="w-full h-64 lg:h-100 bg-gradient-to-br from-blue-400 to-green-500 relative">
                    <Image
                      src="/img/image-2.jpg"
                      alt="Banner"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, delay: 1, repeat: Infinity }}
                  className="absolute -bottom-2 -left-2 lg:-bottom-4 lg:-left-4 bg-white rounded-lg lg:rounded-xl p-2 lg:p-3 shadow-lg"
                >
                  <div className="flex items-center space-x-1 lg:space-x-2">
                    <span className="text-lg lg:text-2xl">👨‍🎓</span>
                    <span className="font-semibold text-xs lg:text-sm">
                      Engineering
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 lg:-bottom-8 lg:-left-8 w-12 h-12 lg:w-20 lg:h-20 bg-yellow-400 rounded-full"
            ></motion.div>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-1/2 -right-2 lg:-right-4 w-8 h-8 lg:w-12 lg:h-12 bg-green-400 rounded-full"
            ></motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
