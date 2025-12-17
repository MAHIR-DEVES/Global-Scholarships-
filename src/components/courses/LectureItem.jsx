import React from "react";
import { FaPlayCircle, FaLock } from "react-icons/fa";

// Helper function to format seconds into a readable MM:SS format
const formatDuration = (seconds) => {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
};

const LectureItem = ({ lecture }) => {
  const { title, duration, isPreviewable } = lecture;

  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-md cursor-pointer transition-colors">
      <div className="flex items-center gap-4">
        {isPreviewable ? (
          <FaPlayCircle className="w-5 h-5 text-blue-500" />
        ) : (
          <FaLock className="w-5 h-5 text-gray-400" />
        )}
        <p className="text-gray-800">{title}</p>
      </div>
      <div className="flex items-center gap-4">
        {isPreviewable && (
          <span className="text-sm font-semibold text-blue-600">Preview</span>
        )}
        <span className="text-sm text-gray-500">
          {formatDuration(duration)}
        </span>
      </div>
    </div>
  );
};

export default LectureItem;
