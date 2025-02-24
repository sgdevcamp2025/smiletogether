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
    <div className=" min-w-16 bg-yellow-200 text-white flex py-3 flex-col items-center border-r-2">
      {icons.map((item, index) => {
        return (
          <WorkspaceIconButton
            key={index}
            className="bg-transparent"
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
                navigate(`/workspace/${workspaceId}/dm`);
              }
              if (item.type === 'ETC') console.log('더보기 클릭');
            }}
          >
            {item.icon}
            <span>{item.label}</span>
          </WorkspaceIconButton>
        );
      })}
    </div>
  );
};

export default MainNavigationSidebar;
