'use client';
import React, { useState } from 'react';
import Navbar from '@/components/admin/navbar/Navbar';
import Sidebar from '@/components/admin/sidebar/Sidebar';

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onMenuToggle={toggleSidebar} />
      <div className="flex flex-1">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="sidebar-overlay md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar for desktop */}
        <div className="hidden md:block fixed h-[calc(100vh-75px)] overflow-hidden">
          <Sidebar />
        </div>

        {/* Sidebar for mobile */}
        <div
          className={`sidebar-mobile md:hidden ${sidebarOpen ? 'open' : ''}`}
        >
          <Sidebar />
        </div>

        {/* Main content area with responsive margin */}
        <main className="flex-1 md:ml-64 p-4 md:p-6 bg-gray-100 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
