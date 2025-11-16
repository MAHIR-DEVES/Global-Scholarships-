'use client';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import userService from '@/utils/userService';

const Navbar = ({ className }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // user info
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  console.log(userProfile?.user);

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const userData = await userService.getCurrentUser();
  //       setUserProfile(userData);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProfile();
  // }, []);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await userService.getCurrentUser();
        setUserProfile(userData);
      } catch (err) {
        if (err?.response?.status === 401) {
          // user is not logged in, no need to show error
          setUserProfile(null);
        } else {
          // unexpected error
          setError(err.message || 'An error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const navLinks = [
    {
      name: 'Scholarships',
      href: '/#',
      icon: '🎓',
      submenu: [
        {
          name: 'Gov. Scholarships',
          href: 'https://shed.gov.bd/site/view/scholarship/Scholarship-Notification',
        },
        { name: 'All Scholarships', href: '/scholarships/all-scholarships' },
      ],
    },

    { name: 'Upcoming', href: '/upcoming', icon: '📅' },
    { name: 'SOP ', href: '/sop', icon: '🏛️' },
    { name: 'IELTS', href: '/ielts', icon: '📝' },
    { name: 'Blog', href: '/blog', icon: '📰' },
    {
      name: 'service',
      href: '/#',
      icon: '🛡️',
      submenu: [
        {
          name: 'University Application',
          href: '/service/university-application',
        },
        {
          name: ' SOP Writing',
          href: '/service/sop-writing',
        },
      ],
    },
  ];

  const handleLoginClick = () => {
    router.push('/login');
    setIsMobileMenuOpen(false);
  };

  const handleRegisterClick = () => {
    router.push('/register');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setDropdownOpen(false);
    router.push('/login');
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={clsx(
        'fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100',
        className
      )}
    >
      <div className="max-w-7xl mx-auto pl-3 lg:px-0">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex-shrink-0"
          >
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-xl">✈️</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Global Scholarships
                </h1>
                <p className="text-xs font-medium text-gray-500">
                  Study Abroad Programs
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                className="relative"
                onMouseEnter={() => setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              >
                <Link
                  href={link.href}
                  className={clsx(
                    'relative flex items-center space-x-2 px-2.5 py-2 rounded-xl font-medium transition-all duration-300 group',
                    pathname === link.href
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600'
                  )}
                >
                  <span className="text-lg">{link.icon}</span>
                  <span>{link.name}</span>
                  {link.submenu && <span className="ml-1 text-sm">▼</span>}
                </Link>

                {/* Dropdown submenu */}
                {link.submenu && activeDropdown === link.name && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0  w-56 bg-white shadow-lg rounded-xl border border-gray-100 z-50"
                  >
                    {link.submenu.map(sub => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        target={
                          sub.name === 'Gov. Scholarships' ? '_blank' : '_self'
                        }
                        rel={
                          sub.name === 'Gov. Scholarships'
                            ? 'noopener noreferrer'
                            : ''
                        }
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center space-x-3 relative">
            {userProfile?.user ? (
              <>
                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-gray-300 hover:border-blue-400 transition-all"
                  >
                    <img
                      src={
                        userProfile?.user?.photoURL ||
                        'https://i.ibb.co/4pDNDk1/avatar.png'
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
                    >
                      {/* Menu Items */}
                      <div className="p-2">
                        <Link
                          href="/dashboard"
                          className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-150"
                        >
                          <div className="w-5 h-5 text-gray-400">🛡️</div>
                          <span>Dashboard</span>
                        </Link>
                        <Link
                          href="/dashboard/profile"
                          className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-150"
                        >
                          <div className="w-5 h-5 text-gray-400">👤</div>
                          <span>My Profile</span>
                        </Link>
                      </div>

                      {/* Footer */}
                      <div className="p-2 border-t border-gray-100">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
                        >
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
                    </motion.div>
                  )}
                </div>
              </>
            ) : (
              <>
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                  onClick={handleRegisterClick}
                  className="px-6 py-2.5 font-medium rounded-xl border border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 hover:shadow-lg"
                >
                  Sign up
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  onClick={handleLoginClick}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium rounded-xl hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Sign In
                </motion.button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            onClick={toggleMobileMenu}
            className="lg:hidden p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-300"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center relative">
              <span
                className={clsx(
                  'w-5 h-0.5 bg-gray-700 rounded-full transition-all duration-300 absolute',
                  {
                    'rotate-45': isMobileMenuOpen,
                    '-translate-y-1.5': !isMobileMenuOpen,
                  }
                )}
              ></span>
              <span
                className={clsx(
                  'w-5 h-0.5 bg-gray-700 rounded-full transition-all duration-300',
                  {
                    'opacity-0': isMobileMenuOpen,
                  }
                )}
              ></span>
              <span
                className={clsx(
                  'w-5 h-0.5 bg-gray-700 rounded-full transition-all duration-300 absolute',
                  {
                    '-rotate-45': isMobileMenuOpen,
                    'translate-y-1.5': !isMobileMenuOpen,
                  }
                )}
              ></span>
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="lg:hidden absolute top-full left-4 right-4 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
            >
              <div className="p-4 space-y-1">
                {navLinks.map((link, index) => (
                  <div key={link.name} className="relative">
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === link.name ? null : link.name
                        )
                      }
                      className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-lg font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">{link.icon}</span>
                        <span>{link.name}</span>
                      </div>
                      {link.submenu && (
                        <span>{activeDropdown === link.name ? '▲' : '▼'}</span>
                      )}
                    </button>

                    {link.submenu && activeDropdown === link.name && (
                      <div className="ml-6 mt-1 space-y-1">
                        {link.submenu.map(sub => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            target={
                              sub.name === 'Gov. Scholarships'
                                ? '_blank'
                                : '_self'
                            }
                            rel={
                              sub.name === 'Gov. Scholarships'
                                ? 'noopener noreferrer'
                                : ''
                            }
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    onClick={handleRegisterClick}
                    className="w-full px-4 py-3 text-gray-700 font-medium rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
                  >
                    Sign up
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    onClick={handleLoginClick}
                    className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium rounded-xl hover:from-blue-600 hover:to-cyan-500 transition-all duration-200 shadow-lg"
                  >
                    Get Started
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
