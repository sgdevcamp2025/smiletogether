package com.smiletogether.chatserver.dto.request;

import java.time.LocalDateTime;

public record ChannelMessageUpdateKafkaRequest(
        String type,
        String messageId,
        String content,
        LocalDateTime updateAt
) {

    public static ChannelMessageUpdateKafkaRequest of(ChannelMessageUpdateRequest channelMessageUpdateRequest,
                                                 LocalDateTime currentTime) {
        return new ChannelMessageUpdateKafkaRequest(
                channelMessageUpdateRequest.type(),
                channelMessageUpdateRequest.messageId(),
                channelMessageUpdateRequest.content(),
                currentTime
        );
    }
}
