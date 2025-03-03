package com.smiletogether.chatserver.dto.response;

import com.smiletogether.chatserver.dto.ChannelMessageUpdateDto;
import com.smiletogether.chatserver.dto.WorkspaceProfileDto;
import java.time.LocalDateTime;

public record ChannelMessageUpdateResponse(
        String type,
        String messageId,
        WorkspaceProfileDto user,
        String content,
        boolean isUpdated,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static ChannelMessageUpdateResponse of(ChannelMessageUpdateDto channelMessageUpdateDto) {
        return new ChannelMessageUpdateResponse(
                channelMessageUpdateDto.type(),
                channelMessageUpdateDto.messageId(),
                channelMessageUpdateDto.user(),
                channelMessageUpdateDto.content(),
                channelMessageUpdateDto.isUpdated(),
                channelMessageUpdateDto.createdAt(),
                channelMessageUpdateDto.updatedAt()
        );
    }
}
