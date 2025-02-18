import { create } from 'zustand';

type ModalType =
  | 'WORKSPACE_MENU'
  | 'USER_INVITE'
  | 'WORKSPACE_LEAVE'
  | 'WORKSPACE_DELETE';

interface ModalStoreProps {
  modal: ModalType | null;
  setModal: (key: ModalType | null) => void;
  isOpen: (key: ModalType) => boolean;
  closeModal: () => void;
}

export const modalStore = create<ModalStoreProps>()((set, get) => ({
  modal: null,
  setModal: key => set({ modal: key }),
  isOpen: key => get().modal === key,
  closeModal: () => set({ modal: null }),
}));
