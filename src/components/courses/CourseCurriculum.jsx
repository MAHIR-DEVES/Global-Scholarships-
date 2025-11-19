import React from "react";
import SectionItem from "./SectionItem";

const CourseCurriculum = ({ sections }) => {
  if (!sections || sections.length === 0) {
    return (
      <p className="text-gray-600">Curriculum details are not available yet.</p>
    );
  }

  // Calculate total course stats
  const totalSections = sections.length;
  const totalLectures = sections.reduce(
    (acc, sec) => acc + sec.lectures.length,
    0
  );
  const totalDurationSeconds = sections.reduce(
    (acc, sec) =>
      acc +
      sec.lectures.reduce((lecAcc, lec) => lecAcc + (lec.duration || 0), 0),
    0
  );
  const totalDurationHours = (totalDurationSeconds / 3600).toFixed(1);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Content</h2>
      <div className="text-sm text-gray-600 mb-6 flex items-center gap-4">
        <span>{totalSections} sections</span>
        <span>•</span>
        <span>{totalLectures} lectures</span>
        <span>•</span>
        <span>{totalDurationHours} hours total length</span>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <SectionItem key={section._id} section={section} />
        ))}
      </div>
    </div>
  );
};

export default CourseCurriculum;
