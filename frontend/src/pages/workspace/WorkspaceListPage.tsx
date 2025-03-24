import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import useUserWorkspacesQuery from '@/hooks/workspace/useUserWorkspacesQuery';
import WorkspaceListItem from '@/components/workspace/WorkspaceListItem';
import { useNavigate } from 'react-router';
import { userOriginStore } from '@/stores/userOriginStore';

const WorkSpaceListPage = () => {
  const navigate = useNavigate();
  const { workspacesInfo, isWorkspacesError, isWorkspacesLoading } =
    useUserWorkspacesQuery();
  const { user } = userOriginStore();

  if (isWorkspacesLoading) return <div>로딩중...</div>;
  if (isWorkspacesError) return <div>에러 발생</div>;

  const navigateToCreateWorkspace = () => {
    navigate(`/workspace/create`);
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col w-full">
      <div className="w-full h-screen max-w-2xl flex flex-col items-center justify-center gap-10">
        <h1 className="text-4xl">smiletogether</h1>
        {workspacesInfo && workspacesInfo?.workspaces.length === 0 && (
          <div className="py-10 text-2xl">
            가입되어 있는 워크스페이스가 없습니다.
          </div>
        )}
        <Button
          className=" w-full bg-yellow-400 text-white rounded hover:bg-yellow-200"
          onClick={navigateToCreateWorkspace}
        >
          워크스페이스 생성
        </Button>
        {workspacesInfo && workspacesInfo?.workspaces.length > 0 && (
          <>
            <span className=" text-gray-400 italic">
              아래에서 워크스페이스를 선택하여 팀과 계속 협업하세요.
            </span>
            <Card className="w-full flex-col overflow-auto">
              <div className="flex items-center px-6 py-4 border  shadow hover:bg-gray-50">
                <h1 className="text-lg font-semibold">{user.username} </h1>
                <div className="text-gray-600">님의 워크스페이스 관리 </div>
              </div>
              {workspacesInfo &&
                workspacesInfo.workspaces.map(item => {
                  return (
                    <WorkspaceListItem
                      key={item.workspaceId}
                      name={item.name}
                      profileImage={item.profileImage}
                      memberCount={item.memberCount}
                      members={item.users}
                      workspaceId={item.workspaceId}
                    />
                  );
                })}
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default WorkSpaceListPage;
