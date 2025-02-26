package com.smiletogether.chatserver.service.dto;

public record ChannelMessageReaction(
        String type,
        String messageId,
        String memberId,
        String workspaceId,
        String channelId,
        String emoji
) {
}
