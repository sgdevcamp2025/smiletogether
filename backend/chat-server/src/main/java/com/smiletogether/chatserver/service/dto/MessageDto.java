package com.smiletogether.chatserver.service.dto;

public record MessageDto(
        Long userId,
        String content
) {
    public static MessageDto of (MessageDto messageDto) {
        return new MessageDto(
                messageDto.userId,
                messageDto.content
        );
    }
}
