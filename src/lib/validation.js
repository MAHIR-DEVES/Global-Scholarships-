// lib/validation.js
import { BLOG_CONFIG } from "./config";

export const validateBlogForm = (formData) => {
  const errors = {};

  // Title validation
  if (!formData.title || formData.title.trim().length < BLOG_CONFIG.TITLE_MIN) {
    errors.title = `Title must be at least ${BLOG_CONFIG.TITLE_MIN} characters`;
  }
  if (formData.title && formData.title.length > BLOG_CONFIG.TITLE_MAX) {
    errors.title = `Title cannot exceed ${BLOG_CONFIG.TITLE_MAX} characters`;
  }

  // Excerpt validation
  if (
    !formData.excerpt ||
    formData.excerpt.trim().length < BLOG_CONFIG.EXCERPT_MIN
  ) {
    errors.excerpt = `Excerpt must be at least ${BLOG_CONFIG.EXCERPT_MIN} characters`;
  }
  if (formData.excerpt && formData.excerpt.length > BLOG_CONFIG.EXCERPT_MAX) {
    errors.excerpt = `Excerpt cannot exceed ${BLOG_CONFIG.EXCERPT_MAX} characters`;
  }

  // Content validation
  if (
    !formData.contentHtml ||
    formData.contentHtml.trim().length < BLOG_CONFIG.CONTENT_MIN
  ) {
    errors.contentHtml = `Content must be at least ${BLOG_CONFIG.CONTENT_MIN} characters`;
  }

  // Cover images validation
  if (!formData.coverImageUrl || formData.coverImageUrl.length === 0) {
    errors.coverImageUrl = "At least one cover image is required";
  }

  // Categories validation
  if (!formData.categories || formData.categories.length === 0) {
    errors.categories = "Please select at least one category";
  }
  if (
    formData.categories &&
    formData.categories.length > BLOG_CONFIG.MAX_CATEGORIES
  ) {
    errors.categories = `Maximum ${BLOG_CONFIG.MAX_CATEGORIES} categories allowed`;
  }

  // Published date validation
  if (formData.status === "published" && !formData.publishedAt) {
    errors.publishedAt = "Published date is required for published posts";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateImageFile = (file) => {
  if (!BLOG_CONFIG.ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return "Please upload only JPG, PNG, or WebP images";
  }

  if (file.size > BLOG_CONFIG.IMAGE_MAX_SIZE) {
    return "Image size should not exceed 5MB";
  }

  return null;
};
