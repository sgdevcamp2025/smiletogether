import { useParams } from 'react-router';
import DMList from './DMList';
import SideBarHeader from './SideBarHeader';
import useGetDMListQuery from '@/hooks/dm/useGetDMListQuery';

const SideBar = () => {
  const { workspaceId } = useParams();
  const { data, isLoading, isError } = useGetDMListQuery(workspaceId!);

  if (isLoading) return <p>로딩중입니다.</p>;
  if (isError) return <p>로딩중입니다.</p>;

  return (
    <div className="flex flex-col h-screen gap-2 bg-yellow-300">
      <SideBarHeader />
      <div className="flex flex-col">
        {data?.dms.map((dm, index) => (
          <DMList key={index} {...dm} />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
