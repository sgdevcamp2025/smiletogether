package com.smiletogether.historyserver.service.dto.request;

import com.smiletogether.historyserver.service.dto.WorkspaceProfileDto;
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
