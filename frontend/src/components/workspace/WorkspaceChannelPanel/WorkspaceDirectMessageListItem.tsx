import { Button } from '@/components/ui/button';

interface DMParticipant {
  userId: string;
  username: string;
  profileImage: string;
}

interface LastMessage {
  senderId: string;
  content: string;
  createdAt: string;
}

interface DirectMessage {
  dmId: string;
  participants: DMParticipant[];
  lastMessage: LastMessage;
  unreadCount: number;
}

interface WorkspaceDirectMessageListItemProps {
  dm: DirectMessage;
}

const WorkspaceDirectMessageListItem = ({
  dm,
}: WorkspaceDirectMessageListItemProps) => {
  return (
    <Button className="w-full shadow-none flex items-center justify-start text-xs rounded-lg bg-transparent hover:bg-transparent">
      <div className="relative w-6 h-6 flex-shrink-0 ">
        <img
          src={dm.participants[0]?.profileImage}
          className="w-5 h-5 rounded-full"
        />
        {dm.participants.length > 1 ? (
          <span className="absolute -bottom-1 -right-1 w-6 h-6 flex items-center justify-center text-xs text-white rounded-full">
            {dm.participants.length}
          </span>
        ) : (
          <div className="absolute -bottom-1 -right-0 w-3 h-3 flex items-center justify-center text-xs bg-green-400 text-white rounded-full"></div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <span className="text-start block overflow-hidden whitespace-nowrap text-ellipsis truncate">
          {dm.participants.map(participant => participant.username).join(', ')}
        </span>
      </div>

      {dm.unreadCount > 0 && (
        <div className="w-6 h-6 bg-purple-300 text-white flex items-center justify-center rounded-full">
          {dm.unreadCount}
        </div>
      )}
    </Button>
  );
};

export default WorkspaceDirectMessageListItem;
