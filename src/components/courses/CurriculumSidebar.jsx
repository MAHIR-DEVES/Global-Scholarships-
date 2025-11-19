import React from "react";
import { FaPlayCircle, FaCheckCircle, FaLock } from "react-icons/fa";

const CurriculumSidebar = ({
  course,
  currentLecture,
  completedLectures,
  onSelectLecture,
}) => {
  const { sections } = course;

  return (
    <div className="bg-white h-full overflow-y-auto border-l border-gray-200">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold text-gray-900">{course.title}</h2>
        <p className="text-sm text-gray-500">Your Progress</p>
        {/* You can add a progress bar here later */}
      </div>
      <div className="space-y-2 p-2">
        {sections.map((section) => (
          <div key={section._id}>
            <h3 className="font-bold text-md p-2 bg-gray-100 rounded-md mb-1">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.lectures.map((lecture) => {
                const isCompleted = completedLectures.includes(lecture._id);
                const isCurrent = currentLecture?._id === lecture._id;

                let Icon = FaPlayCircle;
                if (isCompleted) Icon = FaCheckCircle;
                // You can add logic for locked lectures here if needed

                return (
                  <li key={lecture._id}>
                    <button
                      onClick={() => onSelectLecture(lecture)}
                      className={`w-full text-left p-3 rounded-md flex items-center gap-3 transition-colors
                        ${
                          isCurrent
                            ? "bg-blue-100 text-blue-800"
                            : "hover:bg-gray-100"
                        }
                        ${isCompleted ? "text-gray-500" : "text-gray-800"}`}
                    >
                      <Icon
                        className={`w-5 h-5 flex-shrink-0 ${
                          isCompleted ? "text-green-500" : "text-gray-400"
                        }`}
                      />
                      <span className="flex-grow text-sm">{lecture.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurriculumSidebar;
