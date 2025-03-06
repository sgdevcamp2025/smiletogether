import { useEffect, useRef } from 'react';
import { useChatMessages } from '@/hooks/channel/useChatMessages';
import { Client } from '@stomp/stompjs';
import DateBadge from '@/components/common/DateBadge';
import Message from '@/components/common/Message';

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
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useChatMessages(workspaceId, channelId);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const prevScrollHeight = scrollContainerRef.current.scrollHeight;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage().then(() => {
            setTimeout(() => {
              if (scrollContainerRef.current) {
                const newScrollHeight = scrollContainerRef.current.scrollHeight;
                scrollContainerRef.current.scrollTop +=
                  newScrollHeight - prevScrollHeight;
              }
            }, 100);
          });
        }
      },
      { threshold: 0.5 }
    );

    if (topRef.current) observer.observe(topRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  return (
    <div ref={scrollContainerRef} className="overflow-auto]">
      {/* 맨 위에 보이지 않는 ref 배치 */}
      <div ref={topRef} className="h-4" />

      {data?.pages
        .slice()
        .reverse()
        .map((page, pageIndex) =>
          Object.entries(page.groupedMessages)
            .sort(([a], [b]) => (a < b ? -1 : 1))
            .map(([date, messages]) => (
              <div key={`${pageIndex}-${date}`}>
                <DateBadge date={date} />
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
