package com.smiletogether.notificationserver.service;

import com.smiletogether.notificationserver.domain.NotificationPushSubscription;
import com.smiletogether.notificationserver.infrastructure.SpaceServerApiClient;
import com.smiletogether.notificationserver.repository.NotificationPushSubscriptionRepository;
import com.smiletogether.notificationserver.service.dto.ChatNotificationPushMessageRequest;
import com.smiletogether.notificationserver.service.dto.CommonResponse;
import com.smiletogether.notificationserver.service.dto.NotificationPushSubscriptionRequest;
import com.smiletogether.notificationserver.service.fcm.FirebaseMessagingService;
import com.smiletogether.notificationserver.service.fcm.FirebaseTokenService;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.common.protocol.types.Field.Str;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationPushSubscriptionRepository notificationPushSubscriptionRepository;
    private final FirebaseTokenService firebaseTokenService;
    private final FirebaseMessagingService firebaseMessagingService;
    private final SpaceServerApiClient spaceServerApiClient;


    @Transactional
    public CommonResponse saveNotificationPushSubscription(
            NotificationPushSubscriptionRequest notificationPushSubscriptionRequest) {
        if (notificationPushSubscriptionRepository.existsByToken(notificationPushSubscriptionRequest.token())) {
            return CommonResponse.of("400", "이미 존재하는 토큰입니다.");
        }

        NotificationPushSubscription notificationPushSubscription = NotificationPushSubscription.builder()
                .userId(notificationPushSubscriptionRequest.userId())
                .token(notificationPushSubscriptionRequest.token())
                .createdAt(LocalDateTime.now())
                .expiredAt(notificationPushSubscriptionRequest.expiredAt())
                .build();

        notificationPushSubscriptionRepository.save(notificationPushSubscription);
        return CommonResponse.of("200", "토큰을 정상적으로 저장했습니다.");
    }

    public void pushChatNotification(ChatNotificationPushMessageRequest chatNotificationPushMessageRequest) {
        try {
            String accessToken = firebaseTokenService.getAccessToken();
            String title = createNotificationTitle(chatNotificationPushMessageRequest);
            String body = createNotificationBody(chatNotificationPushMessageRequest);

//            String member = "24fa8a1c-fb3a-11ef-a453-6640c3b0a701";
//            Map<String, String> data = new HashMap<>();
//            data.put("userId", member);
//            data.put("workspaceId", chatNotificationPushMessageRequest.workspaceId());
//            data.put("channelId", chatNotificationPushMessageRequest.channelId());
//            data.put("sender", chatNotificationPushMessageRequest.senderId());
//            List<NotificationPushSubscription> notificationPushSubscriptions= notificationPushSubscriptionRepository.findAllByUserId(member);
//            for (NotificationPushSubscription notificationPushSubscription : notificationPushSubscriptions) {
//                firebaseMessagingService.sendMessage(
//                        accessToken,
//                        notificationPushSubscription.getToken(),
//                        title,
//                        body,
//                        data
//                );
//            }

            List<String> members = spaceServerApiClient.getChannelMembers(chatNotificationPushMessageRequest.token(),
                    chatNotificationPushMessageRequest.channelId());

            for (String member : members) {
                Map<String, String> data = new HashMap<>();
                data.put("userId", member);
                data.put("workspaceId", chatNotificationPushMessageRequest.workspaceId());
                data.put("channelId", chatNotificationPushMessageRequest.channelId());
                data.put("sender", chatNotificationPushMessageRequest.senderId());
                List<NotificationPushSubscription> notificationPushSubscriptions= notificationPushSubscriptionRepository.findAllByUserId(member);
                for (NotificationPushSubscription notificationPushSubscription : notificationPushSubscriptions) {
                    firebaseMessagingService.sendMessage(
                            accessToken,
                            notificationPushSubscription.getToken(),
                            title,
                            body,
                            data
                            );
                }
            }

        } catch (IOException e) {
            throw new RuntimeException("토큰을 받아오지 못했습니다.");
        }
    }

    private String createNotificationTitle(ChatNotificationPushMessageRequest chatNotificationPushMessageRequest) {
        String title = "#" + chatNotificationPushMessageRequest.channelId() + "에서" + chatNotificationPushMessageRequest.senderName()+"님이 새 메시지를 보냈습니다.";
        return title;
    }

    private String createNotificationBody(ChatNotificationPushMessageRequest chatNotificationPushMessageRequest) {
        String body =chatNotificationPushMessageRequest.senderName()+": " + chatNotificationPushMessageRequest.content();

        return body;
    }
}
