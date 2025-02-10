package com.smiletogether.chatserver.service.dto;

public record WorkspaceProfileDto(
        Long userId,
        String displayName,
        String profileImage
) {
}
