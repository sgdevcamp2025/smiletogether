import ChannelInfo from '@/components/channel/ChannelInfo';
import ChatHeader from '@/components/common/ChatHeader';
import DateBadge from '@/components/common/DateBadge';
import Message from '@/components/common/Message';
import { useGetChannel } from '@/hooks/channel/useGetChaneel';
import { useGetMessages } from '@/hooks/channel/useGetMessage';
import { useParams } from 'react-router';

const ChannelPage = () => {
  const { workspaceId, channelId } = useParams();
  const { channelData, isChannelLoading, isChannelError } = useGetChannel(
    channelId || ''
  );
  const { messageData, isMessageLoading, isMessageError } = useGetMessages(
    channelId || ''
  );

  if (isMessageLoading && isChannelLoading) return <p>로딩중입니다.</p>;
  if (isMessageError && isChannelError) return <p>에러입니다.</p>;

  return (
    <div>
      {channelData && (
        <>
          <ChatHeader
            name={channelData.name}
            isPrivate={channelData.isPrivate}
            totalMembers={channelData.totalMembers}
            members={channelData.members}
          />
          <ChannelInfo
            userId={channelData.createdBy.userId}
            channelName={channelData.name}
            displayName={channelData.createdBy.displayName}
            username={channelData.createdBy.username}
            createdAt={channelData.createdAt}
            isPrivate={channelData.isPrivate}
          />
        </>
      )}

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
    </div>
  );
};

export default ChannelPage;
