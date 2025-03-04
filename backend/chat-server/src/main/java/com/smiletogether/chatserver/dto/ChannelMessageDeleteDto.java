package com.smiletogether.chatserver.dto;

public record ChannelMessageDeleteDto(
        String type,
        String workspaceId,
        String channelId,
        String messageId,
        String code,
        String message
) {

}
