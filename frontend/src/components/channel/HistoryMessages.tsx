import DateBadge from '@/components/common/DateBadge';
import Message from '@/components/common/Message';
import { useChatMessages } from '@/hooks/channel/useChatMessages';
import { MessageType } from '@/types/chat';
import { Client } from '@stomp/stompjs';
import React, { useEffect, useRef } from 'react';

interface HistoryMessageProps {
  workspaceId: string;
  channelId: string;
  scrollRef: React.RefObject<HTMLDivElement>;
  client: Client;
  onDeleteMessage: (messageId: string) => void;
}

const HistoryMessages = ({
  workspaceId,
  channelId,
  scrollRef,
  client,
  onDeleteMessage,
}: HistoryMessageProps) => {
  const prevScrollHeight = useRef(0);
  const isFirstRender = useRef(true);

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

    if (isFirstRender.current) {
      // ✅ 첫 렌더링 시, 가장 아래로 스크롤
      setTimeout(() => {
        element.scrollTop = element.scrollHeight;
      }, 0);
      isFirstRender.current = false;
    } else {
      // ✅ 스크롤 점프 방지 (이전 높이 유지)
      const previousHeight = element.scrollHeight;
      setTimeout(() => {
        element.scrollTop =
          element.scrollTop + (element.scrollHeight - previousHeight);
      }, 0);
    }
  }, [data]);

  // ✅ 웹소켓으로 받은 새로운 메시지가 있으면, 맨 아래로 스크롤
  useEffect(() => {
    if (!scrollRef.current) return;
    setTimeout(() => {
      scrollRef.current!.scrollTop = scrollRef.current!.scrollHeight;
    }, 0);
  }, [client]);

  // ✅ 데이터 정렬을 "최신 메시지가 가장 아래"에 오도록 변경
  const sortedMessages =
    data?.pages
      .flatMap(page => page.messages)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      ) || [];

  // ✅ 날짜별로 메시지를 분류 (단, 최신 메시지가 가장 아래로 정렬되도록 보장)
  const messagesByDate: Record<string, MessageType[]> = sortedMessages.reduce(
    (acc, message) => {
      const date = message.createdAt.split('T')[0];
      if (!acc[date]) acc[date] = [];
      acc[date].push(message);
      return acc;
    },
    {} as Record<string, MessageType[]>
  );

  // ✅ 날짜도 정렬 (최신 날짜가 아래쪽에 오도록)
  const sortedDates = Object.keys(messagesByDate).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  return (
    <div
      ref={scrollRef}
      style={{
        overflowY: 'auto',
        maxHeight: '500px',
        display: 'flex',
        flexDirection: 'column-reverse',
      }}
    >
      {sortedDates.reverse().map(
        (
          date // 최신 날짜가 가장 아래로 가도록 reverse()
        ) => (
          <div key={date}>
            <DateBadge date={date} />
            {messagesByDate[date].map(
              (
                msg // 최신 메시지가 아래쪽으로 쌓이도록 map() 순서 유지
              ) => (
                <Message
                  client={client}
                  messageId={msg.messageId}
                  workspaceId={workspaceId}
                  channelId={channelId}
                  key={msg.messageId}
                  user={msg.user}
                  content={msg.content}
                  createdAt={msg.createdAt}
                  onDeleteMessage={onDeleteMessage}
                />
              )
            )}
          </div>
        )
      )}
      {isFetchingNextPage && <p>메시지 불러오는 중...</p>}
    </div>
  );
};

export default HistoryMessages;
