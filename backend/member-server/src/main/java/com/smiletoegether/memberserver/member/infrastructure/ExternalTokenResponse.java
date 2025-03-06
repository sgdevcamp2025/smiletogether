package com.smiletoegether.memberserver.member.infrastructure;

public record ExternalTokenResponse(
        String message,
        String accessToken
) {
}
