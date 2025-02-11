import { create } from 'zustand';

type PageState = 'create' | 'workspace';

interface CardurrentFrameStateProps {
  currentPage: PageState;
  setCurrentPage: (page: PageState) => void;
}

const currentFrameState = create<CardurrentFrameStateProps>()(set => ({
  currentPage: 'create',
  setCurrentPage: page => set({ currentPage: page }),
}));

export default currentFrameState;
