package com.smiletogether.historyserver.service.dto;

public record ChannelMessageDeleteRequest(
        String type,
        String messageId
) {

}
