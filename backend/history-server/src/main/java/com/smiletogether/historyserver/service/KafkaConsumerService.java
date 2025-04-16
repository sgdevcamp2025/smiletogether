package com.smiletogether.historyserver.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.smiletogether.historyserver.service.dto.ChannelMessageReaction;
import com.smiletogether.historyserver.service.dto.request.ChannelMessageDeleteRequest;
import com.smiletogether.historyserver.service.dto.request.ChannelMessageSaveRequest;
import com.smiletogether.historyserver.service.dto.request.ChannelMessageUpdateRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaConsumerService {

    private final ObjectMapper objectMapper;
    private final ChannelMessageService channelMessageService;

    @KafkaListener(topics = "history-topic", groupId = "history-server-group")
    public void consumeChannelMessage(ConsumerRecord<String, String> record) {
        String messageJson = record.value();

        log.info("[Kafka][history-topic] partition: {}, offset: {}, key: {}, topic: {}",
                record.partition(), record.offset(), record.key(), record.topic());
        log.info("Raw message: {}", messageJson);

        try {
            JsonNode jsonNode = objectMapper.readTree(messageJson);
            String type = jsonNode.get("type").asText();

            switch (type) {
                case "SEND" -> {
                    ChannelMessageSaveRequest saveRequest = objectMapper.readValue(messageJson,
                            ChannelMessageSaveRequest.class);
                    channelMessageService.saveMessage(saveRequest);
                    log.info("Message saved (messageId: {})",
                            saveRequest.messageId());
                }
                case "UPDATE" -> {
                    ChannelMessageUpdateRequest updateRequest = objectMapper.readValue(messageJson,
                            ChannelMessageUpdateRequest.class);
                    channelMessageService.updateChannelMessage(updateRequest);
                    log.info("Message updated (messageId: {})",
                            updateRequest.messageId());
                }
                case "DELETE" -> {
                    ChannelMessageDeleteRequest deleteRequest = objectMapper.readValue(messageJson,
                            ChannelMessageDeleteRequest.class);
                    channelMessageService.deleteChannelMessage(deleteRequest);
                    log.info("Message deleted (messageId: {})",
                            deleteRequest.messageId());
                }
                default -> log.warn("Unknown message type: {}", type);
            }
        } catch (Exception e) {
            log.error("Failed to process message: {}", messageJson, e);
        }
    }

    @KafkaListener(topics = "channel-message-reaction", groupId = "history-group")
    public void consumeEmojiReaction(ConsumerRecord<String, String> record) {
        String messageJson = record.value();

        log.info("[Kafka][reaction-topic] partition: {}, offset: {}, key: {}, topic: {}",
                record.partition(), record.offset(), record.key(), record.topic());
        log.info("Raw reaction message: {}", messageJson);

        try {
            ChannelMessageReaction reaction = objectMapper.readValue(messageJson, ChannelMessageReaction.class);
            String type = reaction.type();

            switch (type) {
                case "CREATE" -> {
                    channelMessageService.createChannelMessageReaction(reaction);
                }
                case "DELETE" -> {
                    channelMessageService.deleteChannelMessageReaction(reaction);
                }
                default -> log.warn("Unknown reaction type: {}", type);
            }
        } catch (Exception e) {
            log.error("Failed to process reaction message: {}", messageJson, e);
        }
    }
}
