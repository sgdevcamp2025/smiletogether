import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import useUserWorkspacesQuery from '@/hooks/workspace/useUserWorkspacesQuery';
import WorkspaceListItem from '@/components/workspace/WorkspaceListItem';
import { useNavigate } from 'react-router';

const WorkSpaceListPage = () => {
  const navigate = useNavigate();
  const { data, isError, isLoading } = useUserWorkspacesQuery();

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러 발생</div>;

  const navigateToCreateWorkspace = () => {
    navigate(`/workspace/create`);
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <Button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={navigateToCreateWorkspace}
      >
        워크스페이스 생성
      </Button>
      <blockquote className="my-10 text-gray-400 italic">
        아래에서 워크스페이스를 선택하여 팀과 계속 협업하세요.
      </blockquote>
      <Card className="w-full max-w-lg mt-5">
        <div className="flex items-center px-6 py-4 w-full max-w-lg border  shadow hover:bg-gray-50">
          <h1 className="text-lg font-semibold">{data && data.email}</h1>
          <div className="text-gray-600">님의 워크스페이스 관리 </div>
        </div>
        {data &&
          data.workspaces.map(item => {
            return (
              <WorkspaceListItem
                key={item.workspace_id}
                name={item.name}
                profileImage={item.profile_image}
                memberCount={item.member_count}
                members={item.workspace_members}
                workspaceId={item.workspace_id}
              />
            );
          })}
      </Card>
    </div>
  );
};

export default WorkSpaceListPage;
