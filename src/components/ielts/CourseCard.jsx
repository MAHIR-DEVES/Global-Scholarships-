import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaUserGraduate } from "react-icons/fa";

const CourseCard = ({ course }) => {
  // Destructure for cleaner access
  const { _id, title, slug, thumbnailUrl, category, price, instructor } =
    course;

  const displayPrice = price === 0 ? "Free" : `$${price.toFixed(2)}`;

  return (
    <Link href={`/courses/${slug || _id}`} className="group block">
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        {/* Course Thumbnail */}
        <div className="relative w-full h-48">
          <Image
            src={thumbnailUrl || "/placeholder-image.jpg"} // Provide a fallback image
            alt={`Thumbnail for ${title}`}
            fill
            style={{ objectFit: "cover" }}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Course Details */}
        <div className="p-5">
          <p className="text-sm font-semibold text-blue-600 mb-2">{category}</p>
          <h3 className="text-lg font-bold text-gray-800 truncate mb-3 group-hover:text-blue-700">
            {title}
          </h3>

          {instructor && (
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <FaUserGraduate className="w-4 h-4 mr-2 text-gray-400" />
              <span>{instructor.name || "No Instructor"}</span>
            </div>
          )}

          <div className="flex justify-between items-center border-t border-gray-100 pt-3">
            <p className="text-xl font-bold text-gray-900">{displayPrice}</p>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
              View Details
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
