package com.smiletogether.notificationserver.service.dto;

public record ChatNotificationPushMessageRequest(
        String workspaceId,
        String channelId,
        String content,
        String senderId,
        String senderName,
        String token
) {

    public static ChatNotificationPushMessageRequest of(String workspaceId, String channelId, String content,
            String senderId, String senderName, String token) {
        return new ChatNotificationPushMessageRequest(workspaceId, channelId, content, senderId, senderName, token);
    }
}
