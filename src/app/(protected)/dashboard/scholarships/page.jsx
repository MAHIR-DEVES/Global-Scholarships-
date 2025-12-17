'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getAllScholarships, deleteScholarship } from '@/lib/scholarshipApi';
import { FaEdit, FaTrash, FaEye, FaPlus } from 'react-icons/fa';

const AllScholarshipsPage = () => {
  const router = useRouter();
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null, name: '' });

  // Fetch scholarships from API
  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    try {
      setLoading(true);
      const data = await getAllScholarships({ limit: 100 });
      setScholarships(data.data || []);
    } catch (error) {
      console.error('Error fetching scholarships:', error);
      toast.error('Failed to load scholarships');
    } finally {
      setLoading(false);
    }
  };

  // Filter scholarships
  const filteredScholarships = scholarships.filter(scholarship => {
    const matchesSearch =
      scholarship.universityName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship.country?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'all' || scholarship.level === levelFilter;
    const matchesCountry = countryFilter === 'all' || scholarship.country === countryFilter;

    return matchesSearch && matchesLevel && matchesCountry;
  });

  // Handle delete
  const handleDeleteClick = (id, name) => {
    setDeleteModal({ show: true, id, name });
  };

  const confirmDelete = async () => {
    try {
      await deleteScholarship(deleteModal.id);
      toast.success('Scholarship deleted successfully!');
      setDeleteModal({ show: false, id: null, name: '' });
      fetchScholarships(); // Refresh list
    } catch (error) {
      console.error('Error deleting scholarship:', error);
      toast.error(error.message || 'Failed to delete scholarship');
    }
  };

  const cancelDelete = () => {
    setDeleteModal({ show: false, id: null, name: '' });
  };

  //Handle edit
  const handleEdit = (id) => {
    router.push(`/dashboard/edit-scholarship/${id}`);
  };

  // Handle view
  const handleView = (id) => {
    router.push(`/scholarships/${id}`);
  };

  // Get unique values for filters
  const countries = [...new Set(scholarships.map(s => s.country))].filter(Boolean);
  const levels = [...new Set(scholarships.map(s => s.level))].filter(Boolean);

  const getLevelColor = level => {
    switch (level) {
      case 'Bachelor':
        return 'bg-blue-100 text-blue-800';
      case 'Master':
        return 'bg-purple-100 text-purple-800';
      case 'PhD':
        return 'bg-orange-100 text-orange-800';
      case 'Diploma':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading scholarships...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                All Scholarships
              </h1>
              <p className="text-gray-600">
                Manage and track all scholarship opportunities
              </p>
            </div>
            <button
              onClick={() => router.push('/dashboard/add-scholarships')}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition duration-200 flex items-center gap-2 font-medium"
            >
              <FaPlus className="w-4 h-4" />
              Add New Scholarship
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Scholarships
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {scholarships.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Countries</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {countries.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🌍</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Study Levels</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {levels.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎓</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 gap-4">
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search scholarships by university, country..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <select
                value={levelFilter}
                onChange={e => setLevelFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              >
                <option value="all">All Levels</option>
                {levels.map(level => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              <select
                value={countryFilter}
                onChange={e => setCountryFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              >
                <option value="all">All Countries</option>
                {countries.map(country => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Scholarships Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    University
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Country
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tuition
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deadline
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredScholarships.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <p className="text-lg font-medium mb-2">No scholarships found</p>
                        <p className="text-sm">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredScholarships.map(scholarship => (
                    <tr
                      key={scholarship._id}
                      className="hover:bg-gray-50 transition duration-150"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-start space-x-3">
                          {scholarship.universityLogo && (
                            <img
                              src={scholarship.universityLogo}
                              alt={scholarship.universityName}
                              className="w-10 h-10 rounded-lg object-contain"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-gray-900 line-clamp-2">
                              {scholarship.universityName}
                            </div>
                            <div className="text-xs text-gray-500 mt-1 line-clamp-1">
                              {scholarship.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {scholarship.country}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(
                            scholarship.level
                          )}`}
                        >
                          {scholarship.level}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900">
                          {scholarship.tuitionFee}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {scholarship.applicationDeadline}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleView(scholarship._id)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition duration-150"
                            title="View"
                          >
                            <FaEye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(scholarship._id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition duration-150"
                            title="Edit"
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(scholarship._id, scholarship.universityName)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition duration-150"
                            title="Delete"
                          >
                            <FaTrash className="w-4 h-4" />
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

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 transform transition-all">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
              <FaTrash className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              Delete Scholarship
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete<br />
              <span className="font-semibold text-gray-900">{deleteModal.name}</span>?<br />
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={cancelDelete}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition duration-200 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllScholarshipsPage;
