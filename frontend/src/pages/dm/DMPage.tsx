import SplitPaneLayout from '@/components/common/SplitPaneLayout';
import DMContent from '@/components/dm/DMContent';
import SideBar from '@/components/dm/sideBar';

const DMPage = () => {
  return (
    <div className="flex w-full h-screen overflow-hidden">
      <SplitPaneLayout
        leftPannelDefaultSize={30}
        rightPannelDefaultSize={70}
        children1={<SideBar />}
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
