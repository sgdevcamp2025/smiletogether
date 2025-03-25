import { getToken } from '@/lib/utils';
import { Client } from '@stomp/stompjs';

interface UseDeleteMessageProps {
  workspaceId: string;
  channelId: string;
  client: Client;
}

export const useDeleteMessage = ({
  workspaceId,
  channelId,
  client,
}: UseDeleteMessageProps) => {
  const deleteMessage = (messageId: string, onSuccess?: () => void) => {
    if (!client || !client.connected) {
      console.error('STOMP 클라이언트가 연결되지 않았습니다.');
      return;
    }

    const deletePath = `/pub/workspaces/${workspaceId}/channels/${channelId}/delete`;

    try {
      client.publish({
        destination: deletePath,
        body: JSON.stringify({
          type: 'DELETE',
          messageId,
        }),
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
        },
      });

      console.log(`메시지 삭제 요청 전송: ${messageId}`);

      // ✅ 서버 응답을 기다리는 로직 추가 가능
      setTimeout(() => {
        if (onSuccess) onSuccess(); // 서버에서 응답을 받았다고 가정하고 삭제 처리
      }, 500);
    } catch (error) {
      console.error('메시지 삭제 중 오류 발생:', error);
    }
  };

  return { deleteMessage };
};
