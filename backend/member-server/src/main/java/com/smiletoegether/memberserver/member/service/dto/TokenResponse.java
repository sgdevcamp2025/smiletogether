package com.smiletoegether.memberserver.member.service.dto;

public record TokenResponse(
        String accessToken,
        String refreshToken
) {

}
