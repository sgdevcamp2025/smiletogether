package com.smiletogether.chatserver.dto.request;

public record ChannelMessageDeleteRequest(
        String type,
        String messageId
) {

}
