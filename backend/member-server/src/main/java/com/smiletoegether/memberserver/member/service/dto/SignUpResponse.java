package com.smiletoegether.memberserver.member.service.dto;

import com.smiletoegether.memberserver.member.domain.Member;

public record SignUpResponse(
        String code,
        String message,
        Member data
) {
}
