package com.smiletogether.notificationserver.controller;

import com.smiletogether.notificationserver.service.dto.CommonResponse;
import com.smiletogether.notificationserver.service.fcm.FirebaseMessagingService;
import com.smiletogether.notificationserver.service.fcm.FirebaseTokenService;
import com.smiletogether.notificationserver.service.NotificationService;
import com.smiletogether.notificationserver.service.dto.NotificationPushSubscriptionRequest;
import java.io.IOException;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;
    private final FirebaseMessagingService firebaseMessagingService;
    private final FirebaseTokenService firebaseTokenService;

    @PostMapping("/api/notification/subscribe-info")
    public ResponseEntity<CommonResponse> saveSubscribeInfo(
            @RequestBody NotificationPushSubscriptionRequest notificationPushSubscriptionRequest
    ) {
        return ResponseEntity.ok(notificationService.saveNotificationPushSubscription(notificationPushSubscriptionRequest));
    }


    //test API
    @PostMapping("/push")
    public ResponseEntity<String> sendTestPush(
            @RequestBody PushRequest request
    ) throws IOException {
        String accessToken = firebaseTokenService.getAccessToken();

        firebaseMessagingService.sendMessage(
                accessToken,
                request.targetToken(),
                request.title(),
                request.body(),
                Map.of("customKey", "frontend-test")
        );

        return ResponseEntity.ok("Push notification sent.");
    }

    public record PushRequest(
            String targetToken,
            String title,
            String body
    ) {}

}
