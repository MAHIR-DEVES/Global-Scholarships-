"use client";

import React, { useState, useEffect } from "react";
import api from "@/utils/api";
import { toast } from "react-toastify";
import CurriculumSidebar from "@/components/courses/CurriculumSidebar";
import VideoPlayer from "@/components/courses/VideoPlayer";

const CoursePlayer = ({ courseData }) => {
  const { course, enrollment } = courseData; // Assuming API returns this structure

  // State for the currently playing lecture
  const [currentLecture, setCurrentLecture] = useState(null);

  // State to track completed lectures
  const [completedLectures, setCompletedLectures] = useState(
    enrollment?.completedLectures || []
  );

  // Set the first lecture as the current one on initial load
  useEffect(() => {
    if (course?.sections?.[0]?.lectures?.[0]) {
      setCurrentLecture(course.sections[0].lectures[0]);
    }
  }, [course]);

  // Function to mark a lecture as complete and save progress
  const markLectureAsComplete = async (lectureId) => {
    if (!lectureId || completedLectures.includes(lectureId)) return;

    // Update state immediately for instant UI feedback
    const updatedCompleted = [...completedLectures, lectureId];
    setCompletedLectures(updatedCompleted);

    try {
      // API call to persist the progress
      await api.post(`/enrollments/${enrollment._id}/progress`, { lectureId });
    } catch (error) {
      toast.error("Couldn't save progress. Please check your connection.");
      // Revert state if API call fails
      setCompletedLectures(completedLectures);
    }
  };

  // Find and play the next lecture in the sequence
  const playNextLecture = () => {
    if (!currentLecture) return;

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
    markLectureAsComplete(currentLecture._id);
    playNextLecture();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content: Video Player */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <VideoPlayer lecture={currentLecture} onVideoEnded={handleVideoEnded} />
      </main>

      {/* Sidebar: Curriculum */}
      <aside className="w-full md:w-80 lg:w-96 flex-shrink-0">
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
