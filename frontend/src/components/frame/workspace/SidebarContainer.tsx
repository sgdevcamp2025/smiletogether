import WorkspaceContentSidebar from '@/components/frame/workspace/WorkspaceContentSidebar';
import MainNavigationSidebar from '@/components/frame/workspace/MainNavigationSidebar';
import currentFrameState from '@/stores/currentFrameState';

const SideBarContainer = () => {
  const { currentPage } = currentFrameState();

  return (
    <>
      {currentPage === 'workspace' ? (
        <>
          <MainNavigationSidebar />
          <WorkspaceContentSidebar />
        </>
      ) : (
        <div className="w-80 bg-yellow-200 "></div>
      )}
    </>
  );
};

export default SideBarContainer;
