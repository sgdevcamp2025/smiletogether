import { createApi } from '@/lib/createApi';

// VITE_BASE_USER_API_URL = http://localhost:8080
// VITE_BASE_CHAT1_API_URL = http://localhost:8081
// VITE_BASE_CHAT2_API_URL = http://localhost:8082
// VITE_BASE_CHAT3_API_URL = http://localhost:8083
// VITE_BASE_HISTORY_API_URL = http://localhost:8084
// VITE_BASE_SPACE_API_URL = http://localhost:8090
// VITE_BASE_AUTH_API_URL = http://localhost:8091
// VITE_BASE_CLIENT_API_URL = http://localhost:5173

export const userApi = createApi(import.meta.env.VITE_BASE_USER_API_URL);
export const chatApi = createApi(import.meta.env.VITE_BASE_CHAT3_API_URL);
export const spaceApi = createApi(import.meta.env.VITE_BASE_SPACE_API_URL);
export const authApi = createApi(import.meta.env.VITE_BASE_AUTH_API_URL);
export const directMessageApi = createApi('/api/dms');
