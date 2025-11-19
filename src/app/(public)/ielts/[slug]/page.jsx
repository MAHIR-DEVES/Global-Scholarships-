import React from "react";
import { notFound } from "next/navigation";
import CourseHero from "@/components/courses/CourseHero";
import CourseCurriculum from "@/components/courses/CourseCurriculum";

// --- Data Fetching Function ---
// Fetches a single course. Your backend must support fetching by slug or ID.
async function getCourse(slug) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    // NOTE: This assumes your backend can find a course by its ID passed in the URL.
    const res = await fetch(`${apiUrl}/api/courses/${slug}`, {
      cache: "no-store",
    });

    if (res.status === 404) {
      return null; // Handle not found case gracefully
    }

    if (!res.ok) {
      throw new Error("Failed to fetch the course.");
    }

    const responseData = await res.json();
    return responseData.data;
  } catch (error) {
    console.error(error);
    return null; // Return null on error
  }
}

// --- Generate Dynamic Metadata for SEO ---
export async function generateMetadata({ params }) {
  const course = await getCourse(await params?.slug);
  if (!course) {
    return {
      title: "Course Not Found",
    };
  }
  return {
    title: `${course.title} | Your Platform Name`,
    description: course.description,
  };
}

// --- The Page Component ---
const CourseDetailsPage = async ({ params }) => {
  // The 'slug' here corresponds to the folder name `[slug]`
  const course = await getCourse(await params.slug);

  // If the course is not found, render the 404 page
  if (!course) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        <CourseHero course={course} />
        <CourseCurriculum sections={course.sections} />
      </div>
    </div>
  );
};

export default CourseDetailsPage;
