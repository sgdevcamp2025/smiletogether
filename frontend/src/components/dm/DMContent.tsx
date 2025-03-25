import { useParams } from 'react-router';
import Message from '../common/Message';
import DMInfo from './DMInfo';
import { useGetDMMessages } from '@/hooks/dm/useGetDMMessages';
import DateBadge from '../common/DateBadge';

const DMContent = () => {
  const { dmId } = useParams();
  const { data, isLoading, isError } = useGetDMMessages(dmId!);

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
    </div>
  );
};

export default DMContent;
