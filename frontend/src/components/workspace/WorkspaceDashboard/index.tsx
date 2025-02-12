import { useEffect } from 'react';
import { useParams } from 'react-router';
import currentFrameState from '@/stores/currentFrameState';

const WorkspaceDashboard = () => {
  const { setCurrentPage } = currentFrameState();
  const params = useParams();

  useEffect(() => {
    setCurrentPage('workspace');
    console.log('params', params);
  }, []);
  // durl
  return <div>WorkspaceDashboard</div>;
};

export default WorkspaceDashboard;
