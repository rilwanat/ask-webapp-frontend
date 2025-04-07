// axiosConfig.js
import axios from 'axios';
import { getCookie } from './authUtils';

const axiosInstanceUser = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosInstanceUser.interceptors.request.use(
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

export default axiosInstanceUser;
