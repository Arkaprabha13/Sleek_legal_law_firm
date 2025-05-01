
import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'sonner';

interface Admin {
  username: string;
  name: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  admin: Admin | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [admin, setAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we're using hardcoded credentials
      if (username === 'admin' && password === 'password') {
        const adminData: Admin = {
          username: 'admin',
          name: 'Admin User',
          role: 'administrator'
        };
        
        localStorage.setItem('admin', JSON.stringify(adminData));
        setAdmin(adminData);
        setIsAuthenticated(true);
        toast.success("Login successful!");
        return true;
      } else {
        toast.error("Invalid username or password");
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Login failed. Please try again.");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('admin');
    setAdmin(null);
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
