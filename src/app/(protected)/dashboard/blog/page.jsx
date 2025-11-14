"use client";
import Link from "next/link";
import React, { useState } from "react";

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Top 10 Scholarships for International Students in 2024",
      excerpt:
        "Discover the most generous scholarship opportunities for students looking to study abroad this year.",
      author: "Sarah Johnson",
      publishDate: "2024-01-15",
      category: "Scholarships",
      status: "published",
      views: 1247,
      likes: 89,
      comments: 23,
      readTime: "5 min read",
      image: "📚",
      tags: ["scholarships", "funding", "international"],
    },
    {
      id: 2,
      title: "How to Write a Winning SOP for Chinese Universities",
      excerpt:
        "Learn the secrets to crafting a compelling Statement of Purpose that will impress admissions committees.",
      author: "Michael Chen",
      publishDate: "2024-01-12",
      category: "Application Tips",
      status: "published",
      views: 892,
      likes: 67,
      comments: 18,
      readTime: "7 min read",
      image: "✍️",
      tags: ["SOP", "application", "china"],
    },
    {
      id: 3,
      title: "Living in Malaysia: Cost of Living Guide for Students",
      excerpt:
        "A comprehensive breakdown of monthly expenses and budgeting tips for international students in Malaysia.",
      author: "Emma Wong",
      publishDate: "2024-01-10",
      category: "Student Life",
      status: "published",
      views: 1563,
      likes: 124,
      comments: 45,
      readTime: "8 min read",
      image: "🏠",
      tags: ["malaysia", "cost", "living"],
    },
    {
      id: 4,
      title: "IELTS vs TOEFL: Which is Better for Study Abroad?",
      excerpt:
        "Compare the two most popular English proficiency tests and choose the right one for your goals.",
      author: "David Kim",
      publishDate: "2024-01-08",
      category: "Language Tests",
      status: "published",
      views: 2105,
      likes: 156,
      comments: 67,
      readTime: "6 min read",
      image: "🎯",
      tags: ["IELTS", "TOEFL", "english"],
    },
    {
      id: 5,
      title: "Cultural Adaptation: Thriving in a New Country",
      excerpt:
        "Practical tips and strategies to help international students adapt to new cultures and environments.",
      author: "Lisa Wang",
      publishDate: "2024-01-18",
      category: "Student Life",
      status: "draft",
      views: 0,
      likes: 0,
      comments: 0,
      readTime: "10 min read",
      image: "🌍",
      tags: ["culture", "adaptation", "tips"],
    },
    {
      id: 6,
      title: "Scholarship Interview Preparation Guide",
      excerpt:
        "Master the art of scholarship interviews with our comprehensive preparation guide and common questions.",
      author: "Robert Taylor",
      publishDate: "2024-01-20",
      category: "Scholarships",
      status: "scheduled",
      views: 0,
      likes: 0,
      comments: 0,
      readTime: "9 min read",
      image: "💼",
      tags: ["interview", "preparation", "scholarships"],
    },
    {
      id: 7,
      title: "Top Engineering Programs in Chinese Universities",
      excerpt:
        "Explore the best engineering programs and research opportunities in China's top universities.",
      author: "Dr. Zhang Wei",
      publishDate: "2024-01-22",
      category: "Programs",
      status: "published",
      views: 987,
      likes: 78,
      comments: 32,
      readTime: "11 min read",
      image: "⚙️",
      tags: ["engineering", "china", "programs"],
    },
    {
      id: 8,
      title: "Budgeting for International Students: Complete Guide",
      excerpt:
        "Learn how to manage your finances effectively while studying abroad with our budgeting strategies.",
      author: "Maria Rodriguez",
      publishDate: "2024-01-25",
      category: "Student Life",
      status: "published",
      views: 1342,
      likes: 112,
      comments: 41,
      readTime: "12 min read",
      image: "💰",
      tags: ["budgeting", "finance", "tips"],
    },
  ];

  // Filter blog posts based on search and filters
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || post.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || post.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Scholarships":
        return "bg-purple-100 text-purple-800";
      case "Application Tips":
        return "bg-blue-100 text-blue-800";
      case "Student Life":
        return "bg-green-100 text-green-800";
      case "Language Tests":
        return "bg-orange-100 text-orange-800";
      case "Programs":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const categories = [...new Set(blogPosts.map((post) => post.category))];
  const statuses = ["published", "draft", "scheduled"];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen  py-6">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Blog Management
              </h1>
              <p className="text-gray-600">
                Create, manage, and track your study abroad blog content
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-50 transition duration-200 flex items-center space-x-2">
                <span>📊</span>
                <span>Analytics</span>
              </button>
              <Link
                href={"./add-blog"}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition duration-200 flex items-center space-x-2"
              >
                <span>✏️</span>
                <span>Write New Post</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Posts</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {blogPosts.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600 font-medium">
              +3 this week
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Views</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">8,136</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">👁️</span>
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600 font-medium">
              +1.2K this month
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Engagement Rate
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">4.8%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600 font-medium">
              +0.5% growth
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Avg. Read Time
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">8.5min</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">⏱️</span>
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600 font-medium">
              +1.2min increase
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search posts by title, content, or author..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <span className="text-gray-400">🔍</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              >
                <option value="all">All Status</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Blog Posts Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Post
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Publish Date
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPosts.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    {/* Post Title and Excerpt */}
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-lg">{post.image}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {post.title}
                          </p>
                          <p className="text-sm text-gray-500 truncate mt-1">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center space-x-1 mt-1">
                            <span className="text-xs text-gray-400">
                              {post.readTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Author */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{post.author}</div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
                          post.category
                        )}`}
                      >
                        {post.category}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          post.status
                        )}`}
                      >
                        {post.status.charAt(0).toUpperCase() +
                          post.status.slice(1)}
                      </span>
                    </td>

                    {/* Publish Date */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(post.publishDate)}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <button className="text-blue-600 hover:text-blue-900 text-sm">
                          {post.status === "published" ? "View" : "Preview"}
                        </button>
                        <button className="text-green-600 hover:text-green-900 text-sm">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-900 text-sm">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">{filteredPosts.length}</span> of{" "}
                <span className="font-medium">{blogPosts.length}</span> posts
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition duration-200">
                  Previous
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition duration-200">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition duration-200">
                  2
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition duration-200">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📝</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No blog posts found
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setCategoryFilter("all");
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
