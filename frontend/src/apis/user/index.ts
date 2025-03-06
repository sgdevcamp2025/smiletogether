import https from '@/lib/https';
import axios from 'axios';

export const postLogin = async (email: string) => {
  const response = await https.post(`http://localhost:8080/api/auth/sign-in`, {
    email,
  });
  if (response.data.accessToken)
    localStorage.setItem('access-token', response.data.accessToken);

  return response;
};

export const postRegister = async (username: string, email: string) => {
  const response = await https.post(`http://localhost:8080/api/auth/sign-up`, {
    username,
    email,
  });
  if (response.data.accessToken)
    localStorage.setItem('access-token', response.data.accessToken);

  return response;
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
  console.log(response, response.data);
  return response;
};
