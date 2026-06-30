import apiClient from '@config/axios';

/**
 * Calls the backend health check endpoint.
 * Used to verify client/server connectivity during development.
 */
export async function checkHealth() {
  const response = await apiClient.get('/health');
  return response.data;
}
