'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaVideo,
  FaExternalLinkAlt,
  FaSearch,
  FaPlus,
  FaClock,
  FaUsers,
  FaChartLine,
} from 'react-icons/fa';

const AdminTutorialsPage = () => {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTutorial, setEditingTutorial] = useState(null);

  const fetchTutorials = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/tutorials');
      setTutorials(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch tutorials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutorials();
  }, []);

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this tutorial?'))
      return;
    try {
      await axios.delete(`http://localhost:5000/api/tutorials/${id}`);
      toast.success('Tutorial deleted successfully');
      setTutorials(prev => prev.filter(t => t._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete tutorial');
    }
  };

  // Open edit modal
  const openEditModal = tutorial => {
    setEditingTutorial(tutorial);
    setIsEditModalOpen(true);
  };

  const handleEditChange = e => {
    const { name, value } = e.target;
    setEditingTutorial(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/tutorials/${editingTutorial._id}`,
        editingTutorial
      );
      toast.success('Tutorial updated successfully');
      setTutorials(prev =>
        prev.map(t => (t._id === editingTutorial._id ? editingTutorial : t))
      );
      setIsEditModalOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update tutorial');
    }
  };

  const filteredTutorials = tutorials.filter(
    tutorial =>
      tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutorial.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Calculate statistics
  const totalTutorials = tutorials.length;
  const totalDuration = tutorials.reduce(
    (total, tut) => total + (parseInt(tut.duration) || 0),
    0
  );
  const categoriesCount = new Set(tutorials.map(t => t.category)).size;
  const averageDuration =
    totalTutorials > 0 ? (totalDuration / totalTutorials).toFixed(1) : 0;

  return (
    <div className="min-h-screen  py-8 ">
      <div className="">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Tutorial Management
              </h1>
              <p className="text-gray-600">
                Manage and organize your educational content
              </p>
            </div>
            <button
              onClick={() => (window.location.href = '/dashboard/add-tutorial')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <FaPlus className="w-4 h-4" />
              <span>Add New Tutorial</span>
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Tutorials Card */}
          <div className="bg-white  shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Tutorials
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {totalTutorials}
                </p>
                <p className="text-xs text-green-600 font-medium mt-2">
                  +12% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FaVideo className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Categories Card */}
          <div className="bg-white  shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Categories</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {categoriesCount}
                </p>
                <p className="text-xs text-blue-600 font-medium mt-2">
                  Diverse content areas
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <FaChartLine className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Total Duration Card */}
          <div className="bg-white  shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Duration
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {totalDuration}h
                </p>
                <p className="text-xs text-purple-600 font-medium mt-2">
                  {averageDuration}h average
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <FaClock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Active Students Card */}
          <div className="bg-white  shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Active Students
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">1,247</p>
                <p className="text-xs text-orange-600 font-medium mt-2">
                  +23 this week
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <FaUsers className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Table Section */}
        <div className="bg-white  shadow-sm border border-gray-100 p-6">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search tutorials by title or description..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <FaSearch className="text-gray-400" />
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600">
              Showing{' '}
              <span className="font-semibold">{filteredTutorials.length}</span>{' '}
              of <span className="font-semibold">{totalTutorials}</span>{' '}
              tutorials
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear search
              </button>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tutorial
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
                {filteredTutorials.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-6 py-12 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaSearch className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No tutorials found
                      </h3>
                      <p className="text-gray-500">
                        {searchTerm
                          ? 'Try adjusting your search terms'
                          : 'No tutorials available'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredTutorials.map(t => (
                    <tr
                      key={t._id}
                      className="hover:bg-gray-50 transition duration-150 group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                            {t.thumbnail ? (
                              <img
                                src={t.thumbnail}
                                alt={t.title}
                                className="w-12 h-12 rounded-xl object-cover"
                              />
                            ) : (
                              <FaVideo className="w-6 h-6 text-white" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                              {t.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                              {t.description || 'No description available'}
                            </p>
                            <a
                              href={t.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-700 mt-2 transition-colors"
                            >
                              <span>Watch Tutorial</span>
                              <FaExternalLinkAlt className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="">
                        <div className="text-sm text-gray-900">
                          {formatDate(t.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => openEditModal(t)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition duration-200 border border-transparent hover:border-green-200"
                            title="Edit Tutorial"
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(t._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition duration-200 border border-transparent hover:border-red-200"
                            title="Delete Tutorial"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                          <a
                            href={t.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition duration-200 border border-transparent hover:border-blue-200"
                            title="View Tutorial"
                          >
                            <FaEye className="w-4 h-4" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Modal */}
        {isEditModalOpen && editingTutorial && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white  w-full max-w-md p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Edit Tutorial
                </h2>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editingTutorial.title}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video URL
                  </label>
                  <input
                    type="url"
                    name="videoUrl"
                    value={editingTutorial.videoUrl}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={editingTutorial.description}
                    onChange={handleEditChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-none"
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-200 font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTutorialsPage;
