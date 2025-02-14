import { Outlet } from 'react-router-dom';
import WorkspaceHeader from '@/components/frame/workspace/WorkspaceHeader';
import WorkspaceSideBar from '@/components/frame/workspace/WorkspaceSidebar';
import MainNavigationSidebar from '@/components/frame/workspace/MainNavigationSidebar';

const WorkspaceFrame = () => {
  return (
    <div className="flex h-screen flex-col w-full">
      <WorkspaceHeader />
      <div className="flex flex-1">
        <WorkspaceSideBar />
        <MainNavigationSidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default WorkspaceFrame;
