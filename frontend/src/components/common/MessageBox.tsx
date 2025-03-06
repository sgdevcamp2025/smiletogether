import { Textarea } from '@/components/ui/textarea';
import clsx from 'clsx';
import { Client } from '@stomp/stompjs';
import { useSendMessage } from '@/hooks/channel/useSendMessage';

interface MessageBoxProps {
  channelName: string;
  workspaceId: string;
  channelId: string;
  client: Client;
}

const icons = [
  {
    src: '/icons/Add.svg',
    alt: '파일 업로드',
    onClick: () => console.log('파일 업로드'),
  },
  {
    src: '/icons/Emoji.svg',
    alt: '이모지',
    onClick: () => console.log('이모지 선택'),
  },
  {
    src: '/icons/Mention.svg',
    alt: '멘션',
    onClick: () => console.log('멘션 추가'),
  },
  {
    src: '/icons/Video.svg',
    alt: '허들',
    onClick: () => console.log('허들 시작'),
  },
  {
    src: '/icons/Recording.svg',
    alt: '음성',
    onClick: () => console.log('음성 녹음'),
  },
];

const MessageBox = ({
  channelName,
  workspaceId,
  channelId,
  client,
}: MessageBoxProps) => {
  const { message, handleChange, sendMessage, isDisabled } = useSendMessage({
    workspaceId,
    channelId,
    client,
  });

  return (
    <div className="w-full p-5">
      <div className="flex flex-col gap-3 px-3 py-2 bg-white border rounded-lg shadow-sm">
        <Textarea
          className="flex-grow h-auto px-0 border-none shadow-none resize-none focus-visible:ring-0"
          placeholder={`${channelName}에 메시지 보내기`}
          onChange={handleChange}
          value={message}
        />
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {icons.map((icon, index) => (
              <button
                key={index}
                onClick={icon.onClick}
                className="cursor-pointer"
              >
                <img className="w-5 h-5" src={icon.src} alt={icon.alt} />
              </button>
            ))}
          </div>
          <button
            className={clsx(
              'px-2 py-1 rounded-sm transition-colors',
              isDisabled
                ? 'bg-zinc-300 cursor-not-allowed'
                : 'bg-lime-500 cursor-pointer'
            )}
            disabled={isDisabled}
            onClick={sendMessage}
          >
            <img src="/icons/Send.svg" alt="send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
