"use client";

import { useState, useEffect } from "react";
import userService from "@/utils/userService";
import { useRouter, useParams } from "next/navigation";

// Common Components
import Input from "@/components/admin/add-blog/common/Input";
import TextArea from "@/components//admin/add-blog/common/TextArea";
import Button from "@/components/admin/add-blog/common/Button";

// Blog Components
import ImageUploader from "@/components/admin/add-blog/ImageUploader";
import TextEditor from "@/components/admin/add-blog/TextEditor";
import CategorySelector from "@/components/admin/add-blog/CategorySelector";
import api from "@/utils/api";
import { toast } from "react-toastify";

// Edit Blog Page
export default function EditBlog() {
  const [session, setUserProfile] = useState(null);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    contentHtml: "",
    coverImageUrl: [],
    categories: [],
    status: "draft",
    publishedAt: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Fetch user profile and blog data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, blogRes] = await Promise.all([
          userService.getCurrentUser(),
          api.get(`/api/blog/id/${id}`),
        ]);
        setUserProfile(userData);

        const blog = blogRes.data;
        setFormData({
            title: blog.title || "",
            excerpt: blog.excerpt || "",
            contentHtml: blog.contentHtml || "",
            coverImageUrl: blog.coverImageUrl || [],
            categories: blog.categories.map(c => c.name) || [],
            status: blog.status || "draft",
            publishedAt: blog.publishedAt || "",
        });

      } catch (err) {
        console.error("Error fetching data:", err);
        toast.error("Failed to fetch blog details");
        setErrors({ fetch: err.message });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
        fetchData();
    }
  }, [id]);

  // Handle input changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 10) {
      newErrors.title = "Title must be at least 10 characters";
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = "Excerpt is required";
    } else if (formData.excerpt.length < 20) {
      newErrors.excerpt = "Excerpt must be at least 20 characters";
    }

    if (!formData.contentHtml.trim() || formData.contentHtml === "<p></p>") {
      newErrors.contentHtml = "Content is required";
    }

    if (formData.coverImageUrl.length === 0) {
      newErrors.coverImageUrl = "At least one cover image is required";
    }

    if (formData.categories.length === 0) {
      newErrors.categories = "At least one category is required";
    }

    if (formData.status === "published" && !formData.publishedAt) {
      newErrors.publishedAt = "Published date is required for published posts";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector(".text-red-500");
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        // We don't necessarily update the author on edit, but we can if needed.
        // Usually author remains the original creator.
        categories: formData.categories, // Ensure format matches what backend expects (array of strings or objects? Controller handles strings)
        publishedAt:
          formData.status === "published"
            ? formData.publishedAt || new Date().toISOString()
            : null,
      };

      const response = await api.patch(`/api/blog/${id}`, payload);
      if (response.status === 200) {
        toast.success("Blog updated successfully!");
      } else {
        toast.info("Request completed.");
      }

      setSubmitSuccess(true);

      // Redirect to blog post or list after 2 seconds
      setTimeout(() => {
        router.push("/dashboard/blog");
      }, 2000);
    } catch (error) {
      console.error("Error updating blog:", error);
      setErrors({ submit: error.message });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  };

  // Handle save as draft
  const handleSaveAsDraft = () => {
    setFormData((prev) => ({ ...prev, status: "draft" }));
    setTimeout(() => {
      document.getElementById("blog-form").requestSubmit();
    }, 100);
  };

  // Handle publish
  const handlePublish = () => {
    setFormData((prev) => ({
      ...prev,
      status: "published",
      publishedAt: new Date().toISOString(),
    }));
    setTimeout(() => {
      document.getElementById("blog-form").requestSubmit();
    }, 100);
  };

  if (loading) {
      return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Edit Blog Post
          </h1>
          <p className="text-gray-600 mt-2">
            Update your blog content
          </p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg mb-6">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Blog post updated successfully! Redirecting...</span>
          </div>
        )}

        {/* Error Message */}
        {errors.submit && (
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg mb-6">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span>{errors.submit}</span>
          </div>
        )}

        {/* Form */}
        <form
          id="blog-form"
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-8 space-y-6"
        >
          {/* Title */}
          <Input
            label="Blog Title"
            type="text"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Enter an engaging title for your blog post"
            error={errors.title}
            required
          />

          {/* Excerpt */}
          <TextArea
            label="Excerpt"
            value={formData.excerpt}
            onChange={(e) => handleChange("excerpt", e.target.value)}
            placeholder="Write a brief summary of your blog post (shown in previews)"
            rows={3}
            error={errors.excerpt}
            required
          />

          {/* Content */}
          <TextEditor
            label="Content"
            value={formData.contentHtml}
            onChange={(value) => handleChange("contentHtml", value)}
            error={errors.contentHtml}
            placeholder="Write your blog content here..."
          />

          {/* Cover Images */}
          <ImageUploader
            label="Cover Images"
            maxImages={5}
            onImagesChange={(images) => handleChange("coverImageUrl", images)}
            error={errors.coverImageUrl}
            initialImages={formData.coverImageUrl}
          />

          {/* Categories */}
          <CategorySelector
            selectedCategories={formData.categories}
            onCategoriesChange={(categories) =>
              handleChange("categories", categories)
            }
            error={errors.categories}
          />

          {/* Status & Publish Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            {formData.status === "published" && (
              <Input
                label="Publish Date & Time"
                type="datetime-local"
                value={
                  formData.publishedAt
                    ? new Date(formData.publishedAt).toISOString().slice(0, 16)
                    : ""
                }
                onChange={(e) =>
                  handleChange(
                    "publishedAt",
                    new Date(e.target.value).toISOString()
                  )
                }
                error={errors.publishedAt}
              />
            )}
          </div>

          {/* Author Info Display */}
          {session?.user && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Author Information
              </p>
              <div className="flex items-center gap-3">
                {session.user.image && (
                  <img
                    src={session.user.image}
                    alt={session.user.name}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div>
                  <p className="font-medium text-gray-900">
                    {session.user.name}
                  </p>
                  <p className="text-sm text-gray-600">{session.user.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.back()}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={handleSaveAsDraft}
              loading={loading && formData.status === "draft"}
              disabled={loading}
              className="flex-1"
            >
              Save as Draft
            </Button>

            <Button
              type="button"
              variant="primary"
              onClick={handlePublish}
              loading={loading && formData.status === "published"}
              disabled={loading}
              className="flex-1"
            >
              Update Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
