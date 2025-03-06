import WorkspaceIconButton from '@/components/workspace/WorkspaceIconButton';
import useUserWorkspacesQuery from '@/hooks/workspace/useUserWorkspacesQuery';
import { useNavigate, useParams } from 'react-router';

const WorkspaceSideBar = () => {
  const { workspacesInfo, isWorkspacesLoading, isWorkspacesError } =
    useUserWorkspacesQuery();
  const { workspaceId } = useParams();
  const navigate = useNavigate();

  if (isWorkspacesLoading) return <p>로딩중</p>;
  if (isWorkspacesError) return <p>에러</p>;

  const navigateToWorkspace = (workspaceId: string) => {
    navigate(`/workspace/${workspaceId}`);
  };

  const navigateToCreateWorkspace = () => {
    navigate(`/workspace/create`);
  };

  return (
    <div className=" min-w-20 bg-yellow-400 text-white flex py-2 flex-col items-center gap-2">
      <div className="flex flex-col items-center justify-center">
        {workspacesInfo &&
          workspacesInfo.workspaces.map(item => {
            return (
              <WorkspaceIconButton
                key={item.workspaceId}
                className={`bg-gray-400 rounded-xl" ${item.workspaceId === workspaceId ? 'bg-gray-300' : null}`}
                onClick={() => navigateToWorkspace(item.workspaceId)}
              >
                <span className="text-xl">
                  {item.name ? item.name.slice(0, 2) : 'W'}
                </span>
              </WorkspaceIconButton>
            );
          })}
        <WorkspaceIconButton
          className="bg-transparent"
          onClick={navigateToCreateWorkspace}
        >
          +
        </WorkspaceIconButton>
      </div>
    </div>
  );
};

export default WorkspaceSideBar;
