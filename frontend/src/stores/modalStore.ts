import { create } from 'zustand';

export type ModalType =
  | 'WORKSPACE_MENU'
  | 'USER_INVITE'
  | 'WORKSPACE_LEAVE'
  | 'WORKSPACE_DELETE'
  | 'CHANNEL_CREATE'
  | 'CHANNEL_MENU';

interface ModalStoreProps {
  modal: ModalType | null;
  setModal: (key: ModalType | null) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStoreProps>()(set => ({
  modal: null,
  setModal: key => {
    set({ modal: key });
  },
  closeModal: () => set({ modal: null }),
}));
