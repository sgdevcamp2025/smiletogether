import axios from 'axios';

const https = axios.create({
  baseURL: 'http://localhost:3000', // api 나오면 연결 || api
  withCredentials: true,
  timeout: 10000,
});

https.interceptors.request.use(
  config => {
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
