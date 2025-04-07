// axiosConfig.js
import axios from 'axios';
import { getCookie } from './authUtils';

const axiosInstanceAdmin = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosInstanceAdmin.interceptors.request.use(
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

export default axiosInstanceAdmin;
