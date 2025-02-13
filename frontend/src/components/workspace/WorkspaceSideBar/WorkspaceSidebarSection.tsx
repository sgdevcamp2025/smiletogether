import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { FaHashtag } from 'react-icons/fa';
import { FiLock } from 'react-icons/fi';

interface ChannelItem {
  channelId: string;
  name: string;
  isPrivate: boolean;
}

interface WorkspaceSidebarSectionProps {
  sectionTitle: string;
  listItems: ChannelItem[];
}

const WorkspaceChannelList = ({
  sectionTitle,
  listItems,
}: WorkspaceSidebarSectionProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="px-4 text-white">
          {sectionTitle}
        </AccordionTrigger>
        {listItems?.map((channel, index) => {
          return (
            <AccordionContent>
              <Button
                key={index}
                className=" w-full bg-transparent shadow-none hover:bg-gray-50 flex justify-start"
              >
                {channel.isPrivate ? <FaHashtag /> : <FiLock />}
                {channel.name}
              </Button>{' '}
            </AccordionContent>
          );
        })}
      </AccordionItem>
    </Accordion>
  );
};

export default WorkspaceChannelList;
