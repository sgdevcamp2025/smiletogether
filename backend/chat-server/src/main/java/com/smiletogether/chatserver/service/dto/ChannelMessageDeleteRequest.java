package com.smiletogether.chatserver.service.dto;

public record ChannelMessageDeleteRequest(
        String type,
        String messageId
) {

}
