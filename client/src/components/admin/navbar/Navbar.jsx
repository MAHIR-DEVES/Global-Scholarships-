'use client';
import userService from '@/utils/userService';
import React, { useState, useEffect } from 'react';

const Navbar = ({ onMenuToggle }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  // user info
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  console.log(userProfile?.user);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await userService.getCurrentUser();
        setUserProfile(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const notifications = [
    {
      id: 1,
      message: 'New scholarship application from John Doe',
      time: '2 min ago',
      type: 'application',
      read: false,
    },
    {
      id: 2,
      message: 'University partnership request approved',
      time: '15 min ago',
      type: 'partnership',
      read: false,
    },
    {
      id: 3,
      message: '5 new student registrations today',
      time: '1 hour ago',
      type: 'registration',
      read: true,
    },
  ];

  const user = {
    name: 'Sarah Johnson',
    email: 'sarah@globalscholarships.com',
    role: 'Administrator',
    initials: 'SJ',
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <nav
      className={`bg-gradient-to-br from-blue-50 via-white to-indigo-100  sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : 'shadow-sm'
      }`}
    >
      <div className="px-4 py-3 md:px-6">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo & Mobile menu */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button
              onClick={() => onMenuToggle && onMenuToggle()}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="hidden  w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl md:flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">✈️</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Global Scholars
                </h1>
                <p className="text-xs text-gray-500">Education Consultancy</p>
              </div>
            </div>

            {/* Page Title - Hidden on mobile, shown on desktop */}
            <div className="hidden md:block ml-4 pl-4 border-l border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Dashboard Overview
              </h2>
              <p className="text-sm text-gray-500 flex items-center space-x-2 mt-1">
                <span>Welcome back, {userProfile?.user?.name}</span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span>Live</span>
                </span>
                <span>•</span>
                <span>{currentTime}</span>
              </p>
            </div>
          </div>

          {/* Mobile Page Title */}
          <div className="md:hidden flex-1 text-center">
            <h2 className="text-sm font-semibold text-gray-900 truncate">
              Dashboard
            </h2>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Quick Stats - Hidden on mobile, shown on medium+ */}
            <div className="hidden md:flex items-center space-x-6 mr-4">
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">1,247</div>
                <div className="text-xs text-gray-500">Students</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">234</div>
                <div className="text-xs text-gray-500">Scholarships</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">56</div>
                <div className="text-xs text-gray-500">Universities</div>
              </div>
            </div>

            {/* Search - Hidden on small mobile, shown on medium+ */}
            <div className="relative hidden sm:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-32 lg:w-48 xl:w-64 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Mobile Search Button */}
            <button className="sm:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  setIsProfileOpen(false);
                }}
                className="relative p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
              >
                <div className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 17h5l-5 5v-5zM10.24 8.56a5.97 5.97 0 01-4.66-6.24M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-white font-medium">
                    {unreadNotifications}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 animate-in fade-in-0 zoom-in-95">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">
                        Notifications
                      </h3>
                      <span className="text-xs text-blue-600 cursor-pointer hover:text-blue-700">
                        Mark all read
                      </span>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map(notification => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-50 hover:bg-blue-50 transition-colors duration-150 cursor-pointer ${
                          !notification.read ? 'bg-blue-25' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div
                            className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${
                              notification.read ? 'bg-gray-300' : 'bg-blue-500'
                            }`}
                          ></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-800 leading-relaxed">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-100 bg-gray-50 rounded-b-xl">
                    <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium py-2">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Messages - Hidden on mobile */}
            <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 group hidden sm:block">
              <div className="w-5 h-5 text-gray-600 group-hover:text-green-600 transition-colors">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-white font-medium">
                3
              </span>
            </button>

            {/* Divider - Hidden on mobile */}
            <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsNotificationsOpen(false);
                }}
                className="flex items-center space-x-2 sm:space-x-3 p-1 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow transition-shadow">
                  <span className="text-white text-sm font-semibold">
                    {user.initials}
                  </span>
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-semibold text-gray-900">
                    {userProfile?.user?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {userProfile?.user?.role}
                  </p>
                </div>
                <svg
                  className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors hidden lg:block"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden animate-in fade-in-0 zoom-in-95">
                  {/* User Info */}
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {user.initials}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {userProfile?.user?.name}
                        </p>
                        <p className="text-xs text-gray-600 truncate">
                          {userProfile?.user?.email}
                        </p>
                        <p className="text-xs text-blue-600 font-medium mt-1">
                          {userProfile?.user?.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-150">
                      <div className="w-5 h-5 text-gray-400">👤</div>
                      <span>My Profile</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-150">
                      <div className="w-5 h-5 text-gray-400">⚙️</div>
                      <span>Account Settings</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-150">
                      <div className="w-5 h-5 text-gray-400">🛡️</div>
                      <span>Privacy & Security</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-150">
                      <div className="w-5 h-5 text-gray-400">💬</div>
                      <span>Support Center</span>
                    </button>
                  </div>

                  {/* Footer */}
                  <div className="p-2 border-t border-gray-100">
                    <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150">
                      <div className="w-5 h-5">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                      </div>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar - Shows when needed */}
        <div className="mt-3 sm:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search students, scholarships..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
