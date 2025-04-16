package com.smiletogether.chatserver.service.producer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.smiletogether.chatserver.dto.ChannelMessageDeleteDto;
import com.smiletogether.chatserver.dto.ChannelMessageDto;
import com.smiletogether.chatserver.dto.ChannelMessageUpdateDto;
import com.smiletogether.chatserver.dto.request.ChannelMessageDeleteRequest;
import com.smiletogether.chatserver.dto.request.ChannelMessageUpdateKafkaRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class MessageProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;

    private static final String CHAT_TOPIC = "channel-topic";
    private static final String HISTORY_TOPIC = "history-topic";

    public void sendMessage(ChannelMessageDto dto) {
        try {
            String key = dto.channelId(); // ✅ key = channelId
            String json = objectMapper.writeValueAsString(dto);

            log.info("Kafka send (key = {}, topic = {}): {}", key, CHAT_TOPIC, json);
            kafkaTemplate.send(CHAT_TOPIC, key, json);
            kafkaTemplate.send(HISTORY_TOPIC, key, json);

        } catch (Exception e) {
            log.error("❌ Failed to send message", e);
        }
    }

    public void updateMessage(ChannelMessageUpdateKafkaRequest req, ChannelMessageUpdateDto dto) {
        try {
            String key = dto.channelId(); // ✅ 동일하게 channelId 기준
            String jsonForChat = objectMapper.writeValueAsString(dto);
            String jsonForHistory = objectMapper.writeValueAsString(req);

            log.info("Kafka update (key = {}, topic = {}): {}", key, CHAT_TOPIC, jsonForChat);
            kafkaTemplate.send(CHAT_TOPIC, key, jsonForChat);
            kafkaTemplate.send(HISTORY_TOPIC, key, jsonForHistory);

        } catch (Exception e) {
            log.error("❌ Failed to send update message", e);
        }
    }

    public void deleteMessage(ChannelMessageDeleteRequest req, ChannelMessageDeleteDto dto) {
        try {
            String key = dto.channelId(); // ✅ 역시 key 지정
            String jsonForChat = objectMapper.writeValueAsString(dto);
            String jsonForHistory = objectMapper.writeValueAsString(req);

            log.info("Kafka delete (key = {}, topic = {}): {}", key, CHAT_TOPIC, jsonForChat);
            kafkaTemplate.send(CHAT_TOPIC, key, jsonForChat);
            kafkaTemplate.send(HISTORY_TOPIC, key, jsonForHistory);

        } catch (Exception e) {
            log.error("❌ Failed to send delete message", e);
        }
    }
}
