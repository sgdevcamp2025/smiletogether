import { postRefreshToken } from '@/apis/user';
import { getToken } from '@/lib/utils';
import axios from 'axios';

export const createApi = (apiUrl: string) => {
  const instance = axios.create({
    baseURL: apiUrl,
    withCredentials: true,
    timeout: 10000,
  });

  instance.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${getToken()}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
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
            localStorage.clear();
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

  return instance;
};
