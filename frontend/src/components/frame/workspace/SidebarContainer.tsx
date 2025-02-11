import WorkspaceContentSidebar from '@/components/frame/workspace/WorkspaceContentSidebar';
import MainNavigationSidebar from '@/components/frame/workspace/MainNavigationSidebar';
import currentFrameState from '@/stores/currentFrameState';

const SideBarContainer = () => {
  const { currentPage } = currentFrameState();

  return (
    <>
      {currentPage === 'workspace' && <MainNavigationSidebar />}
      <WorkspaceContentSidebar />
    </>
  );
};

export default SideBarContainer;
