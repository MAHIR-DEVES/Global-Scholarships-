'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import userService from '@/utils/userService';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is authenticated on initial load
  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      setLoading(true);
      setError(null);

      // First check localStorage for user data
      const localStorageUser = userService.getUserFromStorage();
      const token = userService.getToken();

      if (!localStorageUser || !token) {
        setUser(null);
        return;
      }

      // Set user from localStorage immediately
      setUser(localStorageUser);

      // Then try to fetch fresh user data from API
      try {
        const userData = await userService.getCurrentUser();
        if (userData?.user) {
          setUser(userData.user);
        }
      } catch (apiError) {
        // If API fails, keep the localStorage user data
        console.warn('Failed to fetch fresh user data, using cached data');
      }
    } catch (err) {
      setError(err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (userData, token) => {
    setUser(userData);
    // The token and user data are already stored in localStorage by the login function
  };

  const logout = () => {
    userService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    checkUserStatus,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
