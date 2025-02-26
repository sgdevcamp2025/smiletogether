package com.smiletogether.chatserver.service.dto;

import java.time.LocalDateTime;

public record ChannelMessageUpdateRequest(
        String type,
        String messageId,
        String content,
        LocalDateTime updateAt
) {

}
