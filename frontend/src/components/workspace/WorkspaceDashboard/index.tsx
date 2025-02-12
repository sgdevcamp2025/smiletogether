import { useEffect } from 'react';
import { useParams } from 'react-router';
import currentFrameState from '@/stores/currentFrameState';

const WorkspaceDashboard = () => {
  const { setCurrentPage } = currentFrameState();

  useEffect(() => {
    setCurrentPage('workspace');
  }, []);

  return <div>WorkspaceDashboard</div>;
};

export default WorkspaceDashboard;
