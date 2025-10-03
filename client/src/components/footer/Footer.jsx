// components/Footer.jsx
'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTwitter,
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Programs',
      links: [
        { name: 'Bachelor Degrees', href: '/bachelors' },
        { name: 'Master Degrees', href: '/masters' },
        { name: 'PhD Programs', href: '/phd' },
        { name: 'Diploma Courses', href: '/diploma' },
        { name: 'Language Courses', href: '/language-courses' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'SOP Writing Guide', href: '/sop-guide' },
        { name: 'IELTS Preparation', href: '/ielts' },
        { name: 'Visa Assistance', href: '/visa' },
        { name: 'Application Timeline', href: '/timeline' },
        { name: 'Success Stories', href: '/success-stories' },
      ],
    },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: <FaFacebook />, href: '#' },
    { name: 'Instagram', icon: <FaInstagram />, href: '#' },
    { name: 'LinkedIn', icon: <FaLinkedin />, href: '#' },
    { name: 'YouTube', icon: <FaYoutube />, href: '#' },
    { name: 'Twitter', icon: <FaTwitter />, href: '#' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-0 py-16">
        <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-16">
          {/* Brand Section - Takes 50% width on desktop */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <Link href="/" className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">✈️</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    Global Scholarships
                  </h3>
                  <p className="text-blue-200 text-sm">Study Abroad Programs</p>
                </div>
              </Link>
              <p className="text-gray-300 leading-relaxed mb-6">
                Your trusted partner for international education. We help
                students achieve their dreams of studying abroad with expert
                guidance and comprehensive scholarship support.
              </p>
            </motion.div>

            {/* Newsletter Subscription */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="font-semibold mb-4 text-blue-200">Stay Updated</h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-cyan-400 transition duration-300"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 rounded-lg font-semibold transition duration-300 transform hover:scale-105">
                  Subscribe
                </button>
              </div>
            </motion.div>
          </div>

          {/* Programs & Resources - Takes 50% width on desktop */}
          <div className="lg:w-1/2 flex flex-row  gap-8 lg:gap-16">
            {footerSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex-1 min-w-[150px] 
                "
              >
                <h4 className="font-semibold mb-4 text-blue-200">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map(link => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-cyan-300 transition duration-300 hover:translate-x-1 block"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Social Links & Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-white/20"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Contact Info */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-cyan-400">📧</span>
                <span>info@globalscholarships.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-cyan-400">📞</span>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-cyan-400">🏢</span>
                <span>123 Education St, Learning City</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              {socialLinks.map(social => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-cyan-500 transition duration-300"
                  aria-label={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div>© {currentYear} Global Scholarships. All rights reserved.</div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/privacy"
                className="hover:text-cyan-300 transition duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-cyan-300 transition duration-300"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="hover:text-cyan-300 transition duration-300"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition duration-300 transform hover:scale-110 group">
          <span className="flex items-center space-x-2">
            <span className="text-xl">💬</span>
            <span className="max-w-0 group-hover:max-w-xs overflow-hidden transition-all duration-300 whitespace-nowrap">
              Get Help
            </span>
          </span>
        </button>
      </motion.div>
    </footer>
  );
};

export default Footer;
