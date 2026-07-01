import axios from 'axios';
import { ENV } from './environment.js';

/**
 * Pre-configured axios instance for all API calls.
 * A request interceptor automatically attaches the stored JWT
 * (if present) to every outgoing request's Authorization header.
 */
const apiClient = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const TOKEN_STORAGE_KEY = 'vicehub_token';

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { TOKEN_STORAGE_KEY };
export default apiClient;
