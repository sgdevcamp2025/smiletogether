import axios from 'axios';
import { getTocken } from '@/lib/utils';

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
    } else {
      config.baseURL = import.meta.env.VITE_BASE_SERVER_API_URL;
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
  async error => {
    // 인터셉터를 통한 엑세스 토큰 재발급 및 리프레시 토큰 만료시 리다이렉트 로직
    // const {
    //   config,
    //   response: { status },
    // } = error;
    // if (status === 401) {
    //   if (error.response.data.message === 'Authorization header missing') {
    //     const originRequest = config;
    //     console.log('originRequest', originRequest);
    //     const response = await postRefreshToken();
    //     console.log('response', response);
    //     if (response.status === 200) {
    //       // 재 발급받은 렉세스 토큰 저장
    //       const newAcceessTocken = response.~~~
    //       axios.defaults.headers.common.Authorization = `Bearer ${newAcceessTocken}`;
    //       return axios(originRequest)
    //     } else if (response.data.message === "Refresh token not found"){
    //       navigate('/')
    //     }
    //   }
    // }
    return Promise.reject(error);
  }
);

export default https;
