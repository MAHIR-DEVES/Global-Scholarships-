"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "@/utils/api";
import { FaPlus, FaTrash, FaUpload, FaSpinner, FaSave, FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

const EditCoursePage = ({ params }) => {
  const router = useRouter();
  const { id } = params; // Course ID from URL

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    sections: [],
    thumbnailUrl: "",
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch Course Data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/api/courses/${id}`);
        if (res.data.success) {
          const data = res.data.data;
          setCourseData({
            title: data.title,
            description: data.description,
            price: data.price,
            category: data.category,
            sections: data.sections || [],
            thumbnailUrl: data.thumbnailUrl,
          });
          setThumbnailPreview(data.thumbnailUrl);
        }
      } catch (error) {
        toast.error("Failed to fetch course details");
        router.push("/dashboard/all-tutorial");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, router]);

  // === HANDLERS (Similar to Add Page) ===
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

  // Section Handlers
  const addSection = () => {
    setCourseData((prev) => ({
      ...prev,
      sections: [...prev.sections, { title: "", lectures: [] }],
    }));
  };

  const removeSection = (index) => {
    setCourseData((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };

  const handleSectionChange = (index, e) => {
    const { name, value } = e.target;
    setCourseData((prev) => {
      const newSections = [...prev.sections];
      newSections[index] = { ...newSections[index], [name]: value };
      return { ...prev, sections: newSections };
    });
  };

  // Lecture Handlers
  const addLecture = (sectionIndex) => {
    setCourseData((prev) => {
      const newSections = [...prev.sections];
      newSections[sectionIndex].lectures.push({
        title: "",
        videoUrl: "",
        duration: "",
      });
      return { ...prev, sections: newSections };
    });
  };

  const removeLecture = (sectionIndex, lectureIndex) => {
    setCourseData((prev) => {
      const newSections = [...prev.sections];
      newSections[sectionIndex].lectures = newSections[sectionIndex].lectures.filter(
        (_, i) => i !== lectureIndex
      );
      return { ...prev, sections: newSections };
    });
  };

  const handleLectureChange = (sectionIndex, lectureIndex, e) => {
    const { name, value } = e.target;
    setCourseData((prev) => {
      const newSections = [...prev.sections];
      newSections[sectionIndex].lectures[lectureIndex] = {
        ...newSections[sectionIndex].lectures[lectureIndex],
        [name]: value,
      };
      return { ...prev, sections: newSections };
    });
  };

  // === SUBMIT ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let uploadedThumbnailUrl = courseData.thumbnailUrl;

      // 1. Upload new thumbnail if selected
      if (thumbnail) {
        const imageFormData = new FormData();
        imageFormData.append("file", thumbnail);
        // Assuming you have an upload endpoint
        // const uploadRes = await api.post("/api/upload", imageFormData);
        // uploadedThumbnailUrl = uploadRes.data.url;
        console.log("Thumbnail upload logic would go here");
      }

      // 2. Prepare Payload
      const payload = {
        ...courseData,
        thumbnailUrl: uploadedThumbnailUrl,
        price: Number(courseData.price) || 0,
        // Clean up sections/lectures if needed (e.g. ensure numbers)
        sections: courseData.sections.map(sec => ({
            ...sec,
            lectures: sec.lectures.map(lec => ({
                ...lec,
                duration: Number(lec.duration) || 0
            }))
        }))
      };

      // 3. Update Course
      const response = await api.put(`/api/courses/${id}`, payload);

      if (response.data.success) {
        toast.success("Course updated successfully!");
        router.push("/dashboard/all-tutorial");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update course");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
        >
          <FaArrowLeft className="mr-2" /> Back to Courses
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Course</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="label">Title</label>
                <input
                  name="title"
                  value={courseData.title}
                  onChange={handleCourseChange}
                  className="input-style w-full"
                  required
                />
              </div>
              <div>
                <label className="label">Category</label>
                <input
                  name="category"
                  value={courseData.category}
                  onChange={handleCourseChange}
                  className="input-style w-full"
                  required
                />
              </div>
              <div>
                <label className="label">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={courseData.price}
                  onChange={handleCourseChange}
                  className="input-style w-full"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="label">Description</label>
                <textarea
                  name="description"
                  value={courseData.description}
                  onChange={handleCourseChange}
                  rows="4"
                  className="input-style w-full"
                />
              </div>
              <div className="md:col-span-2">
                <label className="label">Thumbnail</label>
                <div className="flex items-center gap-4">
                  {thumbnailPreview && (
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail"
                      className="w-32 h-20 object-cover rounded-lg"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="file-input file-input-bordered w-full max-w-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Curriculum */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Curriculum</h2>
              <button
                type="button"
                onClick={addSection}
                className="btn-primary flex items-center gap-2"
              >
                <FaPlus /> Add Section
              </button>
            </div>

            <div className="space-y-6">
              {courseData.sections.map((section, sIndex) => (
                <div key={sIndex} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-bold text-gray-500">Section {sIndex + 1}:</span>
                    <input
                      name="title"
                      value={section.title}
                      onChange={(e) => handleSectionChange(sIndex, e)}
                      placeholder="Section Title"
                      className="input-style flex-grow"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => removeSection(sIndex)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  {/* Lectures */}
                  <div className="pl-4 border-l-2 border-gray-200 space-y-3">
                    {section.lectures.map((lecture, lIndex) => (
                      <div key={lIndex} className="flex flex-col md:flex-row gap-3 bg-white p-3 rounded shadow-sm">
                        <input
                          name="title"
                          value={lecture.title}
                          onChange={(e) => handleLectureChange(sIndex, lIndex, e)}
                          placeholder="Lecture Title"
                          className="input-style flex-grow"
                          required
                        />
                        <input
                          name="videoUrl"
                          value={lecture.videoUrl}
                          onChange={(e) => handleLectureChange(sIndex, lIndex, e)}
                          placeholder="Video URL"
                          className="input-style md:w-1/3"
                          required
                        />
                        <input
                          type="number"
                          name="duration"
                          value={lecture.duration}
                          onChange={(e) => handleLectureChange(sIndex, lIndex, e)}
                          placeholder="Duration (s)"
                          className="input-style md:w-24"
                        />
                        <button
                          type="button"
                          onClick={() => removeLecture(sIndex, lIndex)}
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addLecture(sIndex)}
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-2"
                    >
                      <FaPlus size={12} /> Add Lecture
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="btn-submit flex items-center gap-2 text-lg px-8 py-3"
            >
              {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
              {saving ? "Saving Changes..." : "Update Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCoursePage;
