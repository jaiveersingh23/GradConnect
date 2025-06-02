
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
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

// Dummy users data
const DUMMY_USERS: (User & { password: string })[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.student@university.edu',
    password: 'student123',
    role: 'student',
    usn: '1XX20CS001',
    bio: ''
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.alumni@university.edu',
    password: 'alumni123',
    role: 'alumni',
    batch: '2018-2022',
    passingYear: '2022',
    branch: 'Computer Science',
    program: 'BE',
    bio: 'Software Engineer at Google with 3+ years of experience in full-stack development. Passionate about mentoring students and helping them navigate their career paths.'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.student@university.edu',
    password: 'student456',
    role: 'student',
    usn: '1XX21CS015',
    bio: ''
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.alumni@university.edu',
    password: 'alumni456',
    role: 'alumni',
    batch: '2016-2020',
    passingYear: '2020',
    branch: 'Electrical Engineering',
    program: 'BE',
    bio: 'Senior Electrical Engineer at Tesla. Specialized in battery technology and sustainable energy solutions. Always excited to share knowledge with upcoming engineers.'
  }
];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (stored in localStorage)
    const storedUser = localStorage.getItem('gradconnect_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = DUMMY_USERS.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('gradconnect_user', JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('gradconnect_user', JSON.stringify(updatedUser));
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
