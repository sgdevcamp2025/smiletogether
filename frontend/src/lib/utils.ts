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
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcklkIjoiMjVjN2VhNWYtMzY3ZC00ZDlmLThkYmItMDk2Mjk2MTYxMTcwIiwiaWF0IjoxNTE2MjM5MDIyfQ.Stu0ZXYcc47yTeOKN7LziHyb91unNElS5DCR_BCwelg';
};
