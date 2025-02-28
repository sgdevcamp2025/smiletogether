import axios from 'axios';
import { getTocken } from '@/lib/utils';

const mockApiList = ['/api/dms'];

const https = axios.create({
  withCredentials: true,
  timeout: 10000,
});

https.interceptors.request.use(
  config => {
    const isMockApi = mockApiList.some(item => config.url!.startsWith(item));

    if (isMockApi) {
      config.baseURL = '';
    } else {
      config.baseURL = import.meta.env.VITE_BASE_API_URL;
    }

    config.headers.Authorization = `Bearer ${getTocken()}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

https.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default https;
