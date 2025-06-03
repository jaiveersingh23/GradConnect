
// Check if we're in development or production
const isDevelopment = import.meta.env.DEV;
const API_BASE_URL = isDevelopment 
  ? 'http://localhost:5000'  // Local backend for development
  : import.meta.env.VITE_API_URL || 'https://gradconnect-backend-production.up.railway.app'; // Your actual Railway URL

console.log('API Base URL:', API_BASE_URL);
console.log('Environment:', isDevelopment ? 'development' : 'production');

export const API_ENDPOINTS = {
  BASE_URL: API_BASE_URL,
  AUTH: {
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    ME: `${API_BASE_URL}/api/auth/me`,
  },
  USERS: {
    ALUMNI: `${API_BASE_URL}/api/users/alumni`,
    STUDENTS: `${API_BASE_URL}/api/users/students`,
    PROFILE: `${API_BASE_URL}/api/users/profile`,
    BY_ID: (id: string) => `${API_BASE_URL}/api/users/${id}`,
  },
  JOBS: {
    LIST: `${API_BASE_URL}/api/jobs`,
    BY_ID: (id: string) => `${API_BASE_URL}/api/jobs/${id}`,
    CREATE: `${API_BASE_URL}/api/jobs`,
  },
  BLOGS: {
    LIST: `${API_BASE_URL}/api/blogs`,
    BY_ID: (id: string) => `${API_BASE_URL}/api/blogs/${id}`,
    CREATE: `${API_BASE_URL}/api/blogs`,
  },
  EVENTS: {
    LIST: `${API_BASE_URL}/api/events`,
    BY_ID: (id: string) => `${API_BASE_URL}/api/events/${id}`,
    CREATE: `${API_BASE_URL}/api/events`,
    REGISTER: (id: string) => `${API_BASE_URL}/api/events/${id}/register`,
    UNREGISTER: (id: string) => `${API_BASE_URL}/api/events/${id}/unregister`,
  },
  MESSAGES: {
    CONVERSATIONS: `${API_BASE_URL}/api/messages/conversations`,
    CONVERSATION_BY_ID: (id: string) => `${API_BASE_URL}/api/messages/conversations/${id}`,
    SEND: `${API_BASE_URL}/api/messages`,
    MARK_READ: (id: string) => `${API_BASE_URL}/api/messages/${id}/read`,
  },
};

export default API_ENDPOINTS;
