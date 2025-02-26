package com.smiletogether.chatserver.service.dto;

public record ChannelMessageDeleteResponse(
        String type,
        String workspaceId,
        String channelId,
        String messageId,
        String code,
        String message
) {

}
