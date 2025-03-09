import https from '@/lib/https';

export const postLogin = async (email: string) => {
  const signInResponse = await https.post(
    `http://localhost:8080/api/auth/sign-in`,
    {
      email,
    }
  );

  const { isMember, member } = signInResponse.data;

  if (!isMember) return { signInResponse };

  const issueTokenResponse = await https.post(
    `http://localhost:8091/api/auth/login`,
    {
      userId: member.id,
    }
  );
  if (issueTokenResponse.data.accessToken)
    localStorage.setItem('access-token', issueTokenResponse.data.accessToken);

  return { signInResponse, issueTokenResponse };
};

export const postRegister = async (username: string, email: string) => {
  const registerResponse = await https.post(
    `http://localhost:8080/api/auth/sign-up`,
    {
      username,
      email,
    }
  );
  if (registerResponse.data.code == '201') {
    return await postLogin(email);
  }
  return registerResponse;
};

export const postRefreshToken = async () => {
  const response = await https.post('http://localhost:8091/api/auth/refresh');
  return response;
};

export const postSendEmailCode = async (email: string) => {
  await https.post(`http://localhost:8080/api/auth/send-code?email=${email}`);
  return;
};

export const postConfirmEmail = async (email: string, code: string) => {
  const response = await https.post(
    `http://localhost:8080/api/auth/certificate-email`,
    {
      email,
      code,
    }
  );
  return response;
};

export const getMyWorkspaceInfo = async (
  workspaceId: string,
  userId: string
) => {
  const { data } = await https.get(
    `http://localhost:8090/api/workspaces/${workspaceId}/users/${userId}`
  );

  return data;
};
