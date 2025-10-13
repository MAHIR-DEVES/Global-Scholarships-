'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '@/utils/api';

const AddTutorialPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    videoUrl: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/api/tutorials', formData);

      if (response?.data?.status) {
        toast.success(`${response?.data?.message}`);
        setFormData({ title: '', videoUrl: '', description: '' });
      } else {
        toast.error('Failed to add tutorial');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add tutorial');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" py-8 ">
      <div className=" mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Add New Tutorial
        </h1>
        <p className="text-gray-600">
          Create engaging learning content for students
        </p>
      </div>

      <div className="bg-white overflow-hidden">
        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tutorial Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Enter an engaging tutorial title"
              />
            </div>

            {/* Video URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video URL *
              </label>
              <input
                type="url"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="https://youtube.com/embed/..."
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-none"
                placeholder="Describe what students will learn in this tutorial..."
              ></textarea>
            </div>

            {/* Submit & Clear */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? 'Adding Tutorial...' : 'Create Tutorial'}
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormData({ title: '', videoUrl: '', description: '' })
                }
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition duration-200 font-medium"
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTutorialPage;
