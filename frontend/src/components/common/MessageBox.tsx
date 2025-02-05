import { ChangeEvent, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import clsx from 'clsx';

interface MessageBoxProps {
  channelName: string;
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

const MessageBox = ({ channelName }: MessageBoxProps) => {
  const [message, setMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const isDisabled = message.trim() === '';

  return (
    <div className="fixed bottom-5 left-0 px-5 w-full">
      <div className="flex flex-col gap-3 bg-white border px-3 py-2 rounded-lg shadow-sm">
        <Textarea
          className="flex-grow h-auto resize-none border-none shadow-none focus-visible:ring-0 px-0"
          placeholder={`${channelName}에 메시지 보내기`}
          onChange={handleChange}
        />
        <div className="flex justify-between items-center">
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
          >
            <img src="/icons/Send.svg" alt="send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
