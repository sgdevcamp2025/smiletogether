import WorkspaceIconButton from '@/components/workspace/WorkspaceIconButton';
import useWorkSpaceQuery from '@/hooks/workspace/useWorkSpaceQuery';
import currentFrameState from '@/stores/currentFrameState.store';
import { useWorkspaceCreationStore } from '@/stores/workspace.store';
import { NAVIGATION_ICONS } from '@/constants/navItems';

const WorkspaceSideBar = () => {
  const { currentPage } = currentFrameState();
  const { workspaceName } = useWorkspaceCreationStore();
  const name = workspaceName ? workspaceName[0].toUpperCase() : 'W';
  const { data } = useWorkSpaceQuery();

  const filterdIcons = Object.values(NAVIGATION_ICONS).filter(
    item => item.label === '홈' || item.label === '더보기'
  );

  return (
    <div className=" min-w-16 bg-yellow-400 text-white flex py-2 flex-col items-center gap-2">
      {currentPage === 'workspace' ? (
        <>
          <div className="flex flex-col items-center justify-center">
            {data &&
              data.workspaces.map(item => {
                return (
                  <WorkspaceIconButton className="bg-gray-400 rounded-xl">
                    {item.name.slice(0, 2)}
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
          {filterdIcons.map(item => {
            return (
              <WorkspaceIconButton className="bg-transparent">
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
