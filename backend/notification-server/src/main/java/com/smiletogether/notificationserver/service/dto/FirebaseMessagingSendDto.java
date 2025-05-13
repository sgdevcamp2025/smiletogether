package com.smiletogether.notificationserver.service.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FirebaseMessagingSendDto {
    private String token;

    private String title;

    private String body;

    @Builder(toBuilder = true)
    public FirebaseMessagingSendDto(String token, String title, String body) {
        this.token = token;
        this.title = title;
        this.body = body;
    }
}
