import ChannelInfo from '@/components/channel/ChannelInfo';
import ChatHeader from '@/components/common/ChatHeader';
import { useGetChannel } from '@/hooks/channel/useGetChannel';
import { useParams } from 'react-router';
import MessageBox from '@/components/common/MessageBox';
import { useWebSocket } from '@/hooks/channel/useWebSocket';
import { useEffect, useRef } from 'react';
import HistoryMessages from '../../components/channel/HistoryMessages';
import Message from '@/components/common/Message';

const ChannelPage = () => {
  const { workspaceId, channelId } = useParams();
  const { channelData, isChannelLoading, isChannelError } =
    useGetChannel(channelId);
  const { client, messages } = useWebSocket({
    workspaceId,
    channelId,
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  if (isChannelLoading) return <p>로딩중입니다.</p>;
  if (isChannelError) return <p>에러입니다.</p>;

  return (
    <div className="w-full">
      {channelData && (
        <>
          <ChatHeader
            name={channelData.name}
            isPrivate={channelData.isPrivate}
            totalMembers={channelData.totalMembers}
            members={channelData.members}
            manager={channelData.createdBy.username}
          />
        </>
      )}

      <div ref={scrollRef} className="h-[400px] overflow-auto scrollbar-hide">
        {channelData && (
          <ChannelInfo
            userId={channelData.createdBy.userId}
            channelName={channelData.name}
            displayName={channelData.createdBy.displayName}
            username={channelData.createdBy.username}
            createdAt={channelData.createdAt}
            isPrivate={channelData.isPrivate}
          />
        )}

        {workspaceId && channelId && (
          <HistoryMessages
            workspaceId={workspaceId}
            channelId={channelId}
            scrollRef={scrollRef}
          />
        )}

        {/* 웹 소켓에서 전송받은 메시지 */}
        {messages.map((msg, index) => (
          <Message
            key={index} // 이 부분은 나중에 백 구조가 바뀌면 messageId를 넣을 예정입니다!
            user={msg.user}
            content={msg.content}
            createdAt={msg.createdAt}
          />
        ))}
      </div>

      {channelData && client && (
        <MessageBox
          channelName={channelData.name}
          workspaceId={workspaceId!}
          channelId={channelId!}
          client={client}
        />
      )}
    </div>
  );
};

export default ChannelPage;
