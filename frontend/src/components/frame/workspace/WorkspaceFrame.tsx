import { Outlet } from 'react-router-dom';
import WorkspaceHeader from '@/components/frame/workspace/WorkspaceHeader';
import WorkspaceSideBar from '@/components/frame/workspace/WorkspaceSidebar';
import MainNavigationSidebar from '@/components/frame/workspace/MainNavigationSidebar';

const WorkspaceFrame = () => {
  return (
    <div className="flex flex-col w-full max-h-screen">
      <WorkspaceHeader />
      <div className="flex h-[calc(100vh-48px)]">
        <WorkspaceSideBar />
        <MainNavigationSidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default WorkspaceFrame;
