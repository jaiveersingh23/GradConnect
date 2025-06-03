
import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_ENDPOINTS } from '@/config/api';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'alumni';
  usn?: string;
  batch?: string;
  passingYear?: string;
  branch?: string;
  program?: string;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('gradconnect_user');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          if (userData.token) {
            // Verify token with backend
            const response = await fetch(API_ENDPOINTS.AUTH.ME, {
              headers: {
                'Authorization': `Bearer ${userData.token}`
              }
            });
            
            if (response.ok) {
              const currentUser = await response.json();
              setUser(currentUser);
            } else {
              // Token is invalid, clear storage
              localStorage.removeItem('gradconnect_user');
            }
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('gradconnect_user');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      console.log('=== FRONTEND LOGIN ATTEMPT ===');
      console.log('Login URL:', API_ENDPOINTS.AUTH.LOGIN);
      console.log('Email:', email);
      console.log('Password provided:', !!password);
      
      const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful, received data');
        const userWithToken = { ...data.user, token: data.token };
        setUser(data.user);
        localStorage.setItem('gradconnect_user', JSON.stringify(userWithToken));
        setIsLoading(false);
        return true;
      } else {
        const errorData = await response.text();
        console.error('Login failed with status:', response.status);
        console.error('Error response:', errorData);
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Login request failed:', error);
      setIsLoading(false);
      return false;
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      const storedData = localStorage.getItem('gradconnect_user');
      if (storedData) {
        const parsed = JSON.parse(storedData);
        localStorage.setItem('gradconnect_user', JSON.stringify({ ...parsed, ...userData }));
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gradconnect_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
