import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'counselor';
  age?: number;
  course?: string;
  specialization?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: 'student' | 'counselor';
  age?: number;
  course?: string;
  specialization?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  { id: '1', email: 'student@example.com', name: 'CyberStorm', role: 'student', age: 20, course: 'Computer Science' },
  { id: '2', email: 'counselor@example.com', name: 'Dr. Justin', role: 'counselor', specialization: 'Anxiety & Stress Management' },
  { id: '3', email: 'counselor2@example.com', name: 'Dr. Maran', role: 'counselor', specialization: 'Depression & Mood Disorders' },
  { id: '4', email: 'counselor3@example.com', name: 'Dr. Happy', role: 'counselor', specialization: 'Academic Stress & Performance' },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('mentalHealthUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'password123') {
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem('mentalHealthUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    // Mock registration
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      name: userData.name,
      role: userData.role,
      age: userData.age,
      course: userData.course,
      specialization: userData.specialization,
    };
    
    mockUsers.push(newUser);
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('mentalHealthUser', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('mentalHealthUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
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