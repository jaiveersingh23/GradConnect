// src/types/api.ts

export interface RegisterUserData {
    name: string;
    email: string;
    password: string;
    role: 'student' | 'alumni';
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface ProfileData {
    name?: string;
    bio?: string;
    linkedin?: string;
    github?: string;
    skills?: string[];
  }
  
  export interface JobData {
    title: string;
    description: string;
    company: string;
    location: string;
    postedBy: string;
  }
  
  export interface BlogData {
    title: string;
    content: string;
    authorId: string;
  }
  
  export interface EventData {
    title: string;
    date: string;
    location: string;
    description?: string;
    createdBy: string;
  }
  
  export interface MessageData {
    recipientId: string;
    content: string;
  }
  