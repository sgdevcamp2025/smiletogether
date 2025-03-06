import WorkspaceIconButton from '@/components/workspace/WorkspaceIconButton';
import { NAVIGATION_ICONS } from '@/constants/navItems';
import useWorkspaceChannelListQuery from '@/hooks/channel/useWorkspaceChannelListQuery';
import { useNavigate, useParams } from 'react-router';

const MainNavigationSidebar = () => {
  const icons = Object.values(NAVIGATION_ICONS);
  const navigate = useNavigate();
  const { workspaceId } = useParams();
  const { channelList } = useWorkspaceChannelListQuery(workspaceId!);

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
                  navigate(
                    `/workspace/${workspaceId}/channel/${channelList[0].channelId}`
                  );
                } else {
                  navigate(`/workspace/${workspaceId}`);
                }
              }
              if (item.type === 'DM') {
                navigate(`/workspace/${workspaceId}/dm/1`);
              }
              if (item.type === 'ETC') console.log('더보기 클릭');
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
