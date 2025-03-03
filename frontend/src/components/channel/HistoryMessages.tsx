import DateBadge from '@/components/common/DateBadge';
import Message from '@/components/common/Message';
import { useChatMessages } from '@/hooks/channel/useChatMessages';
import { MessageType } from '@/types/chat';
import React, { useEffect, useRef } from 'react';

interface HistoryMessageProps {
  workspaceId: string;
  channelId: string;
  scrollRef: React.RefObject<HTMLDivElement>;
}

const HistoryMessages = ({
  workspaceId,
  channelId,
  scrollRef,
}: HistoryMessageProps) => {
  const prevScrollHeight = useRef(0);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useChatMessages(workspaceId, channelId);

  const handleScroll = () => {
    if (!scrollRef.current || isFetchingNextPage) return;
    if (scrollRef.current.scrollTop === 0 && hasNextPage) {
      prevScrollHeight.current = scrollRef.current.scrollHeight;
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (!scrollRef.current) return;
    const element = scrollRef.current;
    element.addEventListener('scroll', handleScroll);
    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, [isFetchingNextPage, hasNextPage]);

  useEffect(() => {
    if (!scrollRef.current) return;
    const element = scrollRef.current;

    if (data?.pages.length === 1) {
      // 첫 렌더링 시, 맨 아래로 스크롤
      setTimeout(() => {
        element.scrollTop = element.scrollHeight;
      }, 0);
    } else {
      // 새 데이터 로드 후, 기존 스크롤 위치 유지
      setTimeout(() => {
        element.scrollTop = element.scrollHeight - prevScrollHeight.current;
      }, 0);
    }
  }, [data]);

  const messagesByDate: Record<string, MessageType[]> =
    data?.pages.reduce(
      (acc, page) => {
        page.messages.forEach(message => {
          const date = message.createdAt.split('T')[0];
          if (!acc[date]) acc[date] = [];
          acc[date].push(message);
        });
        return acc;
      },
      {} as Record<string, MessageType[]>
    ) || {};

  return (
    <div ref={scrollRef} style={{ overflowY: 'auto', maxHeight: '500px' }}>
      {Object.entries(messagesByDate)
        .reverse() // 날짜순 정렬 (최신 날짜가 아래로 가도록)
        .map(([date, messages]) => (
          <div key={date}>
            <DateBadge date={date} />
            {messages
              .slice()
              .reverse() // 개별 날짜의 메시지들도 최신 것이 아래로 가도록 정렬
              .map(msg => (
                <Message
                  key={msg.messageId}
                  user={msg.user}
                  content={msg.content}
                  createdAt={msg.createdAt}
                />
              ))}
          </div>
        ))}
      {isFetchingNextPage && <p>메시지 불러오는 중...</p>}
    </div>
  );
};

export default HistoryMessages;
