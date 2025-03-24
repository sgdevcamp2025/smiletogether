package com.smiletogether.chatserver.dto;

public record ChannelMessageReactionDto(
        String type,
        String messageId,
        String memberId,
        String workspaceId,
        String channelId,
        String emoji
) {
}
