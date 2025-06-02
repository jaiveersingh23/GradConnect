
import { API_ENDPOINTS } from '@/config/api';

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
}

class ApiClient {
  private getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  private getAuthHeaders(): Record<string, string> {
    const token = this.getAuthToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  async request<T>(url: string, options: ApiOptions = {}): Promise<T> {
    const { method = 'GET', body, headers = {} } = options;

    const config: RequestInit = {
      method,
      headers: {
        ...this.getAuthHeaders(),
        ...headers,
      },
    };

    if (body && method !== 'GET') {
      config.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth methods
  async register(userData: any) {
    return this.request(API_ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      body: userData,
    });
  }

  async login(credentials: any) {
    return this.request(API_ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: credentials,
    });
  }

  async getCurrentUser() {
    return this.request(API_ENDPOINTS.AUTH.ME);
  }

  // Users methods
  async getAlumni() {
    return this.request(API_ENDPOINTS.USERS.ALUMNI);
  }

  async getStudents() {
    return this.request(API_ENDPOINTS.USERS.STUDENTS);
  }

  async updateProfile(profileData: any) {
    return this.request(API_ENDPOINTS.USERS.PROFILE, {
      method: 'PUT',
      body: profileData,
    });
  }

  async getUserById(id: string) {
    return this.request(API_ENDPOINTS.USERS.BY_ID(id));
  }

  // Jobs methods
  async getJobs() {
    return this.request(API_ENDPOINTS.JOBS.LIST);
  }

  async getJobById(id: string) {
    return this.request(API_ENDPOINTS.JOBS.BY_ID(id));
  }

  async createJob(jobData: any) {
    return this.request(API_ENDPOINTS.JOBS.CREATE, {
      method: 'POST',
      body: jobData,
    });
  }

  // Blogs methods
  async getBlogs() {
    return this.request(API_ENDPOINTS.BLOGS.LIST);
  }

  async getBlogById(id: string) {
    return this.request(API_ENDPOINTS.BLOGS.BY_ID(id));
  }

  async createBlog(blogData: any) {
    return this.request(API_ENDPOINTS.BLOGS.CREATE, {
      method: 'POST',
      body: blogData,
    });
  }

  // Events methods
  async getEvents() {
    return this.request(API_ENDPOINTS.EVENTS.LIST);
  }

  async getEventById(id: string) {
    return this.request(API_ENDPOINTS.EVENTS.BY_ID(id));
  }

  async createEvent(eventData: any) {
    return this.request(API_ENDPOINTS.EVENTS.CREATE, {
      method: 'POST',
      body: eventData,
    });
  }

  async registerForEvent(id: string) {
    return this.request(API_ENDPOINTS.EVENTS.REGISTER(id), {
      method: 'POST',
    });
  }

  async unregisterFromEvent(id: string) {
    return this.request(API_ENDPOINTS.EVENTS.UNREGISTER(id), {
      method: 'DELETE',
    });
  }

  // Messages methods
  async getConversations() {
    return this.request(API_ENDPOINTS.MESSAGES.CONVERSATIONS);
  }

  async getConversationMessages(id: string) {
    return this.request(API_ENDPOINTS.MESSAGES.CONVERSATION_BY_ID(id));
  }

  async sendMessage(messageData: any) {
    return this.request(API_ENDPOINTS.MESSAGES.SEND, {
      method: 'POST',
      body: messageData,
    });
  }

  async markMessageAsRead(id: string) {
    return this.request(API_ENDPOINTS.MESSAGES.MARK_READ(id), {
      method: 'PUT',
    });
  }
}

export const apiClient = new ApiClient();
export default apiClient;
