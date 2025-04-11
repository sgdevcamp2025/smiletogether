import { MessageType } from '@/types/chat';
import { Client } from '@stomp/stompjs';
import { useEffect, useState, useRef } from 'react';

interface UseWebSocketProps {
  workspaceId: string | undefined;
  channelId: string | undefined;
}

export const useWebSocket = ({ workspaceId, channelId }: UseWebSocketProps) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [client, setClient] = useState<Client | null>(null);
  const receivedMessageIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!workspaceId || !channelId) return;

    setMessages([]);
    receivedMessageIds.current.clear();

    const stompClient = new Client({
      brokerURL: 'ws://localhost:8081/ws',
      reconnectDelay: 5000,
    });

    stompClient.onConnect = () => {
      const subscriptionPath = `/sub/workspaces/${workspaceId}/channels/${channelId}`;

      stompClient.subscribe(subscriptionPath, message => {
        try {
          const receivedMessage: MessageType = JSON.parse(message.body);

          if (!receivedMessage.messageId) {
            return;
          }

          if (receivedMessage.type === 'UPDATE') {
            setMessages(prev => {
              const updated = prev.map(msg =>
                msg.messageId === receivedMessage.messageId
                  ? {
                      ...msg,
                      content: receivedMessage.content,
                      isUpdated: true,
                    }
                  : msg
              );
              return updated;
            });
            return;
          }

          setMessages(prev => {
            if (receivedMessageIds.current.has(receivedMessage.messageId)) {
              return prev;
            }

            if (
              !receivedMessage.content ||
              typeof receivedMessage.content !== 'string'
            ) {
              receivedMessage.content = receivedMessage.content || '';
            }

            receivedMessageIds.current.add(receivedMessage.messageId);

            return [...prev, receivedMessage];
          });
        } catch (error) {
          // 오류 처리
        }
      });
    };

    stompClient.activate();
    setClient(stompClient);

    return () => {
      if (stompClient.connected) {
        stompClient.deactivate();
      }
      setClient(null);
    };
  }, [workspaceId, channelId]);

  return { client, messages };
};
