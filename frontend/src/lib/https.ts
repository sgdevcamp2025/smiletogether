import axios from 'axios';
import { getToken } from '@/lib/utils';
import { postRefreshToken } from '@/apis/user';

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
    } else if (config.url!.startsWith('/api/auth')) {
      config.baseURL = 'http://localhost:8091';
    } else if (config.url!.startsWith('/api/member')) {
      config.baseURL = 'http://localhost:8080';
    } else config.baseURL = import.meta.env.VITE_BASE_SERVER_API_URL;
    config.headers.Authorization = `Bearer ${getToken()}`;
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
  async error => {
    const {
      config,
      response: { status },
    } = error;
    if (status === 401) {
      try {
        const originConfig = config;
        const refreshResponse = await postRefreshToken();
        if (refreshResponse.status === 200) {
          const newAccessToken = refreshResponse.data.accessToken;
          localStorage.setItem('access-token', newAccessToken);
          originConfig.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originConfig);
        } else if (refreshResponse.status === 401) {
          alert('로그인 시간이 만료되었습니다.');
          window.location.href = import.meta.env.VITE_BASE_CLIENT_API_URL;
        }
      } catch (error) {
        alert(`Unable to refresh access token ${error}`);
        window.location.href = import.meta.env.VITE_BASE_CLIENT_API_URL;
      }
    }
    return Promise.reject(error);
  }
);

export default https;
