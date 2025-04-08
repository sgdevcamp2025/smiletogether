import { create } from 'zustand';
interface IsDmState {
  dmId: string | null;
  setDmId: (dmId: string | null) => void;
}

const useIsDmStore = create<IsDmState>(set => ({
  dmId: null,
  setDmId: dmId => set({ dmId }),
}));

export default useIsDmStore;
