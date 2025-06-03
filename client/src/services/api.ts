
import { API_ENDPOINTS } from '@/config/api';

interface UserData {
  name: string;
  email: string;
  role: string;
  graduationYear?: number;
  company?: string;
  position?: string;
  bio?: string;
  skills?: string[];
  location?: string;
}

interface JobData {
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  salary?: string;
}

interface BlogData {
  title: string;
  content: string;
  summary?: string;
  tags?: string[];
}

interface EventData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: string;
  maxAttendees?: number;
}

interface MessageData {
  conversationId: string;
  content: string;
}

const getAuthToken = () => {
  const user = localStorage.getItem('gradconnect_user');
  if (user) {
    const userData = JSON.parse(user);
    return userData.token;
  }
  return null;
};

const apiRequest = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
};

// User services
export const userService = {
  getAlumni: () => apiRequest(API_ENDPOINTS.USERS.ALUMNI),
  getStudents: () => apiRequest(API_ENDPOINTS.USERS.STUDENTS),
  getUserById: (id: string) => apiRequest(API_ENDPOINTS.USERS.BY_ID(id)),
  updateProfile: (data: UserData) => apiRequest(API_ENDPOINTS.USERS.PROFILE, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// Job services
export const jobService = {
  getJobs: () => apiRequest(API_ENDPOINTS.JOBS.LIST),
  getJobById: (id: string) => apiRequest(API_ENDPOINTS.JOBS.BY_ID(id)),
  createJob: (data: JobData) => apiRequest(API_ENDPOINTS.JOBS.CREATE, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

// Blog services
export const blogService = {
  getBlogs: () => apiRequest(API_ENDPOINTS.BLOGS.LIST),
  getBlogById: (id: string) => apiRequest(API_ENDPOINTS.BLOGS.BY_ID(id)),
  createBlog: (data: BlogData) => apiRequest(API_ENDPOINTS.BLOGS.CREATE, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

// Event services
export const eventService = {
  getEvents: () => apiRequest(API_ENDPOINTS.EVENTS.LIST),
  getEventById: (id: string) => apiRequest(API_ENDPOINTS.EVENTS.BY_ID(id)),
  createEvent: (data: EventData) => apiRequest(API_ENDPOINTS.EVENTS.CREATE, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  registerForEvent: (id: string) => apiRequest(API_ENDPOINTS.EVENTS.REGISTER(id), {
    method: 'POST',
  }),
  unregisterFromEvent: (id: string) => apiRequest(API_ENDPOINTS.EVENTS.UNREGISTER(id), {
    method: 'DELETE',
  }),
};

// Message services
export const messageService = {
  getConversations: () => apiRequest(API_ENDPOINTS.MESSAGES.CONVERSATIONS),
  getConversationMessages: (id: string) => apiRequest(API_ENDPOINTS.MESSAGES.CONVERSATION_BY_ID(id)),
  createConversation: (data: { participantId: string }) => apiRequest(API_ENDPOINTS.MESSAGES.CONVERSATIONS, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  sendMessage: (data: MessageData) => apiRequest(API_ENDPOINTS.MESSAGES.SEND, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  markAsRead: (id: string) => apiRequest(API_ENDPOINTS.MESSAGES.MARK_READ(id), {
    method: 'PUT',
  }),
};
