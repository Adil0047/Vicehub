import axios from 'axios';
import { ENV } from './environment.js';

/**
 * Pre-configured axios instance for all API calls.
 * Interceptors for auth tokens are added in Phase 2.
 */
const apiClient = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
