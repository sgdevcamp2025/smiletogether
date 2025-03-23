import { userApi, authApi, spaceApi } from '@/lib/https';

export const postLogin = async (email: string) => {
  const signInResponse = await userApi.post(`/api/auth/sign-in`, {
    email,
  });

  const { isMember, member } = signInResponse.data;

  if (!isMember) return { signInResponse };

  const issueTokenResponse = await authApi.post(`/api/auth/login`, {
    userId: member.id,
  });
  if (issueTokenResponse.data.accessToken)
    localStorage.setItem('access-token', issueTokenResponse.data.accessToken);

  return { signInResponse, issueTokenResponse };
};

export const postRegister = async (username: string, email: string) => {
  const registerResponse = await userApi.post(`/api/auth/sign-up`, {
    username,
    email,
  });
  if (registerResponse.data.code == '201') {
    return await postLogin(email);
  }
  return registerResponse;
};

export const postRefreshToken = async () => {
  const response = await authApi.post('/api/auth/refresh');
  return response;
};

export const postSendEmailCode = async (email: string) => {
  await userApi.post(`/api/auth/send-code?email=${email}`);
  return;
};

export const postConfirmEmail = async (email: string, code: string) => {
  const response = await userApi.post(`/api/auth/certificate-email`, {
    email,
    code,
  });
  return response;
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
