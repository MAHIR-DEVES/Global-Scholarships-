// components/ReusableButtons.jsx
'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';

const GradientButton = ({ children, onClick, className }) => {
  return (
    <motion.button
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 150, damping: 12, delay: 0.3 }}
      onClick={onClick}
      className={clsx(
        'relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md cursor-pointer',
        className
      )}
    >
      <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
      <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
        <span className="relative text-white">{children}</span>
      </span>
    </motion.button>
  );
};

// --- Button Style 2: Slide-in Background Button ---
// Now accepts bgColor and slideBgColor for customization.
const SlideButton = ({
  children,
  onClick,
  className,
  bgColor = 'bg-red-500',
  slideBgColor = 'bg-red-800',
}) => {
  return (
    <motion.button
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 150, damping: 12, delay: 0.5 }}
      onClick={onClick}
      className={clsx(
        'relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all rounded-xl group cursor-pointer',
        bgColor, // Dynamic background color for the main button
        className
      )}
    >
      <span
        className={clsx(
          'absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out rounded group-hover:-mr-4 group-hover:-mt-4',
          slideBgColor
        )}
      >
        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
      </span>
      <span
        className={clsx(
          'absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full rounded-2xl group-hover:mb-12 group-hover:translate-x-0',
          slideBgColor
        )}
      ></span>
      <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
        {children}
      </span>
    </motion.button>
  );
};

const BorderButton = ({ children, onClick, className }) => {
  return (
    <motion.button
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 150, damping: 12, delay: 0.7 }}
      onClick={onClick}
      className={clsx(
        'relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md cursor-pointer',
        className
      )}
    >
      <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
      <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
        <span className="relative text-white">{children}</span>
      </span>
    </motion.button>
  );
};

export { GradientButton, SlideButton, BorderButton };
