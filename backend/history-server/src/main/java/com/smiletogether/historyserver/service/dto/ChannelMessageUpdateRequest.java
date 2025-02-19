package com.smiletogether.historyserver.service.dto;

public record ChannelMessageUpdateRequest(
        String type,
        String messageId,
        String content
) {

}
