package com.smiletogether.historyserver.service.dto;

public record WorkspaceProfileDto(
        String userId,
        String displayName,
        String profileImage,
        String position,
        String statusMessage,
        boolean isActive
) {
    public static WorkspaceProfileDto of(String memberId) {
        return new WorkspaceProfileDto(
                memberId,
                "John Doe",
                "https://example.com/default-profile.png",
                "Software Engineer",
                "Available",
                true
        );
    }
}
