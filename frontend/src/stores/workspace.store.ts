import { create } from 'zustand';

interface newWorkspaceInfoProps {
  workspaceName: string;
  userName: string;
  profileImage: string;
  inviteUserList: string[];
}

interface WorkspaceCreationStoreProps {
  step: number;
  newWorkspaceInfo: newWorkspaceInfoProps;
  init: () => void;
  setStep: () => void;
  setNewWorkspaceName: (name: string) => void;
  setProfile: (userName: string, profileImage: string) => void;
  setInviteUsers: (inviteUserList: string[]) => void;
}

export const workspaceCreationStore = create<WorkspaceCreationStoreProps>(
  set => ({
    step: 1,
    newWorkspaceInfo: {
      workspaceName: '',
      userName: '',
      profileImage: '',
      inviteUserList: [],
    },
    init: () =>
      set(() => ({
        newWorkspaceInfo: {
          workspaceName: '',
          userName: '',
          profileImage: '',
          inviteUserList: [],
        },
      })),
    setStep: () => set(state => ({ step: state.step + 1 })),
    setNewWorkspaceName: (name: string) =>
      set(state => ({
        newWorkspaceInfo: {
          ...state.newWorkspaceInfo,
          workspaceName: name,
        },
      })),
    setProfile: (userName: string, profileImage: string) =>
      set(state => ({
        newWorkspaceInfo: {
          ...state.newWorkspaceInfo,
          userName,
          profileImage,
        },
      })),
    setInviteUsers: (inviteUserList: string[]) =>
      set(state => ({
        newWorkspaceInfo: {
          ...state.newWorkspaceInfo,
          inviteUserList,
        },
      })),
  })
);
