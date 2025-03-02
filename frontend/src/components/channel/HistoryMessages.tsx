import { getChatMessages } from '@/apis/channel';
import DateBadge from '@/components/common/DateBadge';
import Message from '@/components/common/Message';
import { MessageType } from '@/types/chat';
import React, { useEffect, useRef, useState } from 'react';

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
  const [messageData, setMessageData] = useState<{
    messages: Record<string, MessageType[]>;
  }>({
    messages: {},
  });
  const [lastTimeStamp, setLastTimeStamp] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const prevScrollHeight = useRef(0);

  // 스크롤 최상단 감지 → 이전 메시지 불러오기
  const handleScroll = () => {
    if (!scrollRef.current || isFetching) return;

    if (scrollRef.current.scrollTop === 0) {
      prevScrollHeight.current = scrollRef.current.scrollHeight;
      fetchMessages();
    }
  };

  // 이전 메시지 불러오기
  const fetchMessages = async () => {
    if (!workspaceId || !channelId || isFetching) return;
    setIsFetching(true);

    const timeStampToUse =
      lastTimeStamp ?? new Date().toISOString().replace('Z', '');

    const response = await getChatMessages(
      workspaceId,
      channelId,
      timeStampToUse
    );

    if (response) {
      setMessageData(prevData => ({
        messages: { ...response.groupedMessages, ...prevData.messages },
      }));

      const firstDate = Object.keys(response.groupedMessages || {})[0];
      if (firstDate && response.groupedMessages[firstDate]?.length > 0) {
        setLastTimeStamp(response.groupedMessages[firstDate].at(-1)?.createdAt);
      }
    }
    setIsFetching(false);

    // 스크롤 위치 유지 (새 메시지가 추가되었을 때 화면 튕김 방지)
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop =
          scrollRef.current.scrollHeight - prevScrollHeight.current;
      }
    }, 100);
  };

  useEffect(() => {
    fetchMessages();
  }, [workspaceId, channelId]);

  useEffect(() => {
    if (!scrollRef.current) return;

    const element = scrollRef.current;
    element.addEventListener('scroll', handleScroll);

    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, [isFetching]);

  return (
    <>
      {Object.entries(messageData.messages).map(
        ([date, messages], index, arr) => {
          const showDateBadge = index === 0 || date !== arr[index - 1][0];

          return (
            <div key={date}>
              {showDateBadge && <DateBadge date={date} />}
              {messages.map(msg => (
                <Message
                  key={msg.messageId}
                  user={msg.user}
                  content={msg.content}
                  createdAt={msg.createdAt}
                />
              ))}
            </div>
          );
        }
      )}
      {isFetching && <p>메시지 불러오는 중...</p>}
    </>
  );
};

export default HistoryMessages;
