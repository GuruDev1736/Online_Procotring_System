import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Demo users for testing
  const demoUsers = {
    admin: {
      id: 1,
      email: 'admin@proctorai.com',
      password: 'admin123',
      role: 'ROLE_ADMIN',
      name: 'Admin User',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    user: {
      id: 2,
      email: 'user@example.com',
      password: 'user123',
      role: 'ROLE_USER',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b578?w=150&h=150&fit=crop&crop=face'
    }
  };

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      
      // Find user from demo users
      const foundUser = Object.values(demoUsers).find(
        u => u.email === email && u.password === password
      );

      if (!foundUser) {
        throw new Error('Invalid credentials');
      }

      // Remove password from user object
      const { password: _, ...userWithoutPassword } = foundUser;
      
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      // Return appropriate redirect path based on role
      let redirectPath;
      switch (userWithoutPassword.role) {
        case 'ROLE_ADMIN':
          redirectPath = '/admin/dashboard';
          break;
        case 'ROLE_USER':
          redirectPath = '/user/dashboard';
          break;
        default:
          redirectPath = '/';
      }
      
      return { success: true, user: userWithoutPassword, redirectPath };
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    // Define role permissions
    const rolePermissions = {
      'ROLE_ADMIN': ['all'],
      'ROLE_USER': ['take_exam', 'view_results']
    };
    const userPermissions = rolePermissions[user.role] || [];
    return userPermissions.includes(permission) || userPermissions.includes('all');
  };

  const isRole = (role) => {
    return user?.role === role;
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    hasPermission,
    isRole,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ROLE_ADMIN',
    isUser: user?.role === 'ROLE_USER'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
