import { userApi, authApi, spaceApi } from '@/lib/clients';

export const postSignIn = async (email: string) => {
  const { data } = await userApi.post(`/api/auth/sign-in`, {
    email,
  });
  return data;
};

export const postLogin = async (memberId: string) => {
  const { data } = await authApi.post(`/api/auth/login`, {
    userId: memberId,
  });
  return data;
};

export const postRegister = async (username: string, email: string) => {
  const { data } = await userApi.post(`/api/auth/sign-up`, {
    username,
    email,
  });
  return data;
};

export const postRefreshToken = async () => {
  const response = await authApi.post('/api/auth/refresh');
  return response;
};

export const postSendEmailCode = async (email: string): Promise<string> => {
  const { data } = await userApi.post(`/api/auth/send-code?email=${email}`);
  return data;
};

export const postConfirmEmail = async (email: string, code: string) => {
  const { data } = await userApi.post(`/api/auth/certificate-email`, {
    email,
    code,
  });
  return data;
};

export const getMyWorkspaceInfo = async (
  workspaceId: string,
  userId: string
) => {
  const { data } = await spaceApi.get(
    `/api/workspaces/${workspaceId}/users/${userId}`
  );

  return data;
};
