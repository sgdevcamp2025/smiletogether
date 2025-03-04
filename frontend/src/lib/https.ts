import axios from 'axios';
import { getTocken } from '@/lib/utils';

const mockApiList = ['/api/dms', '/api/auth'];

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
    const authorization = response.headers.Authorization;
    if (authorization) {
      const accessToken = response.headers.authorization.split(' ')[1];
      localStorage.setItem('access-token', accessToken);
      localStorage.setItem(
        'refresh-token',
        '        eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcklkIjoiMDNjNmIwODMtZThkNi00ODhjLWFhODMtMmEwMWIzZjM5ZDAwIiwiaWF0IjoxNTE2MjM5MDIyfQ.iVTdh4kkGh6f6gEZLf9MJPwkjusaXf58z_Tc4ncummw'
      );
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default https;
