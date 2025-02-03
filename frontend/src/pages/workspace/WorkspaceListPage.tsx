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
      <Button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        워크스페이스 생성
      </Button>
      <blockquote className="mt-4 text-gray-400 italic">
        "After all," he said, "everyone enjoys a good joke, so it's only fair
        that they should pay for the privilege."
      </blockquote>
      <Card className="w-full max-w-lg mt-6 px-6 py-4">
        <div className="text-center ">
          <h1 className="text-lg font-semibold">user</h1>
          <div className="text-gray-600">님의 워크스페이스 관리 </div>
        </div>
        {data &&
          data.map(item => {
            return (
              <WorkSpaceListItem
                key={item.workspace_id}
                name={item.name}
                profileImage={item.profile_image}
                memberCount={item.member_count}
                members={item.workspace_members}
              />
            );
          })}
      </Card>
    </div>
  );
};
