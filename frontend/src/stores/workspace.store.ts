import { create } from 'zustand';

interface WorkspaceCreationState {
  step: number;
  workspaceName: string;
  userName: string;
  invitedUsers: string[];
  setStep: (step: number) => void;
  setWorkspaceName: (name: string) => void;
  setUserName: (name: string) => void;
  setInvitedUsers: (users: string[]) => void;
  initWorkspaceStore: () => void;
}

export const useWorkspaceCreationStore = create<WorkspaceCreationState>(
  set => ({
    step: 1,
    workspaceName: '',
    userName: '',
    invitedUsers: [],
    setStep: step => set({ step }),
    setWorkspaceName: name => set({ workspaceName: name }),
    setUserName: name => set({ userName: name }),
    setInvitedUsers: users => set({ invitedUsers: users }),
    initWorkspaceStore: () =>
      set({ step: 1, workspaceName: '', userName: '', invitedUsers: [] }),
  })
);
