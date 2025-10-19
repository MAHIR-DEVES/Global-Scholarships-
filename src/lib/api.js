import { API_CONFIG } from "./config";

class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    // Remove Content-Type for FormData
    if (options.body instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw {
          status: response.status,
          message: data.message || data.error || "Request failed",
          errors: data.errors || data.details || [],
        };
      }

      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  get(endpoint, options) {
    return this.request(endpoint, { ...options, method: "GET" });
  }

  post(endpoint, body, options) {
    return this.request(endpoint, {
      ...options,
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
  }

  put(endpoint, body, options) {
    return this.request(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  delete(endpoint, options) {
    return this.request(endpoint, { ...options, method: "DELETE" });
  }
}

export const apiClient = new ApiClient(API_CONFIG.BASE_URL);

// Specific API functions
export const blogApi = {
  create: (data) => apiClient.post(API_CONFIG.ENDPOINTS.BLOGS, data),
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return apiClient.post(API_CONFIG.ENDPOINTS.IMAGE_UPLOAD, formData);
  },
  getCategories: () => apiClient.get(API_CONFIG.ENDPOINTS.CATEGORIES),
};
