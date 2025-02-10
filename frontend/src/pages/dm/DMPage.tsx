import DMInfo from '@/components/dm/DMInfo';
import SideBar from '@/components/dm/sideBar';

const DMPage = () => {
  return (
    <div className="flex">
      <SideBar />
      <DMInfo
        username="안연아"
        profileImage="https://github.com/shadcn.png"
        displayName="안연아(웹FE)"
        userId="3"
        isActive={true}
        position="인재 영업팀"
      />
    </div>
  );
};

export default DMPage;
