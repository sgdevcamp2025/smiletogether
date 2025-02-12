import useWorkspaceChannelListQuery from '@/hooks/channel/useWorkspaceChannelListQuery';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router';

const WorkspaceChannelSidebar = () => {
  const { params } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    console.log('params', params, 'pathname', pathname);
  }, [pathname]);
  // durl
  return <div>WorkspaceChannelSidebar{params}</div>;
};

export default WorkspaceChannelSidebar;
