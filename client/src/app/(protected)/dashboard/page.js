import React from 'react';

const DashboardPage = () => {
  // Sample data for the dashboard
  const stats = [
    {
      title: 'Total Students',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      icon: '👥',
      color: 'blue',
      description: 'Registered students',
    },
    {
      title: 'Active Scholarships',
      value: '234',
      change: '+8%',
      trend: 'up',
      icon: '💰',
      color: 'green',
      description: 'Available opportunities',
    },
    {
      title: 'Partner Universities',
      value: '56',
      change: '+3',
      trend: 'up',
      icon: '🏛️',
      color: 'purple',
      description: 'Global partnerships',
    },
    {
      title: 'Pending Applications',
      value: '45',
      change: '-5%',
      trend: 'down',
      icon: '📋',
      color: 'orange',
      description: 'Require review',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'New scholarship application',
      user: 'John Doe',
      time: '5 min ago',
      type: 'application',
    },
    {
      id: 2,
      action: 'University partnership approved',
      user: 'Sarah Wilson',
      time: '15 min ago',
      type: 'partnership',
    },
    {
      id: 3,
      action: 'Student registration completed',
      user: 'Mike Chen',
      time: '1 hour ago',
      type: 'registration',
    },
    {
      id: 4,
      action: 'Scholarship status updated',
      user: 'Admin',
      time: '2 hours ago',
      type: 'update',
    },
  ];

  const quickActions = [
    {
      title: 'Add Scholarship',
      icon: '➕',
      link: '/dashboard/add-scholarships',
      color: 'blue',
    },
    {
      title: 'Manage Students',
      icon: '👥',
      link: '/dashboard/students',
      color: 'green',
    },
    {
      title: 'View Applications',
      icon: '📋',
      link: '/dashboard/applications',
      color: 'purple',
    },
    {
      title: 'University Partners',
      icon: '🏛️',
      link: '/dashboard/universities',
      color: 'orange',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 ">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Dashboard Overview
              </h1>
              <p className="text-gray-600">
                Welcome back! Heres whats happening with your study abroad
                platform.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-200">
                <p className="text-sm text-gray-500">Last updated</p>
                <p className="font-semibold text-gray-900">Just now</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}
                >
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <div
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    stat.trend === 'up'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {stat.trend === 'up' ? '↗' : '↘'} {stat.change}
                </div>
              </div>
              <h3 className="text-gray-500 text-sm font-medium mb-1">
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </p>
              <p className="text-gray-400 text-sm">{stat.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <a
                    key={index}
                    href={action.link}
                    className={`flex items-center space-x-3 p-4 rounded-xl border border-gray-200 hover:border-${action.color}-300 hover:bg-${action.color}-50 transition-all duration-200 group`}
                  >
                    <div
                      className={`w-10 h-10 bg-${action.color}-100 rounded-lg flex items-center justify-center group-hover:bg-${action.color}-200 transition-colors`}
                    >
                      <span className="text-lg">{action.icon}</span>
                    </div>
                    <span className="font-medium text-gray-700 group-hover:text-gray-900">
                      {action.title}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Recent Activity
                </h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View all
                </button>
              </div>
              <div className="space-y-4">
                {recentActivities.map(activity => (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <span className="text-blue-600 text-lg">
                        {activity.type === 'application' && '📝'}
                        {activity.type === 'partnership' && '🤝'}
                        {activity.type === 'registration' && '👤'}
                        {activity.type === 'update' && '🔄'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 font-medium truncate">
                        {activity.action}
                      </p>
                      <p className="text-gray-500 text-sm">
                        by {activity.user}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">12</div>
              <div className="text-gray-500 text-sm">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">$2.4M</div>
              <div className="text-gray-500 text-sm">Scholarship Value</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">89%</div>
              <div className="text-gray-500 text-sm">Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">24/7</div>
              <div className="text-gray-500 text-sm">Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
