'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      title: 'MAIN',
      items: [
        {
          icon: '📊',
          label: 'Dashboard',
          href: '/dashboard',
          badge: null,
        },
        {
          icon: '👥',
          label: 'Students',
          href: '/dashboard/students',
          badge: '1.2K',
        },
        {
          icon: '🏛️',
          label: 'Universities',
          href: '/dashboard/universities',
          badge: '50+',
        },
      ],
    },
    {
      title: 'SCHOLARSHIPS',
      items: [
        {
          icon: '💰',
          label: 'All Scholarships',
          href: '/dashboard/scholarships',
          badge: '200+',
        },
        {
          icon: '📝',
          label: 'Blog Posts',
          href: '/dashboard/blog',
          badge: '12',
        },
        {
          icon: '➕',
          label: 'Add Scholarship',
          href: '/dashboard/add-scholarships',
          badge: null,
        },
        {
          icon: '📋',
          label: 'Applications',
          href: '/dashboard/applications',
          badge: '45',
        },
        {
          icon: '✅',
          label: 'Approved',
          href: '/dashboard/approved',
          badge: '156',
        },
      ],
    },
    {
      title: 'PROGRAMS',
      items: [
        {
          icon: '🎓',
          label: 'Diploma Programs',
          href: '/dashboard/diploma',
          badge: '25',
        },
        {
          icon: '📚',
          label: 'Bachelor Programs',
          href: '/dashboard/bachelor',
          badge: '40',
        },
        {
          icon: '🎯',
          label: 'Master Programs',
          href: '/dashboard/master',
          badge: '35',
        },
        {
          icon: '🔬',
          label: 'PhD Programs',
          href: '/dashboard/phd',
          badge: '15',
        },
      ],
    },

    {
      title: 'SETTINGS',
      items: [
        {
          icon: '👤',
          label: 'Profile',
          href: '/dashboard/profile',
          badge: null,
        },
        {
          icon: '⚙️',
          label: 'Settings',
          href: '/dashboard/settings',
          badge: null,
        },
        {
          icon: '🛡️',
          label: 'Admin Users',
          href: '/dashboard/admins',
          badge: '5',
        },
      ],
    },
  ];

  const isActive = href => pathname === href;

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white w-64 h-full flex flex-col">
      {/* Header */}
      <div className="py-4 pl-2 border-b border-gray-700 flex-shrink-0">
        <Link href="/" className="flex items-center space-x-3">
          <div className="hidden lg:block">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Global Scholarships
            </h1>
            <p className="text-blue-200 text-xs">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Navigation (Scrollable part) */}
      <nav className="flex-1 overflow-y-auto py-6 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-800">
        {menuItems.map(section => (
          <div key={section.title} className="mb-8">
            <h3 className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between px-6 py-3 text-sm transition-all duration-200 group ${
                      isActive(item.href)
                        ? 'bg-blue-600 text-white shadow-lg border-l-4 border-cyan-400'
                        : 'text-gray-300 hover:bg-gray-750 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          isActive(item.href)
                            ? 'bg-cyan-500 text-white'
                            : 'bg-gray-700 text-gray-300 group-hover:bg-gray-600'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 md:p-6 border-t border-gray-700 flex-shrink-0">
        <div className="flex items-center space-x-3 p-3 bg-gray-750 rounded-lg">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-400 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">A</span>
          </div>
          <div className="flex-1 min-w-0 hidden md:block">
            <p className="text-sm font-medium text-white truncate">
              Admin User
            </p>
            <p className="text-xs text-gray-400 truncate">
              admin@globalscholarships.com
            </p>
          </div>
          <button className="text-gray-400 hover:text-white transition-colors">
            <svg
              className="w-5 h-5"
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
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
