import WorkspaceIconButton from '@/components/workspace/WorkspaceIconButton';
import { NAVIGATION_ICONS } from '@/constants/navItems';

const MainNavigationSidebar = () => {
  const icons = Object.values(NAVIGATION_ICONS);
  return (
    <div className=" min-w-16 bg-yellow-200 text-white flex py-3 flex-col items-center border-r-2">
      {icons.map(item => {
        return (
          <WorkspaceIconButton className="bg-transparent">
            {item.icon}
            <span>{item.label}</span>
          </WorkspaceIconButton>
        );
      })}
    </div>
  );
};

export default MainNavigationSidebar;
