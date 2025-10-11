import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/utils/api';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const loginUser = async formData => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/api/users/login', formData);

      if (response.data.success) {
        // Store token and user data in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Update auth context
        login(response.data.user, response.data.token);

        return { success: true, data: response.data };
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        'Login failed. Please check your credentials.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading, error };
};

export default useLogin;
