import ChannelInfo from '@/components/channel/ChannelInfo';
import ChatHeader from '@/components/common/ChatHeader';
import DateBadge from '@/components/common/DateBadge';
import Message from '@/components/common/Message';
import { useGetChannel } from '@/hooks/channel/useGetChaneel';
import { useGetMessages } from '@/hooks/channel/useGetMessage';
import { useParams } from 'react-router';
import MessageBox from '@/components/common/MessageBox';
import { useWebSocket } from '@/hooks/channel/useWebSocket';
import { useEffect, useRef } from 'react';

const ChannelPage = () => {
  const { workspaceID, channelID } = useParams();
  const { channelData, isChannelLoading, isChannelError } =
    useGetChannel(channelID);
  const { messageData, isMessageLoading, isMessageError } =
    useGetMessages(channelID);
  const { client, messages } = useWebSocket({
    workspaceID,
    channelID,
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, messageData]);

  if (isMessageLoading || isChannelLoading) return <p>로딩중입니다.</p>;
  if (isMessageError || isChannelError) return <p>에러입니다.</p>;

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

        {/* 이전 메시지 */}
        {messageData?.messages ? (
          Object.entries(messageData.messages).map(([date, messages]) => (
            <div key={date}>
              <DateBadge date={date} />
              {messages.map(msg => (
                <Message
                  key={msg.messageId}
                  user={msg.user}
                  content={msg.content}
                  createdAt={msg.createdAt}
                />
              ))}
            </div>
          ))
        ) : (
          <p>메시지 없음</p>
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
          workspaceId={workspaceID!}
          channelId={channelID!}
          client={client}
        />
      )}
    </div>
  );
};

export default ChannelPage;
