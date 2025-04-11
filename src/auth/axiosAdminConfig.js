// axiosConfig.js
import axios from 'axios';
import { getCookie } from './authUtils';

const axiosAdminInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosAdminInstance.interceptors.request.use(
  (config) => {
    const token = getCookie('ask-admin-token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosAdminInstance;
