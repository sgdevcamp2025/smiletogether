import axios from 'axios';
import { getToken } from '@/lib/utils';
import { postRefreshToken } from '@/apis/user';

// mocking을 위한 api들만 관리하는 배열입니다. 모킹 api를 넣읅시 baseURL이 달라지기에 백엔드와 연동시 지워주세요
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
        const refreshResponse = await postRefreshToken();
        const newAccessToken = refreshResponse.data.accessToken;
        localStorage.setItem('access-token', newAccessToken);
        config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(config);
      } catch (error) {
        console.error('Unable to refresh access token', error);
        window.location.href = `${import.meta.env.VITE_BASE_CLIENT_API_URL}`;
      }
    }
    return Promise.reject(error);
  }
);

export default https;
