package com.smiletogether.notificationserver.service.dto;

public record CommonResponse(
        String code,
        String message
) {
    public static CommonResponse of(String code, String message) {
        return new CommonResponse(
                code,
                message
        );
    }
}
