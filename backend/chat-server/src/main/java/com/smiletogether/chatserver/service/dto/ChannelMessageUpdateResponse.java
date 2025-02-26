package com.smiletogether.chatserver.service.dto;

import java.time.LocalDateTime;

public record ChannelMessageUpdateResponse(
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
    public static ChannelMessageUpdateResponse of(WorkspaceProfileDto user, String workspaceId, String channelId,
                                                  ChannelMessageUpdateRequest channelMessageUpdateRequest) {
        return new ChannelMessageUpdateResponse(
                channelMessageUpdateRequest.type(),
                workspaceId,
                channelId,
                channelMessageUpdateRequest.messageId(),
                user,
                channelMessageUpdateRequest.content(),
                true,
                channelMessageUpdateRequest.updateAt(),
                LocalDateTime.now()
        );
    }
}
