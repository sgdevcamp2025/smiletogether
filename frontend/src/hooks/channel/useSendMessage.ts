import React, { useCallback, useState } from 'react';
import { Client } from '@stomp/stompjs';
import { useUserStore } from '@/stores/userStore';

interface UseSendMessageProps {
  workspaceId: string;
  channelId: string;
  client: Client;
}

export const useSendMessage = ({
  workspaceId,
  channelId,
  client,
}: UseSendMessageProps) => {
  const [message, setMessage] = useState('');
  const userId = useUserStore(state => state.user.userId);
  const isDisabled = message.trim() === '';

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = useCallback(() => {
    if (!client || !client.connected) return;

    if (!userId) return;

    if (!message.trim()) return;

    const messageData = { userId: userId, content: message };

    const publishPath = `/pub/workspaces/${workspaceId}/channels/${channelId}`;
    client.publish({
      destination: publishPath,
      body: JSON.stringify(messageData),
    });

    setMessage('');
  }, [client, workspaceId, channelId, userId, message]);

  return {
    message,
    handleChange,
    sendMessage,
    isDisabled,
  };
};
