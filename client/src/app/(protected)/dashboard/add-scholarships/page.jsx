'use client';
import React, { useState } from 'react';

const AddScholarships = () => {
  const [formData, setFormData] = useState({
    universityName: '',
    country: '',
    description: '',
    universityLogo: '',
    website: '',
    contactEmail: '',
  });

  const [programs, setPrograms] = useState([
    {
      level: '',
      duration: '',
      tuitionFee: '',
      eligibility: '',
      applicationDeadline: '',
      languageRequirement: '',
      additionalInfo: '',
    },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle basic info change
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle program field change
  const handleProgramChange = (index, e) => {
    const newPrograms = [...programs];
    newPrograms[index][e.target.name] = e.target.value;
    setPrograms(newPrograms);
  };

  // Add new program
  const addProgram = () => {
    setPrograms([
      ...programs,
      {
        level: '',
        duration: '',
        tuitionFee: '',
        eligibility: '',
        applicationDeadline: '',
        languageRequirement: '',
        additionalInfo: '',
      },
    ]);
  };

  // Remove program
  const removeProgram = index => {
    const newPrograms = programs.filter((_, i) => i !== index);
    setPrograms(newPrograms);
  };

  // Submit form
  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = { ...formData, programs };

    try {
      const res = await fetch('http://localhost:5000/api/scholarships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok) {
        alert('Scholarship Added Successfully!');
        console.log(result);
        // Reset form
        setFormData({
          universityName: '',
          country: '',
          description: '',
          universityLogo: '',
          website: '',
          contactEmail: '',
        });
        setPrograms([
          {
            level: '',
            duration: '',
            tuitionFee: '',
            eligibility: '',
            applicationDeadline: '',
            languageRequirement: '',
            additionalInfo: '',
          },
        ]);
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
            Create new scholarship opportunities for international students.
            Fill in the university details and program information below.
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

            {/* Programs Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  Program Details
                </h3>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {programs.length} program(s)
                </span>
              </div>

              {programs.map((program, index) => (
                <div
                  key={index}
                  className="border-2 border-dashed border-gray-200 rounded-2xl p-6 bg-gray-50 relative hover:border-blue-300 transition duration-200"
                >
                  <div className="absolute -top-3 left-6 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Program {index + 1}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Program Level *
                      </label>
                      <select
                        name="level"
                        value={program.level}
                        onChange={e => handleProgramChange(index, e)}
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
                        onChange={e => handleProgramChange(index, e)}
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
                        onChange={e => handleProgramChange(index, e)}
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
                        onChange={e => handleProgramChange(index, e)}
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
                        onChange={e => handleProgramChange(index, e)}
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
                        onChange={e => handleProgramChange(index, e)}
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
                        onChange={e => handleProgramChange(index, e)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      />
                    </div>
                  </div>

                  {programs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeProgram(index)}
                      className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl transition duration-200"
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
                onClick={addProgram}
                className="w-full border-2 border-dashed border-blue-300 border-blue-500 text-blue-600 hover:bg-blue-50 py-4 rounded-2xl transition duration-200 flex items-center justify-center space-x-2"
              >
                <svg
                  className="w-5 h-5"
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
                <span className="font-semibold">Add Another Program</span>
              </button>
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
