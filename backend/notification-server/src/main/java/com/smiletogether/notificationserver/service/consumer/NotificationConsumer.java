package com.smiletogether.notificationserver.service.consumer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.smiletogether.notificationserver.service.NotificationService;
import com.smiletogether.notificationserver.service.dto.ChatNotificationPushMessageRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationConsumer {

    private final ObjectMapper objectMapper;
    private final NotificationService notificationService;

    @KafkaListener(topics = "notification-topic", groupId = "notification-server-group")
    public void consumeMessageNotification(ConsumerRecord<String, String> record) {
        String messageJson = record.value();
        try {
            JsonNode jsonNode = objectMapper.readTree(messageJson);
            String workspaceId = jsonNode.get("workspaceId").asText();
            String channelId = jsonNode.get("channelId").asText();
            String content = jsonNode.get("content").asText();
            String senderId = jsonNode.get("user").get("userId").asText();
            String senderName = jsonNode.get("user").get("displayName").asText();
            String token = jsonNode.get("token").asText();

            notificationService.pushChatNotification(
                    ChatNotificationPushMessageRequest.of(workspaceId, channelId, content, senderId, senderName, token)
            );

        } catch (JsonProcessingException e) {
            throw new RuntimeException("메시지를 읽지 못했습니다.");
        }

    }
}
