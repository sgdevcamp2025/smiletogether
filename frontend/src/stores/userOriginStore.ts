import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ORIGIN_USER {
  createdAt: string;
  email: string;
  id: string;
  updatedAt: string;
  username: string;
}

interface UserState {
  user: ORIGIN_USER;
  setUser: (user: Partial<UserState['user']>) => void;
}

export const userOriginStore = create(
  persist<UserState>(
    set => ({
      user: {
        createdAt: '',
        email: '',
        id: '',
        updatedAt: '',
        username: '',
      },
      setUser: user => set(state => ({ user: { ...state.user, ...user } })),
    }),
    { name: 'userOriginStore-name' }
  )
);
