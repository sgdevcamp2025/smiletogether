import { create } from 'zustand';
import { User } from '@/types/user';

interface UserState {
  user: User;
  setUser: (user: Partial<UserState['user']>) => void;
}

export const useUserStore = create<UserState>(set => ({
  user: {
    userId: '',
    username: '',
    displayName: '',
    profileImage: '',
    position: '',
    isActive: false,
    statusMessage: '',
  },
  setUser: user => set(state => ({ user: { ...state.user, ...user } })),
}));
