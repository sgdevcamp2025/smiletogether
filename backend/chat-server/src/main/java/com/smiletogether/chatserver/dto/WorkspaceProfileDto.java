package com.smiletogether.chatserver.dto;

import com.smiletogether.chatserver.infrastructure.ExternalProfileResponse;

public record WorkspaceProfileDto(
        String userId,
        String displayName,
        String profileImage,
        String position,
        boolean isActive,
        String statusMessage
) {
    public static WorkspaceProfileDto of(ExternalProfileResponse externalProfileResponse) {
        return new WorkspaceProfileDto(
                externalProfileResponse.userId(),
                externalProfileResponse.displayName(),
                externalProfileResponse.profileImage(),
                externalProfileResponse.position(),
                externalProfileResponse.isActive(),
                externalProfileResponse.statusMessage()
        );
    }
}
