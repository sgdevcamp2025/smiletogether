import { Textarea } from '@/components/ui/textarea';
import clsx from 'clsx';
import { Client } from '@stomp/stompjs';
import { useSendMessage } from '@/hooks/channel/useSendMessage';
import React, { useRef, useEffect } from 'react';

interface MessageBoxProps {
  channelName: string;
  workspaceId: string;
  channelId: string;
  client: Client;
  onMessageSent?: () => void;
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
  onMessageSent,
}: MessageBoxProps) => {
  const { message, handleChange, sendMessage, isDisabled, isSending } =
    useSendMessage({
      workspaceId,
      channelId,
      client,
      onMessageSent: () => {
        // 메시지 전송 완료 후 텍스트 영역에 포커스
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
        // 원래 콜백도 실행
        if (onMessageSent) {
          onMessageSent();
        }
      },
    });

  // Textarea에 대한 참조 추가
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 메시지가 초기화되면(전송 후) 포커스 설정
  useEffect(() => {
    if (message === '' && !isSending && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [message, isSending]);

  const sendMessageByEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isDisabled && !isSending) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-full p-5">
      <div className="flex flex-col gap-3 px-3 py-2 bg-white border rounded-lg shadow-sm">
        <Textarea
          ref={textareaRef}
          className="flex-grow h-auto px-0 border-none shadow-none resize-none focus-visible:ring-0"
          placeholder={`${channelName}에 메시지 보내기`}
          onChange={handleChange}
          value={message}
          onKeyDown={sendMessageByEnter}
          disabled={isSending}
        />
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {icons.map((icon, index) => (
              <button
                key={index}
                onClick={icon.onClick}
                className="cursor-pointer"
                disabled={isSending}
              >
                <img className="w-5 h-5" src={icon.src} alt={icon.alt} />
              </button>
            ))}
          </div>
          <button
            className={clsx('px-2 py-1 rounded-sm transition-colors', {
              'bg-zinc-400 cursor-not-allowed': isSending,
              'bg-zinc-300 cursor-not-allowed': !isSending && isDisabled,
              'bg-lime-500 cursor-pointer hover:bg-lime-600':
                !isSending && !isDisabled,
            })}
            disabled={isDisabled || isSending}
            onClick={sendMessage}
          >
            {isSending ? (
              <span className="text-xs text-white animate-pulse px-1">
                전송중
              </span>
            ) : (
              <img src="/icons/Send.svg" alt="send" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
