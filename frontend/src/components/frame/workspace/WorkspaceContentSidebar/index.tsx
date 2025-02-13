import WorkspaceChannelSidebar from '@/components/frame/workspace/WorkspaceContentSidebar/WorkspaceChannelSidebar';
import WorkspaceDmSidebar from '@/components/frame/workspace/WorkspaceContentSidebar/WorkspaceDmSidebar';
import WorkspaceMyActiveSidebar from '@/components/frame/workspace/WorkspaceContentSidebar/WorkspaceMyActiveSidebar';
import { useWorkspaceSidebarStore } from '@/stores/workspace';

const WorkspaceContentSidebar = () => {
  const { activeSidebar } = useWorkspaceSidebarStore();
  // 여기 내용을 알맞게 바꾸기 (홈, DM, 내 활동 등)
  return (
    <div className="w-80 bg-yellow-200 ">
      {activeSidebar === 'Home' && <WorkspaceChannelSidebar />}
      {activeSidebar === 'DM' && <WorkspaceDmSidebar />}
      {activeSidebar === 'MyActive' && <WorkspaceMyActiveSidebar />}
    </div>
  );
};

export default WorkspaceContentSidebar;
