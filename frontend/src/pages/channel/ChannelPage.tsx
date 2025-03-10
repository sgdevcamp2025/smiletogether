import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import ChatHeader from '@/components/common/ChatHeader';
import { useGetChannel } from '@/hooks/channel/useGetChannel';
import ChannelInfo from '@/components/channel/ChannelInfo';
import HistoryMessages from '@/components/channel/HistoryMessages';
import MessageBox from '@/components/common/MessageBox';
import { useWebSocket } from '@/hooks/channel/useWebSocket';
import Message from '@/components/common/Message';
import { useDeleteMessage } from '@/hooks/channel/useDeleteMessage';

const ChannelPage = () => {
  const { workspaceId, channelId } = useParams();
  useEffect(() => {
    console.log(workspaceId, channelId);
  }, []);
  const { channelData, isChannelLoading, isChannelError } =
    useGetChannel(channelId);
  console.log(channelData?.channelName, channelData, channelData?.createdBy);
  const { client, messages: initailMessages } = useWebSocket({
    workspaceId,
    channelId,
  });

  const [messages, setMessages] = useState(initailMessages);

  const { deleteMessage } = useDeleteMessage({
    workspaceId: workspaceId ?? '',
    channelId: channelId ?? '',
    client: client!,
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ✅ 새로운 메시지가 올 때 맨 아래로 스크롤
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
    }
  };

  // 초기 메시지 설정
  useEffect(() => {
    setMessages(initailMessages);
  }, [initailMessages]);

  // 메시지가 변경될 때마다 항상 스크롤 하단으로 이동
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 컴포넌트 마운트 시 스크롤 하단으로 이동
  useEffect(() => {
    // 초기 로딩 시 스크롤 하단으로
    scrollToBottom();

    // 채널 데이터가 로드된 후에도 스크롤 하단으로
    if (channelData) {
      setTimeout(scrollToBottom, 300);
    }
  }, [channelData]);

  const handleDeleteMessage = (messageId: string) => {
    deleteMessage(messageId, () => {
      setMessages(prevMessages =>
        prevMessages.filter(msg => msg.messageId !== messageId)
      );
    });
  };

  if (isChannelLoading) return <p>로딩중입니다.</p>;
  if (isChannelError) return <p>에러입니다.</p>;

  return (
    <div className="w-full h-full">
      {channelData && channelData.createdBy && (
        <>
          <ChatHeader
            name={channelData?.channelName}
            isPrivate={channelData?.isPrivate}
            totalMembers={channelData?.totalMembers}
            members={channelData?.members}
            manager={channelData.createdBy.username}
          />
        </>
      )}
      <div
        ref={scrollRef}
        className="flex-col h-[calc(100vh-293px)] overflow-auto scrollbar-hide flex"
      >
        {channelData && channelData.createdBy && (
          <ChannelInfo
            userId={channelData.createdBy.userId}
            channelName={channelData.channelName}
            displayName={channelData.createdBy.displayName}
            username={channelData.createdBy.username}
            createdAt={channelData.createdAt}
            isPrivate={channelData.isPrivate}
          />
        )}

        {workspaceId && channelId && (
          <HistoryMessages
            client={client!}
            workspaceId={workspaceId}
            channelId={channelId}
            onDeleteMessage={handleDeleteMessage}
          />
        )}

        <div className="flex-grow"></div>

        {messages &&
          messages.map(msg => (
            <Message
              messageId={msg.messageId}
              client={client!}
              key={msg.messageId}
              user={msg.user}
              content={msg.content}
              createdAt={msg.createdAt}
              workspaceId={workspaceId!}
              channelId={channelId!}
              onDeleteMessage={handleDeleteMessage}
            />
          ))}

        <div ref={messagesEndRef} />
      </div>

      {channelData && client && (
        <MessageBox
          channelName={channelData.channelName}
          workspaceId={workspaceId!}
          channelId={channelId!}
          client={client}
        />
      )}
    </div>
  );
};

export default ChannelPage;
