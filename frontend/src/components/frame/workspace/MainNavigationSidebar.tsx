import WorkspaceIconButton from '@/components/workspace/WorkspaceIconButton';
import { NAVIGATION_ICONS } from '@/constants/navItems';
import useWorkspaceChannelListQuery from '@/hooks/channel/useWorkspaceChannelListQuery';
import useIsDmSideBarStore from '@/stores/isDm';
import { useNavigate, useParams } from 'react-router';

const MainNavigationSidebar = () => {
  const icons = Object.values(NAVIGATION_ICONS);
  const navigate = useNavigate();
  const { workspaceId } = useParams();
  const { channelList } = useWorkspaceChannelListQuery(workspaceId!);
  const { setIsDmSideBar } = useIsDmSideBarStore();
  return (
    <div className="flex flex-col items-center py-3 text-white bg-yellow-300 border-r-2  min-w-16">
      {icons.map((item, index) => {
        return (
          <WorkspaceIconButton
            key={index}
            className="bg-transparent text-sm"
            onClick={() => {
              if (item.type === 'Home') {
                if (channelList && channelList.length > 0) {
                  setIsDmSideBar(false);
                  navigate(
                    `/workspace/${workspaceId}/channel/${channelList[0].channelId}`
                  );
                }
              }
              if (item.type === 'DM') {
                setIsDmSideBar(true);
                navigate(`/workspace/${workspaceId}/dm/1`);
              }
              if (item.type === 'ETC') alert('더보기는 아직 준비중입니다!');
            }}
          >
            <p>{item.icon}</p>
            <span>{item.label}</span>
          </WorkspaceIconButton>
        );
      })}
    </div>
  );
};

export default MainNavigationSidebar;
