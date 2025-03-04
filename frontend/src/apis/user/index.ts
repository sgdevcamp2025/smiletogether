import https from '@/lib/https';

export const postLogin = async (userId: string) => {
  const { data } = await https.post(`/api/auth/login`, {
    userId,
  });
  return data;
};
