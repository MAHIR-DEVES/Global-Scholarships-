import React from "react";
import Image from "next/image";

const CourseHero = ({ course }) => {
  const { title, description, instructor, price } = course;
  const displayPrice = price === 0 ? "Free" : `$${price.toFixed(2)}`;

  return (
    <div className="bg-gray-800 text-white p-8 rounded-lg">
      <h1 className="text-4xl font-bold mb-3">{title}</h1>
      <p className="text-lg text-gray-300 max-w-3xl mb-4">{description}</p>
      <div className="flex items-center gap-4 text-sm mb-6">
        <span>
          Created by{" "}
          <span className="font-semibold">{instructor?.name || "Admin"}</span>
        </span>
      </div>
      <div className="flex items-center gap-6">
        <span className="text-3xl font-extrabold">{displayPrice}</span>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CourseHero;
