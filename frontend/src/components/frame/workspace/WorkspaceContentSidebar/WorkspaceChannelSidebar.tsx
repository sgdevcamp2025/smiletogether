import { useEffect } from 'react';
import { useParams } from 'react-router';
import useUserWorkspaceQuery from '@/hooks/workspace/useUserWorkspaceQuery';
import useWorkspaceChannelListQuery from '@/hooks/channel/useWorkspaceChannelListQuery';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const WorkspaceChannelSidebar = () => {
  const { workspaceID } = useParams();
  const {
    data: workspacesInfo,
    isLoading: isWorkspaceLoading,
    isError: isWorkspaceError,
  } = useUserWorkspaceQuery(workspaceID!);

  const {
    data: channelList,
    isLoading: isChannelLoading,
    isError: isChannelError,
  } = useWorkspaceChannelListQuery(workspaceID!);
  useEffect(() => {
    console.log('params', workspaceID, 'workspacesInfo', workspacesInfo);
  }, []);

  if (isChannelLoading || isWorkspaceLoading) return <p>로딩 중입니다!</p>;
  if (isChannelError || isWorkspaceError) return <p>에러가 발생했습니다!</p>;

  return (
    <div className="text-wrap">
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight text-black">
        {workspacesInfo?.name}
      </h3>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>채널</AccordionTrigger>
          {channelList?.map((channel, index) => {
            return (
              <AccordionContent>
                <Button
                  key={index}
                  className="bg-transparent shadow-none text-black hover:bg-gray-50"
                >
                  {channel.isPrivate}
                  {channel.name}
                </Button>{' '}
              </AccordionContent>
            );
          })}
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default WorkspaceChannelSidebar;
