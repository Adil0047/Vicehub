import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { TOKEN_STORAGE_KEY } from '@config/axios';
import {
  registerRequest,
  loginRequest,
  logoutRequest,
  getCurrentUserRequest,
} from '@features/auth/api/authService';

export const AuthContext = createContext(undefined);

/**
 * Provides authentication state and actions across the app.
 * On mount, checks for a stored token and re-validates it against
 * GET /api/auth/me so a page refresh keeps the user logged in.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // true until initial auth check finishes
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (!token) {
      setIsLoading(false);
      return;
    }

    getCurrentUserRequest()
      .then(({ user: currentUser }) => setUser(currentUser))
      .catch(() => {
        // Stored token is invalid or expired — clear it silently.
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const register = useCallback(async (credentials) => {
    setError(null);
    setIsLoading(true);
    try {
      const { user: newUser, token } = await registerRequest(credentials);
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
      setUser(newUser);
      return newUser;
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials) => {
    setError(null);
    setIsLoading(true);
    try {
      const { user: loggedInUser, token } = await loginRequest(credentials);
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
      setUser(loggedInUser);
      return loggedInUser;
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } catch {
      // Even if the server call fails, proceed to clear local state —
      // the user's intent is to be logged out regardless.
    } finally {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      setUser(null);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      error,
      register,
      login,
      logout,
      clearError,
      setUser,
    }),
    [user, isLoading, error, register, login, logout, clearError]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
