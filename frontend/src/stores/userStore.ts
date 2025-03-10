import { create } from 'zustand';
import { User } from '@/types/user';
import { useEffect } from 'react';
import https from '@/lib/https';
import { getOwnerId } from '@/lib/utils';

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

const getWorkspaceUser = async (workspaceId: string): Promise<User> => {
  const response = await https.get(
    `/api/workspaces/${workspaceId}/users/${getOwnerId()}`
  );
  console.log(response.data);
  return response.data;
};

export const useUser = (workspaceId: string) => {
  const { user, setUser } = useUserStore();

  useEffect(() => {
    if (user.userId === '') {
      const getUserData = async () => {
        const userData = await getWorkspaceUser(workspaceId);
        setUser(userData);
      };

      getUserData();
    }
  }, [workspaceId, user.userId, setUser]);

  return { user };
};
