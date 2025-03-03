import { MessageType } from '@/types/chat';
import { Client } from '@stomp/stompjs';
import { useEffect, useState } from 'react';

interface UseWebSocketProps {
  workspaceId: string | undefined;
  channelId: string | undefined;
}

export const useWebSocket = ({ workspaceId, channelId }: UseWebSocketProps) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    if (!workspaceId || !channelId) return;

    const stompClient = new Client({
      brokerURL: 'ws://localhost:8081/ws',
      reconnectDelay: 5000,
    });

    stompClient.onConnect = () => {
      const subscriptionPath = `/sub/workspaces/${workspaceId}/channels/${channelId}`;
      stompClient.subscribe(subscriptionPath, message => {
        const receivedMessage: MessageType = JSON.parse(message.body);
        setMessages(prev => [...prev, receivedMessage]);
      });
    };

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
      setClient(null);
    };
  }, [workspaceId, channelId]);

  return { client, messages };
};
