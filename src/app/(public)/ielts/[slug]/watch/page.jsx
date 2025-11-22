import React from "react";
import { notFound } from "next/navigation";
import api from "@/utils/api"; // Assume this is your configured Axios instance
import { headers } from "next/headers"; // To pass auth cookies
import CoursePlayer from "./CoursePlayer";

// Fetch course content AND user's progress for that course
async function getCourseWatchData(slug) {
  try {
    const cookie = headers().get("cookie") ?? "";
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    // This endpoint must be protected and check for enrollment!
    const res = await fetch(`${apiUrl}/api/courses/${slug}/watch`, {
      headers: { cookie }, // Pass user's cookie for authentication
      cache: "no-store",
    });

    if (res.status === 403 || res.status === 401) {
      return { course: null, error: "unauthorized" };
    }
    if (!res.ok) {
      throw new Error("Failed to fetch course data");
    }
    const responseData = await res.json();
    return { course: responseData.data, error: null }; // API should return { course, enrollment }
  } catch (error) {
    console.error(error);
    return { course: null, error: "fetch_failed" };
  }
}

const CourseWatchPage = async ({ params }) => {
  const { course, error } = await getCourseWatchData(params.slug);

  if (error === "unauthorized") {
    // A nice UI telling the user to enroll
    return (
      <div className="text-center p-20">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="mt-2 text-gray-600">
          You must be enrolled in this course to watch the content.
        </p>
        {/* You can add a <Link> back to the course details page */}
      </div>
    );
  }

  if (!course) {
    notFound();
  }

  // If data is fetched successfully, render the client component with the data
  return <CoursePlayer courseData={course} />;
};

export default CourseWatchPage;
