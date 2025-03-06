package com.smiletogether.historyserver.service.dto;

import java.time.LocalDateTime;

public record ChannelMessageSaveRequest(
        String messageId,
        String workspaceId,
        String channelId,
        WorkspaceProfileDto user,
        String content,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        String type
) {

}
