import WorkspaceIconButton from '@/components/workspace/WorkspaceIconButton';
import useUserWorkspacesQuery from '@/hooks/workspace/useUserWorkspacesQuery';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const WorkspaceSideBar = () => {
  const { data, isLoading, isError } = useUserWorkspacesQuery();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('WorkspaceSideBar', data);
  }, [data]);

  if (isLoading) return <p>로딩중</p>;
  if (isError) return <p>에러</p>;

  const navigateToWorkspace = (workspaceId: string) => {
    navigate(`/workspace/${workspaceId}`);
  };

  return (
    <div className=" min-w-16 bg-yellow-400 text-white flex py-2 flex-col items-center gap-2">
      <div className="flex flex-col items-center justify-center">
        {data &&
          data.workspaces.map((item, index) => {
            return (
              <WorkspaceIconButton
                className="bg-gray-400 rounded-xl"
                onClick={() => navigateToWorkspace(item.workspace_id)}
              >
                {item.name ? item.name.slice(0, 2) : 'W'}
              </WorkspaceIconButton>
            );
          })}
        <WorkspaceIconButton className="bg-transparent">+</WorkspaceIconButton>
      </div>
    </div>
  );
};

export default WorkspaceSideBar;
