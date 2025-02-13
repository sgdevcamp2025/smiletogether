package com.smiletogether.chatserver.service.dto;

public record MessageRequest(
        Long userId,
        String content
) {
}
