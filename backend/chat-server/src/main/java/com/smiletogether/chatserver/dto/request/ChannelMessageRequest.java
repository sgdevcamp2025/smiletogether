package com.smiletogether.chatserver.dto.request;

public record ChannelMessageRequest(
        String type,
        String content
) {
}
