import base64 from 'base-64';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isValidEmail = (emailAddress: string) => {
  const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  if (!email_regex.test(emailAddress)) return false;
  return true;
};

export const isValidKoreanEnglish = (text: string): boolean => {
  const koreanEnglishRegex = /^[가-힣a-zA-Z]+$/; // 한글 + 영어만 허용
  return koreanEnglishRegex.test(text);
};

export const getToken = () => {
  return localStorage.getItem('access-token');
};

export const getOwnerId = () => {
  const token = localStorage.getItem('access-token');
  if (!token) {
    window.location.href = import.meta.env.VITE_BASE_CLIENT_API_URL;
    return false;
  }
  const payload = token.substring(
    token.indexOf('.') + 1,
    token.lastIndexOf('.')
  );
  const dec = base64.decode(payload);
  const json = JSON.parse(dec);
  return json.userId;
};

export const handleCopyClipBoard = async (
  content: string,
  successMessage: string,
  failMessage: string
) => {
  try {
    await navigator.clipboard.writeText(content);
    alert(successMessage);
  } catch (e) {
    alert(failMessage);
  }
};
