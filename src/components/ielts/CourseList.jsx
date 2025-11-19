import React from "react";
import CourseCard from "./CourseCard";

const CourseList = ({ courses }) => {
  // Handle the case where no courses are available
  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold text-gray-700">
          No Courses Found
        </h2>
        <p className="text-gray-500 mt-2">
          Check back later, we are working on adding new content!
        </p>
      </div>
    );
  }

  // Display courses in a responsive grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
};

export default CourseList;
