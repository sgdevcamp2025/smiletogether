package com.smiletoegether.memberserver.member.service.dto.response;

public record InviteUrlEmailResponse(
        String code,
        String message,
        String inviteUrl
) {

}
