import { useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import { getToken } from '@/lib/utils';

interface UseEditMessageProps {
  workspaceId: string;
  channelId: string;
  client: Client;
}

export const useEditMessage = ({
  workspaceId,
  channelId,
  client,
}: UseEditMessageProps) => {
  const editMessage = useCallback(
    (messageId: string, content: string) => {
      if (!client || !client.connected) {
        console.error('웹소켓 연결이 없습니다.');
        return;
      }

      const createdAt = new Date().toISOString().replace('Z', '');

      const messageData = {
        type: 'UPDATE',
        messageId,
        content,
        createdAt,
      };

      const updatePath = `/pub/workspaces/${workspaceId}/channels/${channelId}/update`;

      try {
        client.publish({
          destination: updatePath,
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify(messageData),
        });
        console.log('🔄 메시지 업데이트 요청:', messageData);
      } catch (error) {
        console.error('메시지 업데이트 중 오류 발생:', error);
      }
    },
    [client, workspaceId, channelId]
  );

  return { editMessage };
};
