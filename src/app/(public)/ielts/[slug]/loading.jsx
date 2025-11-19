import React from "react";

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto p-8 animate-pulse">
      {/* Hero Skeleton */}
      <div className="bg-gray-300 h-64 rounded-lg mb-10"></div>

      {/* Curriculum Skeleton */}
      <div className="bg-gray-300 h-10 w-1/2 rounded-md mb-6"></div>
      <div className="space-y-4">
        <div className="bg-gray-200 h-20 rounded-lg"></div>
        <div className="bg-gray-200 h-20 rounded-lg"></div>
        <div className="bg-gray-200 h-20 rounded-lg"></div>
      </div>
    </div>
  );
}
