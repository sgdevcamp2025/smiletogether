import axios from 'axios';
import { getTocken } from '@/lib/utils';

const https = axios.create({
  withCredentials: true,
  timeout: 10000,
});

https.interceptors.request.use(
  config => {
    config.baseURL = import.meta.env.VITE_BASE_API_URL;
    config.headers.Authorization = `Bearer ${getTocken()}`;
    console.log(config.url, config.method, config.data);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

https.interceptors.response.use(
  response => {
    console.log(`response ${response.config.url}`, response);
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default https;
