package com.smiletogether.chatserver.service.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;

public record MessageResponse(
        WorkspaceProfileDto user,
        String content,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
