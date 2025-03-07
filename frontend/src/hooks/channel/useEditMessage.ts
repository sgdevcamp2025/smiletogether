import { useCallback } from 'react';
import { Client } from '@stomp/stompjs';

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
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcklkIjoiMDNjNmIwODMtZThkNi00ODhjLWFhODMtMmEwMWIzZjM5ZDAwIiwiaWF0IjoxNTE2MjM5MDIyfQ.iVTdh4kkGh6f6gEZLf9MJPwkjusaXf58z_Tc4ncummw`,
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
