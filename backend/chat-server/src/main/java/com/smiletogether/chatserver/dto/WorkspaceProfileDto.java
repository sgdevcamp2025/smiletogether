package com.smiletogether.chatserver.dto;

public record WorkspaceProfileDto(
        String userId,
        String displayName,
        String profileImage,
        String position,
        boolean isActive,
        String statusMessage
) {
}
