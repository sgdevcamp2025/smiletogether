import { Outlet } from 'react-router-dom';
import { IoHomeOutline } from 'react-icons/io5';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { useWorkspaceCreationStore } from '@/stores/workspace.store';

const WorkspaceFrame = () => {
  return (
    <div className="flex h-screen flex-col">
      <MainFrameHeader />
      <div className="flex flex-1">
        <WorkspaceSideBar />
        <MainSidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default WorkspaceFrame;

const MainFrameHeader = () => {
  return <div className="p-4 bg-yellow-400 w-full h-12"></div>;
};

const WorkspaceSideBar = () => {
  const { workspaceName } = useWorkspaceCreationStore();
  return (
    <div className=" min-w-16 bg-yellow-400 text-white flex py-2 flex-col items-center gap-6">
      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
        <span className="text-sm font-semibold">{workspaceName}</span>
      </div>
      <div className="w-8 h-8 flex items-center justify-center rounded">
        <IoHomeOutline className="w-5 h-5" />
      </div>
      <div className="w-10 h-10 flex flex-col items-center justify-center rounded">
        <BiDotsHorizontalRounded className="w-8 h-8" />
        <span className="text-xs">더보기</span>
      </div>
    </div>
  );
};

const MainSidebar = () => {
  return <div className="w-80 bg-yellow-200 "></div>;
};
