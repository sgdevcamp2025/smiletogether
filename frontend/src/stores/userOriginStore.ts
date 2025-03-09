import { create } from 'zustand';

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

export const userOriginStore = create<UserState>(set => ({
  user: {
    createdAt: '',
    email: '',
    id: '',
    updatedAt: '',
    username: '',
  },
  setUser: user => set(state => ({ user: { ...state.user, ...user } })),
}));
