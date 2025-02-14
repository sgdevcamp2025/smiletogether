import { Outlet } from 'react-router-dom';
import WorkspaceHeader from '@/components/frame/workspace/WorkspaceHeader';
import WorkspaceSideBar from '@/components/frame/workspace/WorkspaceSidebar';
import MainNavigationSidebar from '@/components/frame/workspace/MainNavigationSidebar';
import WorkspaceContentSidebar from '@/components/frame/workspace/WorkspaceContentSidebar';

const WorkspaceFrame = () => {
  return (
    <div className="flex h-screen flex-col w-full">
      <WorkspaceHeader />
      <div className="flex flex-1">
        <WorkspaceSideBar />
        <MainNavigationSidebar />
        <WorkspaceContentSidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default WorkspaceFrame;
