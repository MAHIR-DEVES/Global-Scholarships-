'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AddScholarships = () => {
  const [formData, setFormData] = useState({
    universityName: '',
    country: '',
    description: '',
    universityLogo: '',
    website: '',
    contactEmail: '',
    // New university-level fields
    majors: [''],
    videoUrl: '',
    worldRanking: '',
  });

  const [program, setProgram] = useState({
    level: '',
    duration: '',
    tuitionFee: '',
    eligibility: '',
    applicationDeadline: '',
    languageRequirement: '',
    additionalInfo: '',
    // Program-level fields
    feeStructure: '',
    scholarshipCover: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle basic info change
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle majors change for university
  const handleMajorsChange = (majorIndex, value) => {
    const newMajors = [...formData.majors];
    newMajors[majorIndex] = value;
    setFormData({
      ...formData,
      majors: newMajors,
    });
  };

  // Add new major to university
  const addMajor = () => {
    setFormData({
      ...formData,
      majors: [...formData.majors, ''],
    });
  };

  // Remove major from university
  const removeMajor = majorIndex => {
    if (formData.majors.length <= 1) return; // Prevent removing all majors
    const newMajors = formData.majors.filter((_, i) => i !== majorIndex);
    setFormData({
      ...formData,
      majors: newMajors,
    });
  };

  // Handle program field change
  const handleProgramChange = e => {
    setProgram({
      ...program,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form
  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    // Wrap the single program in an array to match the backend schema
    const data = { ...formData, programs: [program] };

    try {
      const res = await fetch('http://localhost:5000/api/scholarships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok) {
        toast.success(`${result.message}`);

        // Reset form
        setFormData({
          universityName: '',
          country: '',
          description: '',
          universityLogo: '',
          website: '',
          contactEmail: '',
          // New university-level fields
          majors: [''],
          videoUrl: '',
          worldRanking: '',
        });
        setProgram({
          level: '',
          duration: '',
          tuitionFee: '',
          eligibility: '',
          applicationDeadline: '',
          languageRequirement: '',
          additionalInfo: '',
          // Program-level fields
          feeStructure: '',
          scholarshipCover: '',
        });
      } else {
        alert(result.message || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to submit scholarship');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8 ">
      <div className="">
        {/* Header */}
        <div className=" mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Add New Scholarship
          </h1>
          <p className="text-lg text-gray-600 ">
            Create a new scholarship opportunity for international students.
            Fill in the university and program information below.
          </p>
        </div>

        <div className="bg-white  shadow-xl overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">🎓</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Scholarship Information
                </h2>
                <p className="text-blue-100 text-sm">
                  Add university and program details
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* University Basic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                University Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    University Name *
                  </label>
                  <input
                    type="text"
                    name="universityName"
                    placeholder="Enter university name"
                    value={formData.universityName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country *
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    required
                  >
                    <option value="">Select Country</option>
                    <option value="China">China</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="USA">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    University Logo URL
                  </label>
                  <input
                    type="text"
                    name="universityLogo"
                    placeholder="https://example.com/logo.png"
                    value={formData.universityLogo}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    placeholder="contact@university.edu"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="text"
                    name="website"
                    placeholder="https://university.edu"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  />
                </div>

                {/* New University Fields */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Majors
                  </label>
                  {formData.majors.map((major, majorIndex) => (
                    <div key={majorIndex} className="flex mb-2">
                      <input
                        type="text"
                        placeholder="Enter major"
                        value={major}
                        onChange={e =>
                          handleMajorsChange(majorIndex, e.target.value)
                        }
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      />
                      {formData.majors.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeMajor(majorIndex)}
                          className="ml-2 bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl transition duration-200"
                        >
                          <svg
                            className="w-4 h-4"
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
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addMajor}
                    className="mt-2 text-blue-600 hover:text-blue-800 font-medium flex items-center"
                  >
                    <svg
                      className="w-5 h-5 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Add Major
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video URL
                  </label>
                  <input
                    type="text"
                    name="videoUrl"
                    placeholder="https://example.com/video"
                    value={formData.videoUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    World Ranking
                  </label>
                  <input
                    type="text"
                    name="worldRanking"
                    placeholder="e.g., #150 Worldwide"
                    value={formData.worldRanking}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    placeholder="Provide a detailed description of the university and scholarship opportunities..."
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-none"
                    rows="4"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Single Program Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  Program Details
                </h3>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Single Program
                </span>
              </div>

              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 bg-gray-50 hover:border-blue-300 transition duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Program Level *
                    </label>
                    <select
                      name="level"
                      value={program.level}
                      onChange={handleProgramChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      required
                    >
                      <option value="">Select Level</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Bachelor">Bachelor</option>
                      <option value="Master">Master</option>
                      <option value="PhD">PhD</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration *
                    </label>
                    <input
                      type="text"
                      name="duration"
                      placeholder="e.g., 4 years, 2 semesters"
                      value={program.duration}
                      onChange={handleProgramChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tuition Fee *
                    </label>
                    <input
                      type="text"
                      name="tuitionFee"
                      placeholder="e.g., $15,000 per year"
                      value={program.tuitionFee}
                      onChange={handleProgramChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Application Deadline *
                    </label>
                    <input
                      type="text"
                      name="applicationDeadline"
                      placeholder="e.g., August 15, 2024"
                      value={program.applicationDeadline}
                      onChange={handleProgramChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Eligibility Criteria *
                    </label>
                    <input
                      type="text"
                      name="eligibility"
                      placeholder="e.g., Minimum GPA 3.0, High School Diploma"
                      value={program.eligibility}
                      onChange={handleProgramChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Language Requirement
                    </label>
                    <input
                      type="text"
                      name="languageRequirement"
                      placeholder="e.g., IELTS 6.5, TOEFL 80"
                      value={program.languageRequirement}
                      onChange={handleProgramChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Information
                    </label>
                    <input
                      type="text"
                      name="additionalInfo"
                      placeholder="Any additional requirements or information..."
                      value={program.additionalInfo}
                      onChange={handleProgramChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    />
                  </div>

                  {/* Program-level Fields */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fee Structure
                    </label>
                    <input
                      type="text"
                      name="feeStructure"
                      placeholder="e.g., $10,000 per semester"
                      value={program.feeStructure}
                      onChange={handleProgramChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Scholarship Cover
                    </label>
                    <input
                      type="text"
                      name="scholarshipCover"
                      placeholder="e.g., 50% tuition fee"
                      value={program.scholarshipCover}
                      onChange={handleProgramChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-4 px-6 rounded-xl transition duration-200"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-4 px-6 rounded-xl transition duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  'Submit Scholarship'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddScholarships;
