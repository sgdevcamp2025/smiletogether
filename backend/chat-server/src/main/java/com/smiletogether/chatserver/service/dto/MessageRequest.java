package com.smiletogether.chatserver.service.dto;

public record MessageRequest(
        String type,
        String content
) {
}
