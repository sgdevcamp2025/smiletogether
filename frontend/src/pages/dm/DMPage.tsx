import SplitPaneLayout from '@/components/common/SplitPaneLayout';
import DMContent from '@/components/dm/DMContent';
import SideBar from '@/components/dm/sideBar';
import WorkspaceChannelPanel from '@/components/workspace/WorkspaceChannelPanel';
import useIsDmSideBarStore from '@/stores/isDm';

const DMPage = () => {
  const { isDmSideBar } = useIsDmSideBarStore();
  return (
    <div className="flex w-full h-screen overflow-hidden">
      <SplitPaneLayout
        leftPannelDefaultSize={30}
        rightPannelDefaultSize={70}
        children1={isDmSideBar ? <SideBar /> : <WorkspaceChannelPanel />}
        children2={
          <div className="w-full">
            <DMContent />
          </div>
        }
      />
    </div>
  );
};

export default DMPage;
