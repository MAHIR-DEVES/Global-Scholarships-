"use client";

import React, { useState, useEffect } from "react";
import api from "@/utils/api";
import { toast } from "react-toastify";
import CurriculumSidebar from "@/components/courses/CurriculumSidebar";
import VideoPlayer from "@/components/courses/VideoPlayer";
import { FaSpinner } from "react-icons/fa";
import { useRouter } from "next/navigation";

const CoursePlayer = ({ slug }) => {
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the currently playing lecture
  const [currentLecture, setCurrentLecture] = useState(null);

  // State to track completed lectures
  const [completedLectures, setCompletedLectures] = useState([]);

  useEffect(() => {
    const fetchCourseContent = async () => {
      try {
        const res = await api.get(`/api/courses/${slug}/watch`);
        if (res.data.success) {
          setCourse(res.data.data);

          // Fetch enrollment status/progress
          const enrollRes = await api.get(`/api/enrollments/check/${slug}`);
          if (enrollRes.data.success && enrollRes.data.enrollment) {
             setEnrollment(enrollRes.data.enrollment);
             setCompletedLectures(enrollRes.data.enrollment.completedLectures || []);
          }
        }
      } catch (err) {
        console.error(err);
        if (err.response?.status === 403 || err.response?.status === 401) {
          setError("unauthorized");
        } else {
          setError("fetch_failed");
        }
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCourseContent();
    }
  }, [slug]);

  // Set the first lecture as the current one on initial load
  useEffect(() => {
    if (course?.sections?.[0]?.lectures?.[0] && !currentLecture) {
      setCurrentLecture(course.sections[0].lectures[0]);
    }
  }, [course]);

  // Function to mark a lecture as complete and save progress
  const markLectureAsComplete = async (lectureId) => {
    if (!lectureId || completedLectures.includes(lectureId) || !enrollment) return;

    // Update state immediately for instant UI feedback
    const updatedCompleted = [...completedLectures, lectureId];
    setCompletedLectures(updatedCompleted);

    try {
      // API call to persist the progress
      await api.post(`/api/enrollments/${enrollment._id}/progress`, { lectureId });
    } catch (error) {
      console.error(error);
      // toast.error("Couldn't save progress.");
    }
  };

  // Find and play the next lecture in the sequence
  const playNextLecture = () => {
    if (!currentLecture || !course) return;

    let foundCurrent = false;
    for (const section of course.sections) {
      for (const lecture of section.lectures) {
        if (foundCurrent) {
          // This is the next lecture
          setCurrentLecture(lecture);
          return;
        }
        if (lecture._id === currentLecture._id) {
          foundCurrent = true;
        }
      }
    }
    // If we reach the end
    toast.success("Congratulations! You've completed the course!");
  };

  const handleVideoEnded = () => {
    if (currentLecture) {
        markLectureAsComplete(currentLecture._id);
        playNextLecture();
    }
  };

  const playPreviousLecture = () => {
    if (!currentLecture || !course) return;

    let prevLecture = null;
    for (const section of course.sections) {
      for (const lecture of section.lectures) {
        if (lecture._id === currentLecture._id) {
          if (prevLecture) {
            setCurrentLecture(prevLecture);
            return;
          }
        }
        prevLecture = lecture;
      }
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
        <FaSpinner className="animate-spin text-4xl" />
      </div>
    );
  }

  if (error === "unauthorized") {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <h1 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h1>
        <p className="text-gray-700 mb-4">You must be enrolled and approved to watch this course.</p>
        <button
            onClick={() => router.push(`/ielts/${slug}`)}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
            Go to Course Page
        </button>
      </div>
    );
  }

  if (!course) {
      return <div className="p-8 text-center">Course not found</div>;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 overflow-hidden">
      {/* Main Content: Video Player */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-900 flex flex-col items-center justify-center">
           <div className="w-full max-w-5xl">
              <VideoPlayer lecture={currentLecture} onVideoEnded={handleVideoEnded} />

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-4 text-white">
                <button
                  onClick={playPreviousLecture}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg disabled:opacity-50 transition"
                  disabled={!currentLecture}
                >
                  Previous
                </button>
                <button
                  onClick={playNextLecture}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                >
                  Next
                </button>
              </div>
           </div>
        </div>
      </main>

      {/* Sidebar: Curriculum */}
      <aside className="w-full md:w-96 bg-white border-l border-gray-200 flex-shrink-0 overflow-y-auto h-1/3 md:h-full">
        <CurriculumSidebar
          course={course}
          currentLecture={currentLecture}
          completedLectures={completedLectures}
          onSelectLecture={(lecture) => setCurrentLecture(lecture)}
        />
      </aside>
    </div>
  );
};

export default CoursePlayer;
