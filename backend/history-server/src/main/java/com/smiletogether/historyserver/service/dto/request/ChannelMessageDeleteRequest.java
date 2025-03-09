package com.smiletogether.historyserver.service.dto.request;

public record ChannelMessageDeleteRequest(
        String type,
        String messageId
) {

}
