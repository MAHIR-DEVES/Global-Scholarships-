"use client";

import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import LectureItem from "./LectureItem";

const SectionItem = ({ section }) => {
  const [isOpen, setIsOpen] = useState(false); // Sections start closed by default

  const toggleOpen = () => setIsOpen(!isOpen);

  // Calculate total lectures and duration for this section
  const totalLectures = section.lectures.length;
  const totalDuration = section.lectures.reduce(
    (acc, lec) => acc + (lec.duration || 0),
    0
  );
  const sectionDurationMinutes = Math.floor(totalDuration / 60);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Section Header - Clickable to toggle */}
      <button
        onClick={toggleOpen}
        className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 text-left"
      >
        <div className="flex flex-col">
          <h3 className="text-md font-bold text-gray-900">{section.title}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {totalLectures} lectures • {sectionDurationMinutes} min
          </p>
        </div>
        <FaChevronDown
          className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Collapsible Content - Lectures */}
      {isOpen && (
        <div className="p-2 border-t border-gray-200">
          {section.lectures.map((lecture) => (
            <LectureItem key={lecture._id} lecture={lecture} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionItem;
