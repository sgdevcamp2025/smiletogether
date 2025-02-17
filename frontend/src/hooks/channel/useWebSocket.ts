import { Chat } from '@/types/chat';
import { Client } from '@stomp/stompjs';
import { useEffect, useState } from 'react';

interface UseWebSocketProps {
  workspaceID: string | undefined;
  channelID: string | undefined;
}

export const useWebSocket = ({ workspaceID, channelID }: UseWebSocketProps) => {
  const [messages, setMessages] = useState<Chat[]>([]);
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    if (!workspaceID || !channelID) return;

    const stompClient = new Client({
      brokerURL: 'ws://localhost:8081/ws',
      reconnectDelay: 5000,
    });

    stompClient.onConnect = () => {
      const subscriptionPath = `/sub/workspaces/${workspaceID}/channels/${channelID}`;
      stompClient.subscribe(subscriptionPath, message => {
        const receivedMessage: Chat = JSON.parse(message.body);
        setMessages(prev => [...prev, receivedMessage]);
      });
    };

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
      setClient(null);
    };
  }, [workspaceID, channelID]);

  return { client, messages };
};
