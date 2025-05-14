package com.smiletogether.notificationserver.service.dto;

import java.time.LocalDateTime;
import org.springframework.cglib.core.Local;

public record NotificationPushSubscriptionRequest (
        String userId,
        String token,
        LocalDateTime expiredAt
) {
}
