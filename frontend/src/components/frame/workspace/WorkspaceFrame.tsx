import { Outlet, useNavigate, useParams } from 'react-router-dom';
import WorkspaceHeader from '@/components/frame/workspace/WorkspaceHeader';
import WorkspaceSideBar from '@/components/frame/workspace/WorkspaceSidebar';
import MainNavigationSidebar from '@/components/frame/workspace/MainNavigationSidebar';
import { useEffect } from 'react';
import { getMyWorkspaceInfo } from '@/apis/user';
import { getOwnerId } from '@/lib/utils';
import { useUserStore } from '@/stores/userStore';

const WorkspaceFrame = () => {
  const { workspaceId } = useParams();
  const naviagate = useNavigate();
  const { setUser } = useUserStore();
  useEffect(() => {
    if (!workspaceId) return;

    const fetchWorkspaceInfo = async () => {
      if (!getOwnerId()) naviagate('/');
      try {
        const userData = await getMyWorkspaceInfo(workspaceId, getOwnerId());
        setUser(userData);
      } catch (error) {
        alert(`워크스페이스 유저 프로필 조회 : ${error}`);
        naviagate('/');
      }
    };
    fetchWorkspaceInfo();
  }, [workspaceId]);
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
