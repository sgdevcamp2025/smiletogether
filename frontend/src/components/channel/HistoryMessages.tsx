import DateBadge from '@/components/common/DateBadge';
import Message from '@/components/common/Message';
import { useChatMessages } from '@/hooks/channel/useChatMessages';
import { Client } from '@stomp/stompjs';
import { useEffect } from 'react';

interface HistoryMessageProps {
  workspaceId: string;
  channelId: string;
  client: Client;
  onDeleteMessage: (messageId: string) => void;
}

const HistoryMessages = ({
  workspaceId,
  channelId,
  client,
  onDeleteMessage,
}: HistoryMessageProps) => {
  const { data, isFetchingNextPage } = useChatMessages(workspaceId, channelId);

  useEffect(() => {
    console.log('데이터:', data?.pages);
  }, [data]);

  return (
    <div>
      {/* 날짜별 메시지 렌더링 */}
      {data?.pages.map((page, pageIndex) =>
        Object.entries(page.groupedMessages).map(([date, messages]) => (
          <div key={`${pageIndex}-${date}`}>
            <DateBadge date={date} /> {/* 날짜 표시 */}
            {messages.map(msg => (
              <Message
                key={msg.messageId}
                client={client}
                messageId={msg.messageId}
                workspaceId={workspaceId}
                channelId={channelId}
                user={msg.user}
                content={msg.content}
                createdAt={msg.createdAt}
                onDeleteMessage={onDeleteMessage}
              />
            ))}
          </div>
        ))
      )}

      {isFetchingNextPage && <p>메시지 불러오는 중...</p>}
    </div>
  );
};

export default HistoryMessages;
