import axios from 'axios';
import { getTocken } from '@/lib/utils';

const mockApiList = ['/api/workspaces'];

const https = axios.create({
  withCredentials: true,
  timeout: 10000,
});

https.interceptors.request.use(
  config => {
    if (mockApiList.some(path => !config.url?.startsWith(path))) {
      config.baseURL = import.meta.env.VITE_BASE_API_URL;
    } else {
      config.baseURL = '/api';
    }
    config.headers.Authorization = `Bearer ${getTocken()}`;
    console.log(config);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

https.interceptors.response.use(
  response => {
    console.log('response', response);
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default https;
