'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getScholarshipById } from '@/lib/scholarshipApi';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaUniversity,
  FaGlobe,
  FaGraduationCap,
  FaDollarSign,
  FaCalendar,
  FaLanguage,
  FaLink as FaLinkIcon,
  FaEnvelope,
  FaClock,
  FaCheckCircle,
  FaArrowLeft,
  FaPlay,
} from 'react-icons/fa';
import { FaRankingStar } from 'react-icons/fa6';

export default function ScholarshipDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        setLoading(true);
        const data = await getScholarshipById(id);
        setScholarship(data);
      } catch (err) {
        console.error('Error fetching scholarship:', err);
        setError(err.message || 'Failed to load scholarship details');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchScholarship();
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading scholarship details...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !scholarship) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-md">
            <div className="mb-6 text-6xl">🎓</div>
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Scholarship Not Found
            </h2>
            <p className="mb-8 text-gray-600">
              {error || "The scholarship you're looking for doesn't exist or has been removed."}
            </p>
            <Link
              href="/scholarships/all-scholarships"
              className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
            >
              <FaArrowLeft className="mr-2 h-4 w-4" />
              Back to All Scholarships
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center space-x-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/scholarships/all-scholarships" className="hover:text-blue-600 transition-colors">
            Scholarships
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate">{scholarship.universityName}</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600 rounded-2xl shadow-xl p-8 md:p-12 mb-8 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* University Logo */}
            {scholarship.universityLogo && (
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-2xl shadow-lg p-4 flex-shrink-0">
                <img
                  src={scholarship.universityLogo}
                  alt={scholarship.universityName}
                  className="w-full h-full object-contain"
                />
              </div>
            )}

            {/* Title and Info */}
            <div className="flex-1 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                {scholarship.universityName}
              </h1>
              <p className="text-blue-100 text-lg mb-4">
                {scholarship.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium flex items-center gap-2">
                  <FaGlobe className="w-4 h-4" />
                  {scholarship.country}
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium flex items-center gap-2">
                  <FaGraduationCap className="w-4 h-4" />
                  {scholarship.level}
                </span>
                {scholarship.worldRanking && (
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium flex items-center gap-2">
                    <FaRankingStar className="w-4 h-4" />
                    Rank #{scholarship.worldRanking}
                  </span>
                )}
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex-shrink-0">
              <a
                href={scholarship.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white text-blue-700 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Program Details Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FaGraduationCap className="w-5 h-5 text-blue-600" />
                </div>
                Program Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <FaDollarSign className="w-4 h-4" />
                    <span className="text-sm font-medium">Tuition Fee</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{scholarship.tuitionFee}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <FaClock className="w-4 h-4" />
                    <span className="text-sm font-medium">Duration</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{scholarship.duration}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <FaLanguage className="w-4 h-4" />
                    <span className="text-sm font-medium">Language Requirement</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {scholarship.languageRequirement || 'Not specified'}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <FaCalendar className="w-4 h-4" />
                    <span className="text-sm font-medium">Application Period</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {scholarship.applicationStartDate} - {scholarship.applicationDeadline}
                  </p>
                </div>
              </div>
            </div>

            {/* Available Majors Card */}
            {scholarship.majors && scholarship.majors.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Majors</h2>
                <div className="flex flex-wrap gap-2">
                  {scholarship.majors.map((major, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {major}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Information */}
            {scholarship.additionalInfo && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Additional Information</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {scholarship.additionalInfo}
                </p>
              </div>
            )}

            {/* Campus Tour Video */}
            {scholarship.videoUrl && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaPlay className="w-5 h-5 text-red-600" />
                  Campus Tour
                </h2>
                <div className="aspect-video rounded-xl overflow-hidden">
                  <iframe
                    src={scholarship.videoUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Deadline Alert */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                  <FaCalendar className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="font-bold text-gray-900">Application Deadline</h3>
              </div>
              <p className="text-2xl font-bold text-red-600 mb-2">
                {scholarship.applicationDeadline}
              </p>
              <p className="text-sm text-gray-600">Don't miss out on this opportunity!</p>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                {scholarship.website && (
                  <a
                    href={scholarship.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <FaLinkIcon className="w-4 h-4" />
                    <span className="text-sm">Visit Website</span>
                  </a>
                )}
                {scholarship.contactEmail && (
                  <a
                    href={`mailto:${scholarship.contactEmail}`}
                    className="flex items-center gap-3 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <FaEnvelope className="w-4 h-4" />
                    <span className="text-sm">{scholarship.contactEmail}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Quick Facts */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">Quick Facts</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <FaCheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">Verified Opportunity</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FaCheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">International Students Welcome</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FaCheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">Direct University Application</span>
                </div>
              </div>
            </div>

            {/* Apply CTA */}
            <a
              href={scholarship.website}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Apply to this Scholarship
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
