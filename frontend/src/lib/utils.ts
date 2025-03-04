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

export const getTocken = () => {
  return localStorage.getItem('access-token');
};

export const getDummyOwnerId = () => {
  return '03c6b083-e8d6-488c-aa83-2a01b3f39d00';
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
