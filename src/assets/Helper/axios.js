import axios from 'axios';
import { API_BASE_URLS } from './constant';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: API_BASE_URLS.baseUrl_V1,
});

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    if (error?.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
