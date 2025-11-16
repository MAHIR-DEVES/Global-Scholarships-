"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "@/utils/api"; // Your pre-configured Axios instance
import { FaPlus, FaTrash, FaUpload, FaSpinner } from "react-icons/fa";

// Initial state for a new course, mirroring our backend schema
const initialCourseState = {
  title: "",
  description: "",
  price: "",
  category: "",
  instructor: "60c72b2f9b1d8c001f8e4b1a",
  sections: [],
};

// Initial state for a new section
const newSection = () => ({
  // Using Date.now() for a unique key for React's mapping, won't be sent to backend
  id: Date.now(),
  title: "",
  lectures: [],
});

// Initial state for a new lecture
const newLecture = () => ({
  id: Date.now(),
  title: "",
  videoUrl: "",
  duration: "", // Duration will be a number in seconds
});

const AddCoursePage = () => {
  const [courseData, setCourseData] = useState(initialCourseState);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [loading, setLoading] = useState(false);

  // === GENERAL & COURSE HANDLERS ===
  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    } else {
      toast.error("Please select a valid image file.");
    }
  };

  // === SECTION HANDLERS ===
  const addSection = () => {
    setCourseData((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection()],
    }));
  };

  const removeSection = (sectionId) => {
    setCourseData((prev) => ({
      ...prev,
      sections: prev.sections.filter((sec) => sec.id !== sectionId),
    }));
  };

  const handleSectionChange = (sectionId, e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.id === sectionId ? { ...sec, [name]: value } : sec
      ),
    }));
  };

  // === LECTURE HANDLERS ===
  const addLecture = (sectionId) => {
    setCourseData((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.id === sectionId
          ? { ...sec, lectures: [...sec.lectures, newLecture()] }
          : sec
      ),
    }));
  };

  const removeLecture = (sectionId, lectureId) => {
    setCourseData((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.id === sectionId
          ? {
              ...sec,
              lectures: sec.lectures.filter((lec) => lec.id !== lectureId),
            }
          : sec
      ),
    }));
  };

  const handleLectureChange = (sectionId, lectureId, e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.id === sectionId
          ? {
              ...sec,
              lectures: sec.lectures.map((lec) =>
                lec.id === lectureId ? { ...lec, [name]: value } : lec
              ),
            }
          : sec
      ),
    }));
  };

  // === FORM SUBMISSION ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Validate Form
      if (!courseData.title || courseData.sections.length === 0) {
        toast.error("Course title and at least one section are required.");
        setLoading(false);
        return;
      }
      if (!thumbnail) {
        toast.error("A course thumbnail is required.");
        setLoading(false);
        return;
      }

      // 2. Upload Thumbnail to your backend endpoint for image uploads
      const imageFormData = new FormData();
      imageFormData.append("file", thumbnail);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: imageFormData,
      });
      const uploadResult = await uploadRes.json();
      console.log(uploadRes);

      // if (!uploadResult.success) {
      //   throw new Error("Image upload failed.");
      // }

      // 3. Prepare the final course data payload
      // Remove temporary 'id' fields from sections and lectures before sending
      const finalSections = courseData.sections.map(
        ({ id, ...restOfSection }) => ({
          ...restOfSection,
          lectures: restOfSection.lectures.map(({ id, ...restOfLecture }) => ({
            ...restOfLecture,
            // Ensure duration is a number
            duration: Number(restOfLecture.duration) || 0,
          })),
        })
      );

      const payload = {
        ...courseData,
        thumbnailUrl: uploadResult.url,
        price: Number(courseData.price) || 0,
        sections: finalSections,
      };

      // 4. Post the course data to your backend API
      const response = await api.post("/api/courses", payload);

      if (response.data.success) {
        toast.success("Course created successfully!");
        // Reset form to initial state
        setCourseData(initialCourseState);
        setThumbnail(null);
        setThumbnailPreview("");
      } else {
        throw new Error(response.data.message || "Failed to create course.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Create New Course
        </h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Course Details Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Course Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <input
                name="title"
                value={courseData.title}
                onChange={handleCourseChange}
                placeholder="Course Title"
                required
                className="input-style"
              />

              {/* Category */}
              <input
                name="category"
                value={courseData.category}
                onChange={handleCourseChange}
                placeholder="Category (e.g., Web Development)"
                required
                className="input-style"
              />

              {/* Description */}
              <textarea
                name="description"
                value={courseData.description}
                onChange={handleCourseChange}
                placeholder="Course Description"
                rows="4"
                className="md:col-span-2 input-style"
              />

              {/* Price */}
              <input
                type="number"
                name="price"
                value={courseData.price}
                onChange={handleCourseChange}
                placeholder="Price (USD)"
                required
                className="input-style"
              />

              {/* Thumbnail */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Thumbnail
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="file-input file-input-bordered w-full"
                />
                {thumbnailPreview && (
                  <img
                    src={thumbnailPreview}
                    alt="Preview"
                    className="mt-4 rounded-lg w-48 h-auto"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Sections & Lectures Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Course Content</h2>
              <button
                type="button"
                onClick={addSection}
                className="btn-primary flex items-center gap-2"
              >
                <FaPlus /> Add Section
              </button>
            </div>

            <div className="space-y-6">
              {courseData.sections.map((section) => (
                <div
                  key={section.id}
                  className="border border-gray-200 p-4 rounded-lg space-y-4"
                >
                  {/* Section Title */}
                  <div className="flex items-center gap-4">
                    <input
                      name="title"
                      value={section.title}
                      onChange={(e) => handleSectionChange(section.id, e)}
                      placeholder="Section Title (e.g., Introduction)"
                      required
                      className="input-style flex-grow"
                    />
                    <button
                      type="button"
                      onClick={() => removeSection(section.id)}
                      className="btn-danger"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  {/* Lectures */}
                  <div className="pl-4 border-l-2 border-gray-200 space-y-3">
                    {section.lectures.map((lecture) => (
                      <div key={lecture.id} className="flex items-center gap-2">
                        <input
                          name="title"
                          value={lecture.title}
                          onChange={(e) =>
                            handleLectureChange(section.id, lecture.id, e)
                          }
                          placeholder="Lecture Title"
                          required
                          className="input-style w-1/3"
                        />
                        <input
                          name="videoUrl"
                          value={lecture.videoUrl}
                          onChange={(e) =>
                            handleLectureChange(section.id, lecture.id, e)
                          }
                          placeholder="Video URL"
                          required
                          className="input-style w-1/3"
                        />
                        <input
                          type="number"
                          name="duration"
                          value={lecture.duration}
                          onChange={(e) =>
                            handleLectureChange(section.id, lecture.id, e)
                          }
                          placeholder="Duration (sec)"
                          required
                          className="input-style w-1/6"
                        />
                        <button
                          type="button"
                          onClick={() => removeLecture(section.id, lecture.id)}
                          className="btn-danger-sm"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addLecture(section.id)}
                      className="btn-secondary flex items-center gap-2 mt-2"
                    >
                      <FaPlus /> Add Lecture
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="btn-submit flex items-center gap-2"
            >
              {loading ? <FaSpinner className="animate-spin" /> : <FaUpload />}
              {loading ? "Creating Course..." : "Create Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCoursePage;
