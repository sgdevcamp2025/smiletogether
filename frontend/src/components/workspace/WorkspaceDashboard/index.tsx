import { useEffect } from 'react';
import { useParams } from 'react-router';

const WorkspaceDashboard = () => {
  const params = useParams();
  useEffect(() => {
    console.log(params);
  }, []);
  return <div></div>;
};

export default WorkspaceDashboard;
