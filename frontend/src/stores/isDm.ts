import { create } from 'zustand';

interface IsDmSideBarState {
  isDmSideBar: boolean;
  setIsDmSideBar: (isDmSideBar: boolean) => void;
}

const useIsDmSideBarStore = create<IsDmSideBarState>(set => ({
  isDmSideBar: false,
  setIsDmSideBar: isDmSideBar => set({ isDmSideBar }),
}));

export default useIsDmSideBarStore;
