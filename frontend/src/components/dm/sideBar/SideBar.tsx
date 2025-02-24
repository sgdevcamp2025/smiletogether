import { useParams } from 'react-router';
import DMList from './DMList';
import SideBarHeader from './SideBarHeader';
import useGetDMListQuery from '@/hooks/dm/useGetDMListQuery';

//여기는 나중에 API 연결하면 바뀔 부분!
const DM_DATA = [
  {
    participants: {
      userId: '1',
      username: '안연아',
      displayName: '안연아(웹FE)',
      profileImage: 'https://github.com/shadcn.png',
      isActive: true,
    },
    senderId: '1',
    content: '안녕하세요! 채팅 테스트입니다.',
    createdAt: '2025-01-25T12:34:56Z',
    unreadCount: 0,
  },
  {
    participants: {
      userId: '1',
      username: '안연아',
      displayName: '안연아(웹FE)',
      profileImage: 'https://github.com/shadcn.png',
      isActive: true,
    },
    senderId: '3',
    content: '안녕하세요! 채팅 테스트입니다.',
    createdAt: '2025-01-25T12:34:56Z',
    unreadCount: 2,
  },
];

const SideBar = () => {
  const { workspaceId } = useParams();
  const { data, isLoading, isError } = useGetDMListQuery(workspaceId!);

  if (isLoading) return <p>로딩중입니다.</p>;
  if (isError) return <p>로딩중입니다.</p>;

  return (
    <div className="flex flex-col h-screen gap-2 bg-amber-200">
      <SideBarHeader />
      <div className="flex flex-col">
        {data?.dms.map((dm, index) => <DMList key={index} {...dm} />)}
      </div>
    </div>
  );
};

export default SideBar;
