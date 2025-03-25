import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  createdAt: string;
  email: string;
  id: string;
  updatedAt: string;
  username: string;
}
interface UserState {
  user: User;
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
