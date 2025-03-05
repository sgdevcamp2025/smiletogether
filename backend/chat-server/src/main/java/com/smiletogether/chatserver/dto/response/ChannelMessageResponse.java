package com.smiletogether.chatserver.dto.response;

import com.smiletogether.chatserver.dto.ChannelMessageDto;
import com.smiletogether.chatserver.dto.WorkspaceProfileDto;
import java.time.LocalDateTime;

public record ChannelMessageResponse(
        String messageId,
        WorkspaceProfileDto user,
        String content,
        LocalDateTime createdAt
) {
    public static ChannelMessageResponse of(ChannelMessageDto channelMessageDto) {
        return new ChannelMessageResponse(
                channelMessageDto.messageId(),
                channelMessageDto.user(),
                channelMessageDto.content(),
                channelMessageDto.createdAt()
        );
    }
}
