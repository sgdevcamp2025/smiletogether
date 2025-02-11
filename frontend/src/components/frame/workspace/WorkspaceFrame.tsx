import { Outlet } from 'react-router-dom';
import WorkspaceHeader from '@/components/frame/workspace/WorkspaceHeader';
import WorkspaceSideBar from '@/components/frame/workspace/WorkspaceSidebar';
import SideBarContainer from '@/components/frame/workspace/SidebarContainer';

const WorkspaceFrame = () => {
  return (
    <div className="flex h-screen flex-col">
      <WorkspaceHeader />
      <div className="flex flex-1">
        <WorkspaceSideBar />
        <SideBarContainer />
        <Outlet />
      </div>
    </div>
  );
};

export default WorkspaceFrame;
