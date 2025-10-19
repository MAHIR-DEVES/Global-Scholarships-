export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  ENDPOINTS: {
    BLOGS: "/blogs",
    IMAGE_UPLOAD: "/image-upload",
    CATEGORIES: "/categories",
  },
};

export const BLOG_CONFIG = {
  TITLE_MIN: 10,
  TITLE_MAX: 200,
  EXCERPT_MIN: 20,
  EXCERPT_MAX: 300,
  CONTENT_MIN: 100,
  MAX_CATEGORIES: 5,
  MAX_IMAGES: 5,
  IMAGE_MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp", "image/jpg"],
};
