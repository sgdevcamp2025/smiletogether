import { Button } from '@/components/ui/button';
import { useWorkSpaceQuery } from '@/hooks/WorkSpace/useWorkSpaceQuery';
import { Card } from '@/components/ui/card';
import { WorkSpaceListItem } from '@/components/workspace/WorkSpaceListItem';

export const WorkSpaceListPage = () => {
  const { data, isError, isLoading } = useWorkSpaceQuery();

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러 발생</div>;

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <Button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ">
        워크스페이스 생성
      </Button>
      <blockquote className="my-10 text-gray-400 italic">
        아래에서 워크스페이스를 선택하여 팀과 계속 협업하세요.
      </blockquote>
      {data &&
        data.emails.map(item => {
          return (
            <Card className="w-full max-w-lg mt-5">
              <div className="flex items-center px-6 py-4 w-full max-w-lg border  shadow hover:bg-gray-50">
                <h1 className="text-lg font-semibold">{item.email}</h1>
                <div className="text-gray-600">님의 워크스페이스 관리 </div>
              </div>
              {item.workspaces.map(item => {
                return (
                  <WorkSpaceListItem
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
          );
        })}
    </div>
  );
};
