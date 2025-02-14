import WorkspaceIconButton from '@/components/workspace/WorkspaceIconButton';
import { NAVIGATION_ICONS } from '@/constants/navItems';
import { SidebarType, useWorkspaceSidebarStore } from '@/stores/workspace';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

const MainNavigationSidebar = () => {
  const icons = Object.values(NAVIGATION_ICONS);
  const { setActiveSidebar } = useWorkspaceSidebarStore();
  const navigate = useNavigate();
  const { workspaceID } = useParams();

  useEffect(() => {
    console.log('navigate', navigate);
  }, [navigate]);

  return (
    <div className=" min-w-16 bg-yellow-200 text-white flex py-3 flex-col items-center border-r-2">
      {icons.map((item, index) => {
        return (
          <WorkspaceIconButton
            key={index}
            className="bg-transparent"
            onClick={() => {
              if (item.type === 'Home') {
                console.log('home');
                navigate(`/workspace/${workspaceID}`);
              }
              if (item.type === 'DM') {
                console.log('dm');
                navigate(`/workspace/${workspaceID}/dm`);
              }
              if (item.type === 'ETC') console.log('더보기 클릭');
              else setActiveSidebar(item.type as SidebarType);
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
