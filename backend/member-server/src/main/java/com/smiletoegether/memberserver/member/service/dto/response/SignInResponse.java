package com.smiletoegether.memberserver.member.service.dto.response;

import com.smiletoegether.memberserver.common.dto.CommonCodeResponse;
import com.smiletoegether.memberserver.member.domain.Member;

public record SignInResponse(
        String accessToken,
        CommonCodeResponse response,
        boolean isMember,
        Member member
) {

}
