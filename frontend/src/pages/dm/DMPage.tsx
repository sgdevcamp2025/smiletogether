import Message from '@/components/common/Message';
import SplitPaneLayout from '@/components/common/SplitPaneLayout';
import DMInfo from '@/components/dm/DMInfo';
import SideBar from '@/components/dm/sideBar';

const DMPage = () => {
  return (
    <div className="flex w-full h-screen overflow-hidden">
      <SplitPaneLayout
        leftPannelDefaultSize={30}
        rightPannelDefaultSize={70}
        children1={<SideBar />}
        children2={
          <div className="w-full">
            <DMInfo
              username="안연아"
              profileImage="https://github.com/shadcn.png"
              displayName="안연아(웹FE)"
              userId="3"
              isActive={true}
              position="인재 영업팀"
            />
            <Message
              user={{
                userId: '1',
                username: '안연아',
                displayName: '안연아(웹FE)',
                profileImage: 'https://github.com/shadcn.png',
                isActive: true,
              }}
              content="안녕하세요! 채팅 테스트입니다."
              createdAt="2025-01-25T12:34:56Z"
            />
          </div>
        }
      />
    </div>
  );
};

export default DMPage;
