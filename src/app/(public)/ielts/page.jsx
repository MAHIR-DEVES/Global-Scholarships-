import CourseList from "@/components/ielts/CourseList";
import React from "react";

// --- Data Fetching Function ---
async function getCourses() {
  try {
    // IMPORTANT: Use an environment variable for your API URL
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    const res = await fetch(`${apiUrl}/api/courses`, {
      // 'no-store' ensures we get fresh data on every request.
      // Use 'revalidate' for data that doesn't change often.
      cache: "no-store",
    });

    if (!res.ok) {
      // If the server responds with an error, we throw it.
      throw new Error("Failed to fetch courses from the server.");
    }

    const responseData = await res.json();
    return { courses: responseData.data || [], error: null };
  } catch (error) {
    console.error("Error fetching courses:", error);
    // Return an error state to be handled by the UI
    return { courses: [], error: error.message };
  }
}

// --- The Page Component ---
const SopAndIeltsPage = async () => {
  const { courses, error } = await getCourses();

  // If there was an error during fetching, show an error message.
  if (error) {
    // return <ErrorMessage message={error} />;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Our Courses
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Explore our curated list of courses designed to help you succeed.
          </p>
        </div>

        {/* Course List Component */}
        <main>
          <CourseList courses={courses} />
        </main>
      </div>
    </div>
  );
};

export default SopAndIeltsPage;
