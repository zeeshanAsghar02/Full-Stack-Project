import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => axiosInstance.post('/api/auth/login', credentials),
  register: (userData) => axiosInstance.post('/api/auth/register', userData),
  verifyEmail: (token) => axiosInstance.post(`/api/auth/verify-email/${token}`),
  forgotPassword: (email) => axiosInstance.post('/api/auth/forgot-password', { email }),
  resetPassword: (token, password) => axiosInstance.put(`/api/auth/reset-password/${token}`, { password }),
  getCurrentUser: () => axiosInstance.get('/api/auth/me'),
  updateProfile: (userData) => axiosInstance.put('/api/auth/updatedetails', userData),
  updatePassword: (passwordData) => axiosInstance.put('/api/auth/updatepassword', passwordData),
  logout: () => axiosInstance.get('/api/auth/logout'),
};

// Users API
export const usersAPI = {
  getAll: () => axiosInstance.get('/api/users'),
  getById: (id) => axiosInstance.get(`/api/users/${id}`),
  update: (id, userData) => axiosInstance.put(`/api/users/${id}`, userData),
  delete: (id) => axiosInstance.delete(`/api/users/${id}`),
};

// Events API
export const eventsAPI = {
  getAll: (params) => axiosInstance.get('/api/events', { params }),
  getById: (id) => axiosInstance.get(`/api/events/${id}`),
  create: (eventData) => axiosInstance.post('/api/events', eventData),
  update: (id, eventData) => axiosInstance.put(`/api/events/${id}`, eventData),
  delete: (id) => axiosInstance.delete(`/api/events/${id}`),
  register: (id) => axiosInstance.post(`/api/events/${id}/register`),
  unregister: (id) => axiosInstance.delete(`/api/events/${id}/register`),
};

// Sponsors API
export const sponsorsAPI = {
  getAll: (params) => axiosInstance.get('/sponsors', { params }),
  getById: (id) => axiosInstance.get(`/sponsors/${id}`),
  create: (sponsorData) => axiosInstance.post('/sponsors', sponsorData),
  update: (id, sponsorData) => axiosInstance.put(`/sponsors/${id}`, sponsorData),
  delete: (id) => axiosInstance.delete(`/sponsors/${id}`),
  addEvent: (id, eventId) => axiosInstance.put(`/sponsors/${id}/events`, { eventId }),
  removeEvent: (id, eventId) => axiosInstance.delete(`/sponsors/${id}/events/${eventId}`),
};

// Blog API
export const blogAPI = {
  getAll: (params) => axiosInstance.get('/blogs', { params }),
  getById: (id) => axiosInstance.get(`/blogs/${id}`),
  create: (blogData) => axiosInstance.post('/blogs', blogData),
  update: (id, blogData) => axiosInstance.put(`/blogs/${id}`, blogData),
  delete: (id) => axiosInstance.delete(`/blogs/${id}`),
}; 