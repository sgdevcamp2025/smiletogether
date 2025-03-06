import https from '@/lib/https';

export const postLogin = async (userId: string) => {
  const response = await https.post(`/api/auth/login`, {
    userId,
  });
  localStorage.setItem('access-token', response.data.accessToken);
  return response;
};

export const postRefreshToken = async () => {
  const response = await https.post('/api/auth/refresh');
  return response;
};
