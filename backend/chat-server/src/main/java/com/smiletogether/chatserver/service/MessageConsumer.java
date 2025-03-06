package com.smiletogether.chatserver.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.smiletogether.chatserver.service.dto.ChannelChatDto;
import com.smiletogether.chatserver.service.dto.ChannelMessageDeleteResponse;
import com.smiletogether.chatserver.service.dto.ChannelMessageUpdateResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class MessageConsumer {

    private final SimpMessagingTemplate messagingTemplate;
    private final ObjectMapper objectMapper;

    @KafkaListener(topics = "channel-topic", groupId = "chat-server-group")
    public void consume(String messageJson) {
        log.info("📩 Kafka 수신 메시지: {}", messageJson);
        try {
            JsonNode jsonNode = objectMapper.readTree(messageJson);
            String type = jsonNode.get("type").asText();
            log.info(jsonNode.toString());

            switch (type) {
                case "SEND":
                    handleSendMessage(messageJson);
                    break;

                case "UPDATE":
                    handleUpdateMessage(messageJson);
                    break;

                case "DELETE":
                    handleDeleteMessage(messageJson);
                    break;

                default:
                    log.warn("⚠ Kafka: 알 수 없는 메시지 타입: {}", type);
            }
        } catch (Exception e) {
            log.error("❌ Kafka 메시지 처리 실패", e);
        }
    }

    private void handleSendMessage(String jsonData) throws Exception {
        ChannelChatDto channelChatDto = objectMapper.readValue(jsonData, ChannelChatDto.class);
        log.info("✅ Kafka: 메시지 전송 처리: {}", channelChatDto);

        sendMessageToWebSocket(channelChatDto.workspaceId(), channelChatDto.channelId(), channelChatDto);
    }

    private void handleUpdateMessage(String jsonData) throws Exception {
        ChannelMessageUpdateResponse updateResponse = objectMapper.readValue(jsonData, ChannelMessageUpdateResponse.class);
        log.info("✅ Kafka: 메시지 업데이트 처리: {}", updateResponse);

        sendMessageToWebSocket(updateResponse.workspaceId(), updateResponse.channelId(), updateResponse);
    }

    private void handleDeleteMessage(String jsonData) throws Exception {
        ChannelMessageDeleteResponse deleteResponse = objectMapper.readValue(jsonData, ChannelMessageDeleteResponse.class);
        log.info("✅ Kafka: 메시지 삭제 처리: {}", deleteResponse);

        sendMessageToWebSocket(deleteResponse.workspaceId(), deleteResponse.channelId(), deleteResponse);
    }


    private void sendMessageToWebSocket(String workspaceId, String channelId, Object dto) throws Exception {
        String formattedJson = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(dto);
        log.info("formatted json: {}", formattedJson);
        messagingTemplate.convertAndSend(
                "/sub/workspaces/" + workspaceId + "/channels/" + channelId,
                formattedJson
        );
    }
}