"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "@/utils/api";
import {
  FaCheck,
  FaTimes,
  FaSearch,
  FaUserGraduate,
  FaBook,
} from "react-icons/fa";

const EnrollmentManagementPage = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchEnrollments = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/enrollments");
      setEnrollments(response.data.data || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch enrollments"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.put(`/api/enrollments/${id}`, { status });
      toast.success(`Enrollment ${status} successfully`);
      setEnrollments((prev) =>
        prev.map((e) => (e._id === id ? { ...e, status } : e))
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update enrollment status"
      );
    }
  };

  const filteredEnrollments = enrollments.filter(
    (enrollment) =>
      enrollment.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.user?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.course?.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Enrollment Management
          </h1>
          <p className="text-gray-600">
            Manage student enrollments and approve payments
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Pending</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {enrollments.filter((e) => e.status === "pending").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <FaUserGraduate className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Approved</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {enrollments.filter((e) => e.status === "approved").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <FaCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {enrollments.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FaBook className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Table */}
        <div className="bg-white shadow-sm border border-gray-100 p-6 rounded-xl">
          <div className="mb-6">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search by student or course..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <FaSearch className="text-gray-400" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEnrollments.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <p className="text-gray-500">No enrollments found</p>
                    </td>
                  </tr>
                ) : (
                  filteredEnrollments.map((enrollment) => (
                    <tr key={enrollment._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {enrollment.user?.name || "Unknown User"}
                            </div>
                            <div className="text-sm text-gray-500">
                              {enrollment.user?.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {enrollment.course?.title || "Unknown Course"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          ${enrollment.course?.price}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            enrollment.status
                          )}`}
                        >
                          {enrollment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {new Date(enrollment.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {enrollment.status === "pending" && (
                            <>
                              <button
                                onClick={() =>
                                  handleStatusUpdate(enrollment._id, "approved")
                                }
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition duration-200"
                                title="Approve"
                              >
                                <FaCheck />
                              </button>
                              <button
                                onClick={() =>
                                  handleStatusUpdate(enrollment._id, "rejected")
                                }
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition duration-200"
                                title="Reject"
                              >
                                <FaTimes />
                              </button>
                            </>
                          )}
                          {enrollment.status !== "pending" && (
                            <span className="text-xs text-gray-400">
                              {enrollment.status === "approved"
                                ? "Approved"
                                : "Rejected"}
                            </span>
                          )}
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

export default EnrollmentManagementPage;
