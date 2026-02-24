import axios from "axios";

const getBaseURL = () => {
  const url = process.env.NEXT_PUBLIC_API_URL || "https://ngaylebackend-production.up.railway.app/api";
  return url.endsWith("/") ? url : `${url}/`;
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add a request interceptor to handle URL joining and auth tokens
api.interceptors.request.use(
  (config) => {
    // Strip leading slash from URL to ensure Axios joins it correctly with baseURL
    if (config.url && config.url.startsWith("/")) {
      config.url = config.url.substring(1);
    }

    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn("No token found in localStorage");
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        // Dispatch auth-changed event to update UI immediately
        window.dispatchEvent(new Event("auth-changed"));

        // Prevent redirect loop if already on login
        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
