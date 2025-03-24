package com.smiletogether.chatserver.dto.request;

import java.time.LocalDateTime;

public record ChannelMessageUpdateRequest(
        String type,
        String messageId,
        String content,
        LocalDateTime createdAt
) {

}
