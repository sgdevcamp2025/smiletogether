import { useWorkSpaceQuery } from '@/hooks/WorkSpace/useWorkSpaceQuery';

export const WorkSpaceListPage = () => {
  const { data, isError, isLoading } = useWorkSpaceQuery();

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러 발생</div>;

  return (
    <div>
      {data ? JSON.stringify(data, null, 2) : '데이터가 없습니다.'}ㅇㅇㅇ
    </div>
  );
};
