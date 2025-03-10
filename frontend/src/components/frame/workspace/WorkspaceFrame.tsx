import { Outlet, useNavigate, useParams } from 'react-router-dom';
import WorkspaceHeader from '@/components/frame/workspace/WorkspaceHeader';
import WorkspaceSideBar from '@/components/frame/workspace/WorkspaceSidebar';
import MainNavigationSidebar from '@/components/frame/workspace/MainNavigationSidebar';
import { useEffect } from 'react';
import { getMyWorkspaceInfo } from '@/apis/user';
import { userOriginStore } from '@/stores/userOriginStore';

const WorkspaceFrame = () => {
  const { workspaceId } = useParams();
  const { user } = userOriginStore();
  const naviagate = useNavigate();
  useEffect(() => {
    if (!workspaceId) return;

    const fetchWorkspaceInfo = async () => {
      if (!user) naviagate('/');
      try {
        await getMyWorkspaceInfo(workspaceId, user.id!);
      } catch (error) {
        alert(`워크스페이스 유저 프로필 조회 : ${error}`);
        naviagate('/');
      }
    };

    fetchWorkspaceInfo();
  }, [workspaceId, user]);
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
