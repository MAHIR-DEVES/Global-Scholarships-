'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '@/utils/api';
import { FaImage, FaUpload, FaTimes } from 'react-icons/fa';

const AddTutorialPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    videoUrl: '',
    description: '',
    duration: '',
    lesson: '',
  });
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');

  // Handle input change
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle thumbnail upload
  const handleThumbnailChange = e => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      setThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => setThumbnailPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Remove thumbnail
  const removeThumbnail = () => {
    setThumbnail(null);
    setThumbnailPreview('');
  };

  // Handle form submit
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = '';

      // Step 1: Upload to Cloudinary if thumbnail exists
      if (thumbnail) {
        const imageData = new FormData();
        imageData.append('file', thumbnail);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: imageData,
        });

        const uploadResult = await uploadRes.json();
        if (uploadResult.success) {
          imageUrl = uploadResult.url;
        } else {
          toast.error('Image upload failed');
          setLoading(false);
          return;
        }
      }

      // Step 2: Submit tutorial data (with imageUrl)
      const tutorialData = {
        ...formData,
        thumbnailUrl: imageUrl,
      };

      console.log(tutorialData);

      // const response = await api.post('/api/tutorials', tutorialData);

      if (response?.data?.status) {
        toast.success(`${response?.data?.message}`);
        setFormData({
          title: '',
          videoUrl: '',
          description: '',
          duration: '',
          lesson: '',
        });
        removeThumbnail();
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className=" mx-auto">
        {/* Header */}
        <div className=" mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Add New Tutorial
          </h1>
          <p className="text-gray-600">
            Create engaging learning content for students
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Thumbnail Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Tutorial Thumbnail
                </label>
                <div className="flex items-center justify-center">
                  <div className="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-2xl hover:border-blue-400 transition-colors duration-200">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {thumbnailPreview ? (
                      <div className="relative w-full h-full">
                        <img
                          src={thumbnailPreview}
                          alt="Thumbnail preview"
                          className="w-full h-full object-cover rounded-2xl"
                        />
                        <button
                          type="button"
                          onClick={removeThumbnail}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          <FaTimes className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <FaUpload className="w-8 h-8 mb-2" />
                        <span className="text-xs">Upload Image</span>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Recommended: 16:9 ratio, max 5MB
                </p>
              </div>

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

              {/* Duration and Video URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    placeholder="e.g., 2 hours 30 min"
                  />
                </div>
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
              </div>

              {/* Lesson */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lesson
                </label>
                <input
                  name="lesson"
                  value={formData.lesson}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="lesson..."
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

              {/* Submit & Clear Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Adding Tutorial...</span>
                    </>
                  ) : (
                    <>
                      <FaUpload className="w-5 h-5" />
                      <span>Create Tutorial</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      title: '',
                      videoUrl: '',
                      description: '',
                      duration: '',
                      lesson: '',
                    });
                    removeThumbnail();
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition duration-200 font-medium"
                >
                  Clear Form
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-blue-900 mb-3 flex items-center">
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Quick Tips
          </h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• Use a short and clear title for your tutorial</li>
            <li>• Provide YouTube embed URLs for easy video viewing</li>
            <li>• Write lessons that are structured and easy to follow</li>
            <li>• Use high-quality thumbnails to attract learners</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddTutorialPage;
