import React, { useState } from "react";
import { FaPlayCircle, FaCheckCircle, FaLock, FaChevronDown, FaChevronUp } from "react-icons/fa";

const CurriculumSidebar = ({
  course,
  currentLecture,
  completedLectures,
  onSelectLecture,
}) => {
  const { sections } = course;
  // State to track expanded sections (by index)
  // Default to expanding the section containing the current lecture, or the first one
  const [expandedSections, setExpandedSections] = useState(() => {
    const initialExpanded = {};
    sections.forEach((section, index) => {
        // Expand if it contains the current lecture or is the first section
        const hasCurrent = section.lectures.some(l => l._id === currentLecture?._id);
        if (hasCurrent || index === 0) {
            initialExpanded[index] = true;
        }
    });
    return initialExpanded;
  });

  const toggleSection = (index) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="bg-white h-full overflow-y-auto border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b bg-gray-50">
        <h2 className="text-lg font-bold text-gray-900 mb-1">{course.title}</h2>
        <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{completedLectures.length} / {sections.reduce((acc, s) => acc + s.lectures.length, 0)} lectures completed</span>
            {/* Progress Bar */}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
            <div
                className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${(completedLectures.length / Math.max(sections.reduce((acc, s) => acc + s.lectures.length, 0), 1)) * 100}%` }}
            ></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {sections.map((section, index) => (
          <div key={section._id} className="border-b border-gray-100">
            <button
              onClick={() => toggleSection(index)}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <h3 className="font-semibold text-sm text-gray-800 text-left">
                Section {index + 1}: {section.title}
              </h3>
              {expandedSections[index] ? <FaChevronUp className="text-gray-400 text-xs" /> : <FaChevronDown className="text-gray-400 text-xs" />}
            </button>

            {expandedSections[index] && (
              <ul className="bg-white">
                {section.lectures.map((lecture, lIndex) => {
                  const isCompleted = completedLectures.includes(lecture._id);
                  const isCurrent = currentLecture?._id === lecture._id;

                  let Icon = FaPlayCircle;
                  if (isCompleted) Icon = FaCheckCircle;

                  return (
                    <li key={lecture._id}>
                      <button
                        onClick={() => onSelectLecture(lecture)}
                        className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors border-l-4
                          ${
                            isCurrent
                              ? "bg-blue-50 border-blue-600"
                              : "border-transparent hover:bg-gray-50"
                          }
                        `}
                      >
                        <div className="mt-0.5">
                             <Icon
                            className={`w-4 h-4 ${
                                isCompleted ? "text-green-500" : isCurrent ? "text-blue-600" : "text-gray-400"
                            }`}
                            />
                        </div>
                        <div className="flex-grow">
                            <p className={`text-sm ${isCurrent ? "font-medium text-blue-700" : "text-gray-700"}`}>
                                {lIndex + 1}. {lecture.title}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                    <FaPlayCircle size={10} /> {lecture.duration ? `${Math.floor(lecture.duration / 60)}m` : "Video"}
                                </span>
                            </div>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurriculumSidebar;
