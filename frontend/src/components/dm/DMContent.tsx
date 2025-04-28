import { useParams } from 'react-router';
import Message from '../common/Message';
import DMInfo from './DMInfo';
import { useGetDMMessages } from '@/hooks/dm/useGetDMMessages';
import DateBadge from '../common/DateBadge';
import { Client } from '@stomp/stompjs';

const DMContent = () => {
  const { dmId, workspaceId } = useParams();
  const { data, isLoading, isError } = useGetDMMessages(dmId!);
  const client = null as unknown as Client; // 실제로는 제대로 된 Client가 필요

  const handleDeleteMessage = (messageId: string) => {
    console.log('Delete message', messageId);
    // 메시지 삭제 로직 구현 필요
  };

  if (isLoading) return <p>로딩중입니다.</p>;
  if (isError) return <p>에러</p>;

  return (
    <div>
      {data && data?.participants.length > 0 && (
        <DMInfo {...data.participants[0]} />
      )}
      {data?.messages ? (
        Object.entries(data.messages).map(([date, messages]) => (
          <div key={date}>
            <DateBadge date={date} />
            {messages.map(msg => (
              <Message
                key={msg.messageId}
                messageId={msg.messageId}
                client={client}
                workspaceId={workspaceId || ''}
                channelId={dmId || ''}
                user={msg.user}
                content={msg.content}
                createdAt={msg.createdAt}
                onDeleteMessage={handleDeleteMessage}
              />
            ))}
          </div>
        ))
      ) : (
        <p>메시지 없음</p>
      )}
    </div>
  );
};

export default DMContent;
