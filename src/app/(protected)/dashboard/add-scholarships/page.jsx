'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  FaPlus,
  FaTrash,
  FaUniversity,
  FaGlobe,
  FaGraduationCap,
  FaDollarSign,
  FaCalendar,
  FaLanguage,
  FaLink,
  FaEnvelope,
  FaPlay,
} from 'react-icons/fa';
import { FaRankingStar } from 'react-icons/fa6';

const AddScholarships = () => {
  const [formData, setFormData] = useState({
    universityName: '',
    country: '',
    description: '',
    universityLogo: '',
    website: '',
    contactEmail: '',
    majors: [''],
    videoUrl: '',
    worldRanking: '',
    level: '',
    duration: '',
    tuitionFee: '',
    applicationDeadline: '',
    applicationStartDate: '',
    languageRequirement: '',
    additionalInfo: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState('university');

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMajorsChange = (index, value) => {
    const updatedMajors = [...formData.majors];
    updatedMajors[index] = value;
    setFormData({ ...formData, majors: updatedMajors });
  };

  const addMajor = () => {
    setFormData({ ...formData, majors: [...formData.majors, ''] });
  };

  const removeMajor = index => {
    if (formData.majors.length <= 1) return;
    const updatedMajors = formData.majors.filter((_, i) => i !== index);
    setFormData({ ...formData, majors: updatedMajors });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('http://localhost:5000/api/scholarships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message);
        setFormData({
          universityName: '',
          country: '',
          description: '',
          universityLogo: '',
          website: '',
          contactEmail: '',
          majors: [''],
          videoUrl: '',
          worldRanking: '',
          level: '',
          duration: '',
          tuitionFee: '',
          applicationDeadline: '',
          applicationStartDate: '',
          languageRequirement: '',
          additionalInfo: '',
        });
      } else {
        toast.error(result.message || 'Something went wrong');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to submit scholarship');
    } finally {
      setIsSubmitting(false);
    }
  };

  const countries = [
    'China',
    'Malaysia',
    'USA',
    'UK',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'Japan',
    'South Korea',
  ];
  const levels = ['Diploma', 'Bachelor', 'Master', 'PhD'];

  return (
    <div className=" py-8">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Add New Scholarship
          </h1>
          <p className="text-gray-600 text-lg ">
            Create comprehensive scholarship opportunities for international
            students
          </p>
        </div>

        {/* Progress Navigation */}
        <div className="bg-white rounded-xs shadow-sm border border-gray-100 p-2 mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              {
                id: 'university',
                label: 'University Info',
                icon: FaUniversity,
              },
              {
                id: 'program',
                label: 'Program Details',
                icon: FaGraduationCap,
              },
              { id: 'application', label: 'Application', icon: FaCalendar },
            ].map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                  activeSection === section.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <section.icon className="w-4 h-4" />
                <span>{section.label}</span>
              </button>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xs shadow-xs border border-gray-100 overflow-hidden"
        >
          {/* University Information Section */}
          {activeSection === 'university' && (
            <div className="p-6 sm:p-8 space-y-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FaUniversity className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    University Information
                  </h2>
                  <p className="text-gray-600">
                    Basic details about the university
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* University Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    University Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="universityName"
                      value={formData.universityName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      placeholder="Enter university name"
                      required
                    />
                    <FaUniversity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country *
                  </label>
                  <div className="relative">
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 appearance-none"
                      required
                    >
                      <option value="">Select Country</option>
                      {countries.map(country => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                    <FaGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>

                {/* World Ranking */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    World Ranking
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="worldRanking"
                      value={formData.worldRanking}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      placeholder="e.g., #150 QS Ranking"
                    />
                    <FaRankingStar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>

                {/* University Logo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    University Logo URL
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="universityLogo"
                      value={formData.universityLogo}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      placeholder="https://example.com/logo.png"
                    />
                    <FaLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>

                {/* Website */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      placeholder="https://university.edu"
                    />
                    <FaLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>

                {/* Contact Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      placeholder="admissions@university.edu"
                    />
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>

                {/* Video URL */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Campus Tour Video URL
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="videoUrl"
                      value={formData.videoUrl}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      placeholder="https://youtube.com/embed/campus-tour"
                    />
                    <FaPlay className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>

                {/* Description */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    University Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-none"
                    rows="4"
                    placeholder="Describe the university, its facilities, and academic excellence..."
                    required
                  ></textarea>
                </div>

                {/* Majors */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Available Majors
                  </label>
                  <div className="space-y-3">
                    {formData.majors.map((major, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="flex-1">
                          <input
                            type="text"
                            value={major}
                            onChange={e =>
                              handleMajorsChange(index, e.target.value)
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                            placeholder="Enter major name (e.g., Computer Science)"
                          />
                        </div>
                        {formData.majors.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeMajor(index)}
                            className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition duration-200"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addMajor}
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <FaPlus className="w-4 h-4" />
                      <span>Add Another Major</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setActiveSection('program')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition duration-200 font-medium shadow-lg hover:shadow-xl"
                >
                  Next: Program Details
                </button>
              </div>
            </div>
          )}

          {/* Program Details Section */}
          {activeSection === 'program' && (
            <div className="p-6 sm:p-8 space-y-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <FaGraduationCap className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Program Details
                  </h2>
                  <p className="text-gray-600">Academic program information</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Program Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Program Level *
                  </label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    required
                  >
                    <option value="">Select Level</option>
                    {levels.map(level => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration *
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    placeholder="e.g., 4 years, 2 semesters"
                    required
                  />
                </div>

                {/* Tuition Fee */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tuition Fee *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="tuitionFee"
                      value={formData.tuitionFee}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      placeholder="$15,000 per year"
                      required
                    />
                    <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>

                {/* Language Requirement */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language Requirement
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="languageRequirement"
                      value={formData.languageRequirement}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      placeholder="IELTS 6.5 or TOEFL 80"
                    />
                    <FaLanguage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>

                {/* Additional Info */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Program Information
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-none"
                    rows="4"
                    placeholder="Scholarship coverage, eligibility criteria, benefits, etc."
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setActiveSection('university')}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition duration-200 font-medium"
                >
                  Back to University Info
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('application')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition duration-200 font-medium shadow-lg hover:shadow-xl"
                >
                  Next: Application Details
                </button>
              </div>
            </div>
          )}

          {/* Application Details Section */}
          {activeSection === 'application' && (
            <div className="p-6 sm:p-8 space-y-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <FaCalendar className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Application Details
                  </h2>
                  <p className="text-gray-600">
                    Deadlines and application process
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Application Start Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Application Start Date *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="applicationStartDate"
                      value={formData.applicationStartDate}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      placeholder="e.g., January 15, 2025"
                      required
                    />
                    <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>

                {/* Application Deadline */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Application Deadline *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="applicationDeadline"
                      value={formData.applicationDeadline}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      placeholder="e.g., August 30, 2025"
                      required
                    />
                    <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setActiveSection('program')}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition duration-200 font-medium"
                >
                  Back to Program Details
                </button>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setActiveSection('university')}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition duration-200 font-medium"
                  >
                    Save as Draft
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <FaPlus className="w-4 h-4" />
                        <span>Create Scholarship</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>

        {/* Quick Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xs p-6">
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
            Scholarship Creation Tips
          </h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• Provide accurate and up-to-date university information</li>
            <li>
              • Include all available majors to attract diverse applicants
            </li>
            <li>• Clearly state scholarship benefits and coverage</li>
            <li>• Set realistic application deadlines</li>
            <li>• Include contact information for student inquiries</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddScholarships;
