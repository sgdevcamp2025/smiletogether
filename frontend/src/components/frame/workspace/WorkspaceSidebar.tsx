import WorkspaceIconButton from '@/components/workspace/WorkspaceIconButton';
import useUserWorkspacesQuery from '@/hooks/workspace/useUserWorkspacesQuery';
import { NAVIGATION_ICONS } from '@/constants/navItems';
import currentFrameState from '@/stores/currentFrameState';
import { useWorkspaceCreationStore } from '@/stores/workspace';

const WorkspaceSideBar = () => {
  const { currentPage } = currentFrameState();
  const { workspaceName } = useWorkspaceCreationStore();
  const name = workspaceName ? workspaceName[0].toUpperCase() : 'W';
  const { data } = useUserWorkspacesQuery();

  const filterdIcons = Object.values(NAVIGATION_ICONS).filter(
    item => item.label === '홈' || item.label === '더보기'
  );

  return (
    <div className=" min-w-16 bg-yellow-400 text-white flex py-2 flex-col items-center gap-2">
      {currentPage === 'workspace' ? (
        <>
          <div className="flex flex-col items-center justify-center">
            {data?.workspaces?.map((item, index) => {
              return (
                <WorkspaceIconButton
                  key={index}
                  className="bg-gray-400 rounded-xl"
                >
                  {item.name ? item.name.slice(0, 2) : 'W'}
                </WorkspaceIconButton>
              );
            })}
            <WorkspaceIconButton className="bg-transparent">
              +
            </WorkspaceIconButton>
          </div>
        </>
      ) : (
        <>
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-sm font-semibold">{name}</span>
          </div>
          {filterdIcons.map((item, index) => {
            return (
              <WorkspaceIconButton key={index} className="bg-transparent">
                {item.icon}
                <span>{item.label}</span>
              </WorkspaceIconButton>
            );
          })}
        </>
      )}
    </div>
  );
};

export default WorkspaceSideBar;
