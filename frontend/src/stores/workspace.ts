import { create } from 'zustand';

interface WorkspaceCreationState {
  step: number;
  workspaceName: string;
  userName: string;
  workspaceProfileImage: string;
  invitedUsers: string[];
  setStep: (newStep: number) => void;
  setWorkspaceName: (newName: string) => void;
  setUserName: (newName: string) => void;
  setWorkspaceProfileImage: (newImage: string) => void;
  setInvitedUsers: (newUsers: string[]) => void;
  initWorkspaceStore: () => void;
}

export const useWorkspaceCreationStore = create<WorkspaceCreationState>(
  set => ({
    step: 1,
    workspaceName: '',
    userName: '',
    workspaceProfileImage: '',
    invitedUsers: [],
    setStep: newStep => set({ step: newStep }),
    setWorkspaceName: newName => set({ workspaceName: newName }),
    setUserName: newName => set({ userName: newName }),
    setWorkspaceProfileImage: newImage =>
      set({ workspaceProfileImage: newImage }),
    setInvitedUsers: newUsers => set({ invitedUsers: newUsers }),
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

// 워크스페이스 사이드바 상태 관리 스토어 추가
type SidebarType = 'Home' | 'DM' | 'MyActive';

interface WorkspaceSidebarState {
  activeSidebar: SidebarType;
  setActiveSidebar: (newType: SidebarType) => void;
}

export const useWorkspaceSidebarStore = create<WorkspaceSidebarState>(set => ({
  activeSidebar: 'Home',
  setActiveSidebar: newType => set({ activeSidebar: newType }),
}));
