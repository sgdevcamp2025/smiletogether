import { create } from 'zustand';
import { User } from '@/types/user';

interface UserState {
  user: User;
  setUser: (user: Partial<UserState['user']>) => void;
}

export const useUserStore = create<UserState>(set => ({
  user: {
    userId: '03c6b083-e8d6-488c-aa83-2a01b3f39d00',
    username: 'Subin Kim',
    displayName: '',
    profileImage: 'https://example.com/profile/subin.jpg',
    position: '인재영입팀 김수빈 과장 (DevRel)',
    isActive: true,
    statusMessage: '고민이 있다면 언제든 메시지 주세요!',
  },
  setUser: user => set(state => ({ user: { ...state.user, ...user } })),
}));
