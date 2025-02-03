import { useWorkSpaceQuery } from '@/hooks/workspace/useWorkSpaceQuery';

export const WorkSpaceListPage = () => {
  const { data, isError, isLoading } = useWorkSpaceQuery();

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러 발생</div>;

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      {data ? JSON.stringify(data) : '데이터가 없습니다.'}
    </div>
  );
};
