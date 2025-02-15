import { Button } from '@/components/ui/button';
import { FaHashtag } from 'react-icons/fa';
import { FiLock } from 'react-icons/fi';

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
  return (
    <Button className="w-full bg-transparent shadow-none hover:bg-gray-50 flex justify-start text-xs  py-0">
      {channel.isPrivate ? <FaHashtag /> : <FiLock />}
      {channel.name}
    </Button>
  );
};

export default WorkspaceChannelListItem;
