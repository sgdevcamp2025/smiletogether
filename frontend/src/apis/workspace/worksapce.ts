import https from '@/lib/https';

export const getWorkSpaceList = async () => {
  const response = await https.get('/api/workspaces');
  return response.data;
};
