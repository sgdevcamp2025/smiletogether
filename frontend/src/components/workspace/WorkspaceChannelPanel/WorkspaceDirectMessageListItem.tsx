import { Button } from '@/components/ui/button';
import { DMItem } from '@/types/dm';
import { useNavigate, useParams } from 'react-router';

interface WorkspaceDirectMessageListItemProps {
  dm: DMItem;
}

const WorkspaceDirectMessageListItem = ({
  dm,
}: WorkspaceDirectMessageListItemProps) => {
  const navigate = useNavigate();
  const { workspaceId } = useParams();
  return (
    <Button
      className="flex items-center justify-start w-full text-xs bg-transparent rounded-lg shadow-none hover:bg-transparent"
      onClick={() => {
        navigate(`/workspace/${workspaceId}/dm/${dm.dmId}`);
      }}
    >
      <div className="relative flex-shrink-0 w-6 h-6 ">
        <img
          src={dm.participants[0]?.profileImage}
          className="w-5 h-5 rounded-full"
        />
        {dm.participants.length > 1 ? (
          <span className="absolute flex items-center justify-center w-6 h-6 text-xs text-white rounded-full -bottom-1 -right-1">
            {dm.participants.length}
          </span>
        ) : (
          <div className="absolute flex items-center justify-center w-3 h-3 text-xs text-white bg-green-400 rounded-full -bottom-1 -right-0"></div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <span className="block overflow-hidden truncate text-start whitespace-nowrap text-ellipsis">
          {dm.participants.map(participant => participant.username).join(', ')}
        </span>
      </div>

      {dm.unreadCount > 0 && (
        <div className="flex items-center justify-center w-6 h-6 text-white bg-purple-300 rounded-full">
          {dm.unreadCount}
        </div>
      )}
    </Button>
  );
};

export default WorkspaceDirectMessageListItem;
