import WorkspaceIconButton from '@/components/workspace/WorkspaceIconButton';
import { NAVIGATION_ICONS } from '@/constants/navItems';
import { SidebarType, useWorkspaceSidebarStore } from '@/stores/workspace';

const MainNavigationSidebar = () => {
  const icons = Object.values(NAVIGATION_ICONS);
  const { setActiveSidebar } = useWorkspaceSidebarStore();

  return (
    <div className=" min-w-16 bg-yellow-200 text-white flex py-3 flex-col items-center border-r-2">
      {icons.map((item, index) => {
        return (
          <WorkspaceIconButton
            key={index}
            className="bg-transparent"
            onClick={() => {
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
