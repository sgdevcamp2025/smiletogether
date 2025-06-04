import { alarmApi } from '@/lib/clients';
interface postFirebaseTokenRequest {
  userId: string;
  token: string;
  expiredAt: string;
}

export const postFirebaseToken = async (data: postFirebaseTokenRequest) => {
  const response = await alarmApi.post(
    `/api/notification/subscription-info`,
    data
  );
  return response.data;
};

interface postChannelMessageNotificationRequest {
  workspaceId: string;
  channelId: string;
}

export const postChannelMessageNotification = async ({
  workspaceId,
  channelId,
}: postChannelMessageNotificationRequest) => {
  const response = await alarmApi.post(
    `/api/workspaces/${workspaceId}/channels/${channelId}/notifications/message`
  );
  return response.data;
};
