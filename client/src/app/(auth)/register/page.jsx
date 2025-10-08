'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    phone: '',
    country: '',
    educationLevel: 'Bachelor',
    fieldOfStudy: '',
    agreeToTerms: false,
  });

  const [loading, setLoading] = useState(false);

  // ✅ Fixed: No TypeScript types, works in JSX
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Map frontend education level values to backend values
  const mapEducationLevel = level => {
    return level; // Now frontend and backend use the same values
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      setLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      toast.warning('Please agree to the terms and conditions');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...dataToSend } = formData;

      // Map frontend education levels to backend values
      const mappedData = {
        ...dataToSend,
        educationLevel: mapEducationLevel(dataToSend.educationLevel),
      };

      // Send data to backend API
      const res = await axios.post(
        'http://localhost:5000/api/users',
        mappedData,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      // If success
      if (res.status === 201 || res.status === 200) {
        toast.success(
          'Registration successful! Welcome to Global Scholarships 🎓'
        );
        console.log('Data sent to DB:', res.data);
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        country: '',
        educationLevel: '',
        fieldOfStudy: '',
        agreeToTerms: false,
      });
    } catch (error) {
      console.error(
        'Registration error:',
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message ||
          'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'India',
    'China',
    'Malaysia',
    'Singapore',
    'Other',
  ];
  const educationLevels = [
    'High School',
    'Diploma',
    'Bachelor',
    'Master',
    'PhD',
    'Other',
  ];
  const programInterests = [
    'Business',
    'Engineering',
    'Computer Science',
    'Medicine',
    'Arts',
    'Sciences',
    'Other',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
        {/* Right Side - Benefits Illustration */}
        <div className="hidden lg:block col-span-2">
          <div className="text-center space-y-8">
            {/* Study Abroad Illustration */}
            <div className="relative">
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-green-200 to-teal-100 rounded-full flex items-center justify-center">
                <div className="text-6xl">🎓</div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-3xl">
                ✈️
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center text-2xl">
                🌍
              </div>
            </div>

            {/* Benefits List */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">
                Benefits of Registering
              </h3>
              <div className="space-y-3">
                {[
                  { icon: '🎯', text: 'Personalized program recommendations' },
                  { icon: '💰', text: 'Exclusive scholarship opportunities' },
                  { icon: '📊', text: 'Application progress tracking' },
                  { icon: '👨‍🏫', text: 'Dedicated education counselor' },
                  { icon: '⚡', text: 'Fast-track application process' },
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 text-gray-700"
                  >
                    <span className="text-xl">{benefit.icon}</span>
                    <span className="text-left">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center p-3 bg-white rounded-xl shadow">
                <div className="text-xl font-bold text-green-600">50K+</div>
                <div className="text-xs text-gray-600">Students</div>
              </div>
              <div className="text-center p-3 bg-white rounded-xl shadow">
                <div className="text-xl font-bold text-blue-600">100+</div>
                <div className="text-xs text-gray-600">Universities</div>
              </div>
              <div className="text-center p-3 bg-white rounded-xl shadow">
                <div className="text-xl font-bold text-purple-600">95%</div>
                <div className="text-xs text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
        {/* Left Side - Registration Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 col-span-3">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-400 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">✈️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent">
                  Global Scholarships
                </h1>
                <p className="text-sm text-gray-500">Study Abroad Programs</p>
              </div>
            </Link>
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="text-gray-600 mt-2">
              Start your study abroad journey today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
                  placeholder="+1 234 567 8900"
                />
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Country *
                </label>
                <select
                  id="country"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
                >
                  <option value="">Select your country</option>
                  {countries.map(country => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Educational Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="educationLevel"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Current Education Level *
                </label>
                <select
                  id="educationLevel"
                  name="educationLevel"
                  required
                  value={formData.educationLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
                >
                  <option value="">Select education level</option>
                  {educationLevels.map(level => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="fieldOfStudy"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Program Interest *
                </label>
                <select
                  id="fieldOfStudy"
                  name="fieldOfStudy"
                  required
                  value={formData.fieldOfStudy}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
                >
                  <option value="">Select program interest</option>
                  {programInterests.map(program => (
                    <option key={program} value={program}>
                      {program}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password *
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
                  placeholder="Create a password"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirm Password *
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label
                htmlFor="agreeToTerms"
                className="ml-2 block text-sm text-gray-700"
              >
                I agree to the{' '}
                <Link
                  href="/terms"
                  className="text-green-600 hover:text-green-500"
                >
                  Terms and Conditions
                </Link>{' '}
                and{' '}
                <Link
                  href="/privacy"
                  className="text-green-600 hover:text-green-500"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-teal-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-700 hover:to-teal-600 transition duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or sign up with
                </span>
              </div>
            </div>

            {/* Social Registration */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => toast.info('Google registration coming soon!')}
                className="w-full inline-flex justify-center items-center px-4 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-200"
              >
                <span className="mr-2">📱</span>
                Google
              </button>
              <button
                type="button"
                onClick={() => toast.info('Facebook registration coming soon!')}
                className="w-full inline-flex justify-center items-center px-4 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-200"
              >
                <span className="mr-2">📘</span>
                Facebook
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="font-medium text-green-600 hover:text-green-500"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
