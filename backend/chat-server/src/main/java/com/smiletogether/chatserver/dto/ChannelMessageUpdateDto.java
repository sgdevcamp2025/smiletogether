package com.smiletogether.chatserver.dto;

import com.smiletogether.chatserver.dto.request.ChannelMessageUpdateRequest;
import java.time.LocalDateTime;

public record ChannelMessageUpdateDto(
        String type,
        String workspaceId,
        String channelId,
        String messageId,
        WorkspaceProfileDto user,
        String content,
        boolean isUpdated,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static ChannelMessageUpdateDto of(WorkspaceProfileDto user, String workspaceId, String channelId,
                                             ChannelMessageUpdateRequest channelMessageUpdateRequest, LocalDateTime updatedAt) {
        return new ChannelMessageUpdateDto(
                channelMessageUpdateRequest.type(),
                workspaceId,
                channelId,
                channelMessageUpdateRequest.messageId(),
                user,
                channelMessageUpdateRequest.content(),
                true,
                channelMessageUpdateRequest.createdAt(),
                updatedAt
        );
    }
}