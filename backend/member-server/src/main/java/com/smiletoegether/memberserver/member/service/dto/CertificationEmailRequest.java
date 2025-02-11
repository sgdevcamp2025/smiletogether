package com.smiletoegether.memberserver.member.service.dto;

public record CertificationEmailRequest(
    String email,
    String code
) {
}
