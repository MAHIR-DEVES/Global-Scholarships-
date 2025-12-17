import React from "react";
import Image from "next/image";
import EnrollmentAction from "./EnrollmentAction";

const CourseHero = ({ course }) => {
  const { _id, title, description, instructor, price } = course;
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
        <EnrollmentAction courseId={_id} price={price} />
      </div>
    </div>
  );
};

export default CourseHero;
