package com.smiletoegether.memberserver.member.service.dto.response;

import com.smiletoegether.memberserver.member.domain.Member;

public record SignUpResponse(
        String code,
        String message,
        Member member
) {
}
