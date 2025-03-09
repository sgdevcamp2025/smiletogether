package com.smiletogether.historyserver.infrastructure;

public record ExternalProfileResponse(
        String userId,
        String username,
        String displayName,
        String profileImage,
        String position,
        String role,
        boolean isActive,
        String statusMessage
) {
}