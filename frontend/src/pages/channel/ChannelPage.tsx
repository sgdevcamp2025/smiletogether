import { useEffect, useRef, useState, useMemo } from 'react';
import { useParams } from 'react-router';
import ChatHeader from '@/components/common/ChatHeader';
import { useGetChannel } from '@/hooks/channel/useGetChannel';
import ChannelInfo from '@/components/channel/ChannelInfo';
import MessageBox from '@/components/common/MessageBox';
import { useWebSocket } from '@/hooks/channel/useWebSocket';
import Message from '@/components/common/Message';
import { useDeleteMessage } from '@/hooks/channel/useDeleteMessage';
import { useChatMessages } from '@/hooks/channel/useChatMessages';
import DateBadge from '@/components/common/DateBadge';
import { MessageType } from '@/types/chat';

const ChannelPage = () => {
  const { workspaceId, channelId } = useParams();
  const { channelData, isChannelLoading, isChannelError } =
    useGetChannel(channelId);
  const { client, messages: realtimeMessages } = useWebSocket({
    workspaceId,
    channelId,
  });

  // 채팅 히스토리 로드 상태
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [historyMessages, setHistoryMessages] = useState<{
    [date: string]: MessageType[];
  }>({});
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  // 스크롤 관련 ref
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const topLoaderRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 채팅 메시지 불러오기
  const { data, isLoading, refetch } = useChatMessages(
    workspaceId ?? '',
    channelId ?? '',
    currentDate
  );

  const { deleteMessage } = useDeleteMessage({
    workspaceId: workspaceId ?? '',
    channelId: channelId ?? '',
    client: client!,
  });

  // 채널 ID가 변경될 때마다 초기화 및 새 메시지 로드
  useEffect(() => {
    if (!channelId || !workspaceId) return;

    setCurrentDate(new Date());
    setHistoryMessages({});
    setHasMoreMessages(true);
    setInitialLoadDone(false);

    // 현재 시간 기준으로 최초 메시지 로드
    const loadInitialMessages = async () => {
      try {
        await refetch();
        setInitialLoadDone(true);
      } catch (error) {
        setInitialLoadDone(true);
      }
    };

    loadInitialMessages();
  }, [channelId, workspaceId, refetch]);

  // 히스토리 데이터 처리
  useEffect(() => {
    if (!data?.groupedMessages) return;

    // 빈 응답인지 확인
    const isEmpty = Object.keys(data.groupedMessages).length === 0;

    if (isEmpty) {
      setHasMoreMessages(false);
      return;
    }

    setHistoryMessages(prev => {
      const updatedHistory = { ...prev };

      // 새 히스토리 데이터를 기존 데이터와 병합
      Object.entries(data.groupedMessages).forEach(([date, messages]) => {
        if (!updatedHistory[date]) {
          updatedHistory[date] = [];
        }

        // 중복 방지하여 추가
        messages.forEach(msg => {
          const isDuplicate = updatedHistory[date].some(
            existingMsg => existingMsg.messageId === msg.messageId
          );

          if (!isDuplicate) {
            updatedHistory[date].push(msg);
          }
        });
      });

      return updatedHistory;
    });

    // 초기 로드가 완료되면 스크롤을 아래로 이동
    if (initialLoadDone) {
      setTimeout(scrollToBottom, 300);
    }
  }, [data, initialLoadDone]);

  // 최초 로드 시 스크롤 하단으로 이동
  useEffect(() => {
    if (channelData && initialLoadDone) {
      setTimeout(scrollToBottom, 300);
    }
  }, [channelData, initialLoadDone]);

  // 실시간 메시지가 오면 스크롤 하단으로 이동 (자동 스크롤)
  useEffect(() => {
    if (realtimeMessages.length > 0 && scrollContainerRef.current) {
      // 현재 스크롤이 하단 근처에 있는 경우에만 스크롤 다운
      const container = scrollContainerRef.current;
      const isNearBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight <
        150;

      if (isNearBottom) {
        setTimeout(scrollToBottom, 100);
      }
    }
  }, [realtimeMessages]);

  // 실시간 메시지를 기준으로 합쳐진 메시지 계산
  const combinedMessages = useMemo(() => {
    const result = { ...historyMessages };

    // 실시간 메시지 추가
    realtimeMessages.forEach(msg => {
      const date = new Date(msg.createdAt).toISOString().split('T')[0];

      if (!result[date]) {
        result[date] = [];
      }

      // 중복 메시지 방지
      const isDuplicate = result[date].some(
        existingMsg => existingMsg.messageId === msg.messageId
      );

      if (!isDuplicate) {
        // 메시지 추가
        result[date].push(msg);
      }
    });

    // 각 날짜별로 메시지 시간순 정렬
    Object.keys(result).forEach(date => {
      result[date].sort((a, b) => {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      });
    });

    return result;
  }, [historyMessages, realtimeMessages]);

  // 스크롤 하단으로 이동
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
    }
  };

  // 스크롤 상단 도달 시 이전 메시지 로드 (IntersectionObserver 사용)
  useEffect(() => {
    if (!topLoaderRef.current || isLoadingMore || !initialLoadDone) return;

    const loadOlderMessages = async () => {
      if (isLoadingMore || !hasMoreMessages) return;

      setIsLoadingMore(true);

      // 현재 불러온 메시지 중 가장 오래된 메시지 찾기
      let oldestTimestamp = '';
      let oldestDate = new Date();
      let foundOldestMessage = false;

      // 모든 히스토리 메시지에서 가장 오래된 메시지 찾기
      Object.values(historyMessages).forEach(messages => {
        messages.forEach(msg => {
          const msgDate = new Date(msg.createdAt);
          if (!oldestTimestamp || msgDate < new Date(oldestTimestamp)) {
            oldestTimestamp = msg.createdAt;
            oldestDate = msgDate;
            foundOldestMessage = true;
          }
        });
      });

      if (foundOldestMessage) {
        // 스크롤 위치 기억
        const container = scrollContainerRef.current;
        const scrollHeight = container?.scrollHeight || 0;

        // 이전 메시지 불러오기 (1ms 이전 타임스탬프 사용)
        oldestDate.setMilliseconds(oldestDate.getMilliseconds() - 1);
        setCurrentDate(oldestDate);

        // API 호출 대기
        const result = await refetch();

        // 새 메시지가 없으면 더 이상 로드하지 않음
        if (
          !result.data ||
          Object.keys(result.data.groupedMessages).length === 0 ||
          Object.values(result.data.groupedMessages).flat().length === 0
        ) {
          setHasMoreMessages(false);
        }

        // 로딩 완료 후 스크롤 위치 유지
        setTimeout(() => {
          if (container && scrollHeight) {
            const newScrollHeight = container.scrollHeight;
            container.scrollTop = newScrollHeight - scrollHeight;
          }
          setIsLoadingMore(false);
        }, 500);
      } else {
        setIsLoadingMore(false);
        setHasMoreMessages(false);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !isLoadingMore &&
          hasMoreMessages &&
          initialLoadDone
        ) {
          loadOlderMessages();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(topLoaderRef.current);

    return () => observer.disconnect();
  }, [
    historyMessages,
    isLoadingMore,
    refetch,
    hasMoreMessages,
    initialLoadDone,
  ]);

  const handleDeleteMessage = (messageId: string) => {
    deleteMessage(messageId);
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
      <div className="flex flex-col h-[calc(100vh-293px)]">
        <div
          ref={scrollContainerRef}
          className="flex-grow overflow-auto scrollbar-hide"
        >
          {/* 스크롤 상단 도달 시 이전 메시지 로드 트리거 */}
          <div
            ref={topLoaderRef}
            className="h-4 flex items-center justify-center"
          >
            {isLoadingMore && (
              <p className="text-xs text-gray-500">
                이전 메시지 불러오는 중...
              </p>
            )}
          </div>

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

          {/* 합쳐진 메시지 (히스토리 + 실시간) */}
          {Object.keys(combinedMessages).length === 0 ? (
            <p className="text-center py-4 text-gray-500">메시지가 없습니다</p>
          ) : (
            Object.entries(combinedMessages)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([date, messages]) => (
                <div key={date} className="mb-4">
                  <DateBadge date={date} />
                  {messages.map(msg => (
                    <Message
                      key={`${msg.messageId}-${msg.createdAt}`}
                      messageId={msg.messageId}
                      client={client!}
                      user={msg.user}
                      content={msg.content || ''}
                      createdAt={msg.createdAt}
                      workspaceId={workspaceId!}
                      channelId={channelId!}
                      onDeleteMessage={handleDeleteMessage}
                    />
                  ))}
                </div>
              ))
          )}

          {/* 메시지 스크롤 위치 기준점 */}
          <div ref={messagesEndRef} />

          {isLoading && !isLoadingMore && (
            <p className="text-center py-2">메시지 불러오는 중...</p>
          )}
        </div>
      </div>

      {/* 메시지 입력 박스 */}
      {channelData && client && (
        <MessageBox
          channelName={channelData.channelName}
          workspaceId={workspaceId!}
          channelId={channelId!}
          client={client}
          onMessageSent={scrollToBottom}
        />
      )}
    </div>
  );
};

export default ChannelPage;
