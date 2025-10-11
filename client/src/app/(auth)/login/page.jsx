'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'https://localhost:5000/api/users/login',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        // Store token in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        toast.success('Login successful! Welcome back!');

        // Redirect based on user role
        if (response.data.user.role === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/');
        }
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        'Login failed. Please check your credentials.';
      toast.error(errorMessage);
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Right Side - Illustration & Info */}
        <div className="hidden lg:block">
          <div className="text-center space-y-8">
            {/* Study Abroad Illustration */}
            <div className="relative">
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-200 to-cyan-100 rounded-full flex items-center justify-center">
                <div className="text-6xl">🎓</div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-3xl">
                ✈️
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-400 rounded-full flex items-center justify-center text-2xl">
                🌍
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">Why Sign In?</h3>
              <div className="space-y-3">
                {[
                  { icon: '📋', text: 'Track your applications' },
                  { icon: '💼', text: 'Access personalized recommendations' },
                  { icon: '💰', text: 'View scholarship opportunities' },
                  { icon: '📚', text: 'Save favorite programs' },
                  { icon: '🎯', text: 'Get expert guidance' },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 text-gray-700"
                  >
                    <span className="text-xl">{feature.icon}</span>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">50K+</div>
                <div className="text-xs text-gray-600">Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">100+</div>
                <div className="text-xs text-gray-600">Universities</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">95%</div>
                <div className="text-xs text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
        {/* Left Side - Login Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">✈️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Global Scholarships
                </h1>
                <p className="text-sm text-gray-500">Study Abroad Programs</p>
              </div>
            </Link>
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="Enter your email"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <span className="text-gray-400">📧</span>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="Enter your password"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <span className="text-gray-400">🔒</span>
                </div>
              </div>
            </div>

            {/* Remember Me & Checkbox */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-600 transition duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="w-full inline-flex justify-center items-center px-4 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-200"
              >
                <span className="mr-2">📘</span>
                Facebook
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center items-center px-4 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-200"
              >
                <span className="mr-2">📱</span>
                Google
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link
                  href="/register"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign up now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
