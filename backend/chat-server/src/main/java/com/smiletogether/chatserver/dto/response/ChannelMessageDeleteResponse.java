package com.smiletogether.chatserver.dto.response;

import com.smiletogether.chatserver.dto.ChannelMessageDeleteDto;

public record ChannelMessageDeleteResponse(
        String type,
        String messageId,
        String code,
        String message
) {
    public static ChannelMessageDeleteResponse of(ChannelMessageDeleteDto channelMessageDeleteDto) {
        return new ChannelMessageDeleteResponse(
                channelMessageDeleteDto.type(),
                channelMessageDeleteDto.messageId(),
                channelMessageDeleteDto.code(),
                channelMessageDeleteDto.message()
        );
    }
}
