import apiClient from '@config/axios';

/**
 * Auth API calls. Each function returns the `data` object from the
 * standard API response shape ({ success, message, data }), so
 * callers work directly with { user, token } etc.
 */

export async function registerRequest({ username, email, password }) {
  const response = await apiClient.post('/auth/register', { username, email, password });
  return response.data.data;
}

export async function loginRequest({ email, password }) {
  const response = await apiClient.post('/auth/login', { email, password });
  return response.data.data;
}

export async function logoutRequest() {
  const response = await apiClient.post('/auth/logout');
  return response.data.data;
}

export async function getCurrentUserRequest() {
  const response = await apiClient.get('/auth/me');
  return response.data.data;
}

export async function updateProfileRequest({ username, email }) {
  const response = await apiClient.put('/auth/profile', { username, email });
  return response.data.data;
}

export async function updatePasswordRequest({ currentPassword, newPassword }) {
  const response = await apiClient.put('/auth/password', { currentPassword, newPassword });
  return response.data.data;
}
