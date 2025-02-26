package com.smiletogether.historyserver.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.smiletogether.historyserver.service.dto.ChannelMessageDeleteRequest;
import com.smiletogether.historyserver.service.dto.ChannelMessageReaction;
import com.smiletogether.historyserver.service.dto.ChannelMessageSaveRequest;
import com.smiletogether.historyserver.service.dto.ChannelMessageUpdateRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaConsumerService {
    private final ObjectMapper objectMapper;
    private final ChannelMessageService channelMessageService;

    @KafkaListener(topics = "history-topic", groupId = "history-server-group")
    public void consumeChannelMessage(String messageJson) {
        try {
            JsonNode jsonNode = objectMapper.readTree(messageJson);
            String type = jsonNode.get("type").asText();
            log.info("Received channel message: {}", messageJson);

            switch (type) {
                case "SEND":
                    ChannelMessageSaveRequest saveRequest = objectMapper.readValue(messageJson, ChannelMessageSaveRequest.class);
                    channelMessageService.saveMessage(saveRequest);
                    log.info("Kafka: 메시지 저장 성공");
                    break;

                case "UPDATE":
                    ChannelMessageUpdateRequest updateRequest = objectMapper.readValue(messageJson, ChannelMessageUpdateRequest.class);
                    channelMessageService.updateChannelMessage(updateRequest);
                    log.info("Kafka: 메시지 업데이트 성공");
                    break;

                case "DELETE":
                    ChannelMessageDeleteRequest deleteRequest = objectMapper.readValue(messageJson, ChannelMessageDeleteRequest.class);
                    channelMessageService.deleteChannelMessage(deleteRequest);
                    log.info("Kafka: 메시지 삭제 성공");
                    break;

                default:
                    log.warn("⚠Kafka: 알 수 없는 메시지 타입: {}", type);
            }
        } catch (Exception e) {
            log.error("Kafka: 메시지 처리 실패", e);
        }
    }


    @KafkaListener(topics = "channel-message-reaction", groupId = "history-group")
    public void consumeEmojiReaction(String messageJson) {
        try {
            ChannelMessageReaction channelMessageReaction = objectMapper.readValue(messageJson, ChannelMessageReaction.class);

            String type = channelMessageReaction.type();
            if (type.equals("CREATE")) {
                channelMessageService.createChannelMessageReaction(channelMessageReaction);
                log.info("성공");
            }

            if (type.equals("DELETE")) {
                channelMessageService.deleteChannelMessageReaction(channelMessageReaction);
                log.info("성공");
            }

        } catch (Exception e) {
            log.error("Failed to deserialize Kafka message", e);
        }
    }
}
