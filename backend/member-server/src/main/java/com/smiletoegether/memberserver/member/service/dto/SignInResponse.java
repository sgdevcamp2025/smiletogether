package com.smiletoegether.memberserver.member.service.dto;

import com.smiletoegether.memberserver.common.dto.CommonCodeResponse;

public record SignInResponse(
        String accessToken,
        CommonCodeResponse response
) {

}
