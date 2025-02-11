import ChannelSidebar from '@/components/frame/workspace/ChannelSidebar';
import MainNavigationSidebar from '@/components/frame/workspace/MainNavigationSidebar';
import currentFrameState from '@/stores/currentFrameState.store';

const SideBarContainer = () => {
  const { currentPage } = currentFrameState();

  return (
    <>
      {currentPage === 'workspace' && <MainNavigationSidebar />}
      <ChannelSidebar />
    </>
  );
};

export default SideBarContainer;
