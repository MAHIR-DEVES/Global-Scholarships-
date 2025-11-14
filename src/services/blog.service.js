import axios from "axios";

const API_BASE_URL =
  `${process.env.NEXT_PUBLIC_API_URL}/api` || "http://localhost:5000/api";

class BlogService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor for auth token if needed
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle common errors
        if (error.response?.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem("token");
          window.location.href = "/login";
        }

        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  /**
   * Get blog posts with pagination and filters
   */
  async getBlogPosts(params = {}) {
    try {
      const { data } = await this.axiosInstance.get("/blog", {
        params: {
          page: params.page || 1,
          limit: params.limit || 9,
          status: params.status || "published",
          category: params.category,
          q: params.q,
        },
      });
      return data;
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      throw error;
    }
  }

  /**
   * Get single blog post by slug
   */
  async getBlogBySlug(slug) {
    try {
      // If your API returns the full post data directly
      const { data } = await this.axiosInstance.get(`/blog/${slug}`);

      // Handle if the response is wrapped in a data property
      if (data.data) {
        return data.data;
      }

      // Or if it's direct
      return data;
    } catch (error) {
      console.error("Error fetching blog post:", error);
      throw error;
    }
  }

  /**
   * Get all unique categories from published posts
   */
  async getCategories() {
    try {
      // First, get all published posts to extract categories
      const { data } = await this.axiosInstance.get("/blog", {
        params: {
          limit: 50, // Get max allowed to get more categories
          status: "published",
        },
      });

      // Extract unique category names
      const categorySet = new Set();
      data.data.forEach((post) => {
        post.categories.forEach((cat) => categorySet.add(cat.name));
      });

      return Array.from(categorySet).sort();
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  }

  /**
   * Get featured/recent blog posts
   */
  async getFeaturedPosts(limit = 3) {
    try {
      const { data } = await this.axiosInstance.get("/blog", {
        params: {
          limit,
          status: "published",
          page: 1,
        },
      });
      return data.data;
    } catch (error) {
      console.error("Error fetching featured posts:", error);
      return [];
    }
  }
}

export const blogService = new BlogService();
