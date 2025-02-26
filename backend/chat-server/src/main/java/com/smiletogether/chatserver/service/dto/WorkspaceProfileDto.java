package com.smiletogether.chatserver.service.dto;

public record WorkspaceProfileDto(
        String userId,
        String displayName,
        String profileImage
) {
}
