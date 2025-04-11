import React, { useCallback, useState } from 'react';
import { Client } from '@stomp/stompjs';
import { useUserStore } from '@/stores/userStore';
import { getToken } from '@/lib/utils';

interface UseSendMessageProps {
  workspaceId: string;
  channelId: string;
  client: Client;
  onMessageSent?: () => void;
}

export const useSendMessage = ({
  workspaceId,
  channelId,
  client,
  onMessageSent,
}: UseSendMessageProps) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const userId = useUserStore(state => state.user.userId);
  const isDisabled = message.trim() === '' || isSending;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = useCallback(() => {
    if (isSending) {
      return;
    }

    if (!client || !client.connected) {
      return;
    }

    if (!userId) {
      return;
    }

    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      return;
    }

    setIsSending(true);

    const messageToSend = trimmedMessage;
    setMessage('');

    const messageData = { type: 'SEND', content: messageToSend };
    const publishPath = `/pub/workspaces/${workspaceId}/channels/${channelId}`;

    try {
      client.publish({
        destination: publishPath,
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(messageData),
      });

      if (onMessageSent) {
        setTimeout(onMessageSent, 100);
      }
    } catch (error) {
      // 에러 처리
    } finally {
      setTimeout(() => {
        setIsSending(false);
      }, 100);
    }
  }, [
    client,
    workspaceId,
    channelId,
    userId,
    message,
    onMessageSent,
    isSending,
  ]);

  return {
    message,
    handleChange,
    sendMessage,
    isDisabled,
    isSending,
  };
};
