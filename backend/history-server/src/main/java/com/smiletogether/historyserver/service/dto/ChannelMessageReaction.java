package com.smiletogether.historyserver.service.dto;

public record ChannelMessageReaction(
    String type,
    String memberId,
    String messageId,
    String emoji
) {

}
