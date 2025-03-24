import { createApi } from '@/lib/createApi';

export const userApi = createApi(import.meta.env.VITE_BASE_USER_API_URL);
export const chatApi = createApi(import.meta.env.VITE_BASE_CHAT_API_URL);
export const spaceApi = createApi(import.meta.env.VITE_BASE_SPACE_API_URL);
export const authApi = createApi(import.meta.env.VITE_BASE_AUTH_API_URL);
export const directMessageApi = createApi('/api/dms');
