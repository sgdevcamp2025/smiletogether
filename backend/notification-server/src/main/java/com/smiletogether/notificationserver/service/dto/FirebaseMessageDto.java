package com.smiletogether.notificationserver.service.dto;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FirebaseMessageDto {
    private boolean validateOnly;
    private FirebaseMessageDto.Message message;

    @Getter
    @Builder
    @AllArgsConstructor
    public static class Message {
        private Notification notification;
        private String token;
        private Map<String, String> data;
    }


    @Builder
    @AllArgsConstructor
    @Getter
    public static class Notification {
        private String title;
        private String body;
        private String image;
    }
}
