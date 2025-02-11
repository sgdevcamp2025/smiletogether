import { create } from 'zustand';

interface WorkspaceCreationState {
  step: number;
  workspaceName: string;
  userName: string;
  workspaceProfileImage: string;
  invitedUsers: string[];
  setStep: (step: number) => void;
  setWorkspaceName: (name: string) => void;
  setUserName: (name: string) => void;
  setWorkspaceProfileImage: (setWorkspaceProfileImage: string) => void;
  setInvitedUsers: (users: string[]) => void;
  initWorkspaceStore: () => void;
}

export const useWorkspaceCreationStore = create<WorkspaceCreationState>(
  set => ({
    step: 1,
    workspaceName: '',
    userName: '',
    workspaceProfileImage: '',
    invitedUsers: [],
    setStep: step => set({ step }),
    setWorkspaceName: name => set({ workspaceName: name }),
    setUserName: name => set({ userName: name }),
    setWorkspaceProfileImage: (workspaceProfileImage: string) =>
      set({ workspaceProfileImage }),
    setInvitedUsers: users => set({ invitedUsers: users }),
    initWorkspaceStore: () =>
      set({
        step: 1,
        workspaceName: '',
        userName: '',
        workspaceProfileImage: '',
        invitedUsers: [],
      }),
  })
);

type SidebarType = 'Home' | 'MyActive' | 'DM';
interface useWorkspaceSidebarStoreState {
  activeSidebar: SidebarType;
  setActiveSidebar: (currentPage: SidebarType) => void;
}

export const useWorkspaceSidebarStore = create<useWorkspaceSidebarStoreState>()(
  set => ({
    activeSidebar: 'Home',
    setActiveSidebar: currentPage => set({ activeSidebar: currentPage }),
  })
);
