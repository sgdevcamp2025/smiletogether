package com.smiletogether.chatserver.service.dto;

import java.time.LocalDateTime;

public record ChannelChatDto(
    Long workspaceId,
    Long channelId,
    WorkspaceProfileDto user,
    String content,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {

}
