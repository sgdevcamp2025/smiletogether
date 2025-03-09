import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { FaHashtag } from 'react-icons/fa';
import { FiLock } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router';

interface ChannelItem {
  channelId: string;
  name: string;
  isPrivate: boolean;
}

interface WorkspaceChannelListItemProps {
  channel: ChannelItem;
}

const WorkspaceChannelListItem = ({
  channel,
}: WorkspaceChannelListItemProps) => {
  const { workspaceId } = useParams();
  const navigate = useNavigate();

  return (
    <Button
      className="w-full bg-transparent shadow-none hover:bg-gray-50 flex justify-start text-sm  py-0"
      onClick={() => {
        navigate(`/workspace/${workspaceId}/channel/${channel.channelId}`);
      }}
    >
      {channel.isPrivate ? <FaHashtag /> : <FiLock />}
      {channel.name}
    </Button>
  );
};

export default WorkspaceChannelListItem;
