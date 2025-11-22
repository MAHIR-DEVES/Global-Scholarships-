"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "@/utils/api";
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaPlus,
  FaClock,
  FaVideo,
  FaChartLine,
  FaCheck,
  FaTimes,
  FaUserGraduate,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

const AdminCoursesPage = () => {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [pendingEnrollments, setPendingEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [coursesRes, enrollmentsRes] = await Promise.all([
        api.get("/api/courses"),
        api.get("/api/enrollments"),
      ]);

      setCourses(coursesRes.data.data || []);

      const allEnrollments = enrollmentsRes.data.data || [];
      setPendingEnrollments(allEnrollments.filter(e => e.status === 'pending'));

    } catch (error) {
      toast.error("Failed to fetch data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await api.delete(`/api/courses/${id}`);
      toast.success("Course deleted successfully");
      setCourses((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete course");
    }
  };

  const handleEnrollmentAction = async (id, status) => {
    try {
      await api.put(`/api/enrollments/${id}`, { status });
      toast.success(`Enrollment ${status}`);
      // Remove from pending list
      setPendingEnrollments(prev => prev.filter(e => e._id !== id));
    } catch (error) {
      toast.error("Failed to update enrollment");
    }
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Stats
  const totalCourses = courses.length;
  const totalLectures = courses.reduce((acc, course) => {
    return (
      acc +
      (course.sections?.reduce(
        (secAcc, sec) => secAcc + (sec.lectures?.length || 0),
        0
      ) || 0)
    );
  }, 0);
  const categoriesCount = new Set(courses.map((c) => c.category)).size;

  return (
    <div className="min-h-screen py-8">
      <div className="">
        {/* Header Section */}
        <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dashboard Overview
            </h1>
            <p className="text-gray-600">Manage courses and enrollments</p>
          </div>
          <button
            onClick={() => router.push("/dashboard/add-tutorial")}
            className="btn-primary flex items-center gap-2 mt-4 lg:mt-0"
          >
            <FaPlus /> Add New Course
          </button>
        </div>

        {/* PENDING ENROLLMENTS SECTION */}
        {pendingEnrollments.length > 0 && (
          <div className="mb-10 bg-white rounded-xl shadow-sm border border-yellow-200 overflow-hidden">
            <div className="bg-yellow-50 px-6 py-4 border-b border-yellow-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-yellow-800 flex items-center gap-2">
                <FaClock /> Pending Enrollment Requests ({pendingEnrollments.length})
              </h2>
              <button
                onClick={() => router.push('/dashboard/enrollments')}
                className="text-sm text-yellow-700 hover:underline"
              >
                View All Enrollments
              </button>
            </div>
            <div className="divide-y divide-gray-100">
              {pendingEnrollments.slice(0, 5).map((enrollment) => (
                <div key={enrollment._id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                      <FaUserGraduate />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{enrollment.user?.name || 'Unknown User'}</p>
                      <p className="text-sm text-gray-500">{enrollment.course?.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-900">
                        ${enrollment.course?.price}
                    </span>
                    <button
                      onClick={() => handleEnrollmentAction(enrollment._id, 'approved')}
                      className="p-2 bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
                      title="Approve"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => handleEnrollmentAction(enrollment._id, 'rejected')}
                      className="p-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                      title="Reject"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              ))}
              {pendingEnrollments.length > 5 && (
                  <div className="p-3 text-center text-sm text-gray-500">
                      And {pendingEnrollments.length - 5} more...
                  </div>
              )}
            </div>
          </div>
        )}

        {/* STATISTICS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Courses</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{totalCourses}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
              <FaVideo />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Lectures</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{totalLectures}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
              <FaClock />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Categories</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{categoriesCount}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
              <FaChartLine />
            </div>
          </div>
        </div>

        {/* COURSES TABLE */}
        <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-xl font-bold text-gray-900">All Courses</h2>
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCourses.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      No courses found.
                    </td>
                  </tr>
                ) : (
                  filteredCourses.map((course) => (
                    <tr key={course._id} className="hover:bg-gray-50 group">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
                            {course.thumbnailUrl ? (
                              <img src={course.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <FaVideo className="w-full h-full p-3 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900 line-clamp-1">{course.title}</div>
                            <div className="text-xs text-gray-500 line-clamp-1">{course.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">${course.price}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {course.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{formatDate(course.createdAt)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => router.push(`/dashboard/edit-course/${course._id}`)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteCourse(course._id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCoursesPage;
