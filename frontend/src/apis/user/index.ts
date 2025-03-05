import https from '@/lib/https';

// 모킹을 사용하지 않으려면 https에 mockApiList에서 /api.auth를 지워주셔야 합니다!
export const postLogin = async (userId: string) => {
  const response = await https.post(`/api/auth/login`, {
    userId,
  });
  const authorization = response.headers.Authorization;
  if (authorization) {
    const accessToken = response.headers.authorization.split(' ')[1];
    localStorage.setItem('access-token', accessToken);
    localStorage.setItem(
      'refresh-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcklkIjoiMDNjNmIwODMtZThkNi00ODhjLWFhODMtMmEwMWIzZjM5ZDAwIiwiaWF0IjoxNTE2MjM5MDIyfQ.iVTdh4kkGh6f6gEZLf9MJPwkjusaXf58z_Tc4ncummw'
    );
  }
  return response;
};

export const postRefreshToken = async () => {
  const response = await https.post('/api/auth/refresh');
  return response;
};

export const getValidateAccessToken = async () => {
  const { data } = await https.get('/api/auth/verifyAccessToken');
  return data;
};
