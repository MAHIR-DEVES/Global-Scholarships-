'use client';

import React, { useState } from 'react';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);

  // User profile data
  const [profile, setProfile] = useState({
    name: 'Sarah Chen',
    email: 'sarah.chen@educationhub.com',
    phone: '+60 12-345-6789',
    role: 'Admission Counselor',
    department: 'International Admissions',
    joinDate: '2022-03-15',
    location: 'Kuala Lumpur, Malaysia',
    bio: 'Dedicated to helping international students achieve their educational dreams. Specialized in Southeast Asian markets.',
    avatar: '👩‍💼',
  });

  // Statistics data
  const stats = {
    totalApplications: 247,
    approvedApplications: 189,
    pendingApplications: 35,
    successRate: 76.5,
    studentsPlaced: 156,
    activeScholarships: 28,
    partnerUniversities: 12,
    avgResponseTime: '2.4 hours',
  };

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      action: 'Application Approved',
      student: 'Ahmad Rizki',
      program: 'Computer Science - Tsinghua University',
      time: '2 hours ago',
      type: 'success',
    },
    {
      id: 2,
      action: 'Document Review',
      student: 'Maria Santos',
      program: 'Agriculture - UPM',
      time: '5 hours ago',
      type: 'info',
    },
    {
      id: 3,
      action: 'Interview Scheduled',
      student: 'David Park',
      program: 'Engineering - Peking University',
      time: '1 day ago',
      type: 'warning',
    },
    {
      id: 4,
      action: 'Scholarship Awarded',
      student: 'Yuki Tanaka',
      program: 'STEM - USM',
      time: '2 days ago',
      type: 'success',
    },
    {
      id: 5,
      action: 'Application Rejected',
      student: 'James Wilson',
      program: 'Medicine - Zhejiang University',
      time: '3 days ago',
      type: 'error',
    },
  ];

  // Settings data
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    applicationAlerts: true,
    scholarshipUpdates: true,
    newsletter: false,
    language: 'english',
    timezone: 'GMT+8',
    autoSave: true,
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would typically make an API call to save the profile
    console.log('Profile saved:', profile);
  };

  const getActivityColor = type => {
    switch (type) {
      case 'success':
        return 'text-green-600 bg-green-50';
      case 'error':
        return 'text-red-600 bg-red-50';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50';
      case 'info':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen py-6">
      <div className="py-4 ">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                My Profile
              </h1>
              <p className="text-gray-600">
                Manage your account settings and preferences
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-50 transition duration-200 flex items-center space-x-2">
                <span>📊</span>
                <span>Export Data</span>
              </button>
              {isEditing ? (
                <button
                  onClick={handleSaveProfile}
                  className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition duration-200 flex items-center space-x-2"
                >
                  <span>💾</span>
                  <span>Save Changes</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition duration-200 flex items-center space-x-2"
                >
                  <span>✏️</span>
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
              {/* Profile Header */}
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                  {profile.avatar}
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  {profile.name}
                </h2>
                <p className="text-gray-600">{profile.role}</p>
                <p className="text-sm text-gray-500">{profile.department}</p>
              </div>

              {/* Profile Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400">📧</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-sm text-gray-600">{profile.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400">📱</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Phone</p>
                    <p className="text-sm text-gray-600">{profile.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400">📍</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Location
                    </p>
                    <p className="text-sm text-gray-600">{profile.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400">📅</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Joined</p>
                    <p className="text-sm text-gray-600">{profile.joinDate}</p>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  About
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {profile.bio}
                </p>
              </div>

              {/* Skills/Tags */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Student Counseling',
                    'Admission Process',
                    'Scholarships',
                    'Southeast Asia',
                    'University Partnerships',
                  ].map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1 mb-6">
              <div className="flex space-x-1">
                {['overview', 'statistics', 'settings'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 px-4 text-sm font-medium rounded-xl transition duration-200 ${
                      activeTab === tab
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {stats.totalApplications}
                    </div>
                    <div className="text-sm text-gray-600">
                      Total Applications
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {stats.approvedApplications}
                    </div>
                    <div className="text-sm text-gray-600">Approved</div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {stats.studentsPlaced}
                    </div>
                    <div className="text-sm text-gray-600">Students Placed</div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {stats.successRate}%
                    </div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Recent Activities
                  </h3>
                  <div className="space-y-4">
                    {recentActivities.map(activity => (
                      <div
                        key={activity.id}
                        className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition duration-150"
                      >
                        <div
                          className={`w-2 h-2 mt-2 rounded-full ${
                            activity.type === 'success'
                              ? 'bg-green-500'
                              : activity.type === 'error'
                              ? 'bg-red-500'
                              : activity.type === 'warning'
                              ? 'bg-yellow-500'
                              : 'bg-blue-500'
                          }`}
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">
                              {activity.action}
                            </p>
                            <span className="text-xs text-gray-500">
                              {activity.time}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {activity.student}
                          </p>
                          <p className="text-xs text-gray-500">
                            {activity.program}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'statistics' && (
              <div className="space-y-6">
                {/* Performance Metrics */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Performance Metrics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Monthly Applications
                        </label>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: '75%' }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>0</span>
                          <span>50</span>
                          <span>100</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Approval Rate
                        </label>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: '76.5%' }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>0%</span>
                          <span>50%</span>
                          <span>100%</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">
                          Response Time
                        </span>
                        <span className="text-lg font-bold text-blue-600">
                          {stats.avgResponseTime}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">
                          Active Partnerships
                        </span>
                        <span className="text-lg font-bold text-purple-600">
                          {stats.partnerUniversities}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">
                          Scholarships Managed
                        </span>
                        <span className="text-lg font-bold text-green-600">
                          {stats.activeScholarships}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Achievement Badges */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Achievements
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      {
                        name: 'Top Performer',
                        icon: '⭐',
                        color: 'bg-yellow-100 text-yellow-800',
                      },
                      {
                        name: 'Fast Responder',
                        icon: '⚡',
                        color: 'bg-blue-100 text-blue-800',
                      },
                      {
                        name: 'Student Champion',
                        icon: '🏆',
                        color: 'bg-purple-100 text-purple-800',
                      },
                      {
                        name: 'Partnership Expert',
                        icon: '🤝',
                        color: 'bg-green-100 text-green-800',
                      },
                    ].map((badge, index) => (
                      <div
                        key={index}
                        className="text-center p-4 bg-gray-50 rounded-xl"
                      >
                        <div className="text-2xl mb-2">{badge.icon}</div>
                        <div
                          className={`text-xs font-medium px-2 py-1 rounded-full ${badge.color}`}
                        >
                          {badge.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                {/* Notification Settings */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Notification Preferences
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(settings)
                      .filter(([key]) =>
                        [
                          'emailNotifications',
                          'smsNotifications',
                          'applicationAlerts',
                          'scholarshipUpdates',
                          'newsletter',
                        ].includes(key)
                      )
                      .map(([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {key
                                .replace(/([A-Z])/g, ' $1')
                                .replace(/^./, str => str.toUpperCase())}
                            </p>
                            <p className="text-sm text-gray-500">
                              Receive{' '}
                              {key
                                .toLowerCase()
                                .replace('notifications', '')
                                .replace('alerts', '')
                                .replace('updates', '')}{' '}
                              notifications
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              setSettings(prev => ({ ...prev, [key]: !value }))
                            }
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                              value ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                value ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Account Settings */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Account Settings
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="english">English</option>
                        <option value="malay">Malay</option>
                        <option value="chinese">Chinese</option>
                        <option value="indonesian">Indonesian</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timezone
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="GMT+8">GMT+8 (Malaysia Time)</option>
                        <option value="GMT+7">GMT+7 (Indonesia Time)</option>
                        <option value="GMT+9">GMT+9 (Japan Time)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
