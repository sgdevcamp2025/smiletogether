package com.smiletogether.chatserver.service.producer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.smiletogether.chatserver.dto.ChannelMessageDeleteDto;
import com.smiletogether.chatserver.dto.ChannelMessageDto;
import com.smiletogether.chatserver.dto.ChannelMessageUpdateDto;
import com.smiletogether.chatserver.dto.request.ChannelMessageDeleteRequest;
import com.smiletogether.chatserver.dto.request.ChannelMessageUpdateKafkaRequest;
import com.smiletogether.chatserver.dto.request.ChannelMessageUpdateRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class MessageProducer {

    private final KafkaTemplate<String, String> kafkaTemplate; // JSON을 문자열로 전송
    private final ObjectMapper objectMapper; // 주입받도록 변경
    private static final String CHAT_TOPIC = "channel-topic";
    private static final String HISTORY_TOPIC = "history-topic";

    public void sendMessage(ChannelMessageDto channelMessageDto) {
        try {
            String jsonMessage = objectMapper.writeValueAsString(channelMessageDto); // 객체 -> JSON 변환
            log.info("Sending message to Kafka as JSON: {}", jsonMessage);
            kafkaTemplate.send(CHAT_TOPIC, jsonMessage); // JSON 문자열로 Kafka에 전송
            kafkaTemplate.send(HISTORY_TOPIC, jsonMessage);

        } catch (Exception e) {
            log.error("Failed to serialize message", e);
        }
    }

    public void updateMessage(ChannelMessageUpdateKafkaRequest channelMessageUpdateRequest,
                              ChannelMessageUpdateDto channelMessageUpdateDto) {
        try {
            String jsonMessage = objectMapper.writeValueAsString(channelMessageUpdateDto); // 객체 -> JSON 변환
            log.info("Sending message to Kafka as JSON: {}", jsonMessage);
            kafkaTemplate.send(CHAT_TOPIC, jsonMessage);

            jsonMessage = objectMapper.writeValueAsString(channelMessageUpdateRequest);
            kafkaTemplate.send(HISTORY_TOPIC, jsonMessage);
        } catch (Exception e) {
            log.error("Failed to serialize message", e);
        }
    }

    public void deleteMessage(ChannelMessageDeleteRequest channelMessageDeleteRequest,
                              ChannelMessageDeleteDto channelMessageDeleteDto) {
        try {
            String jsonMessage = objectMapper.writeValueAsString(channelMessageDeleteDto); // 객체 -> JSON 변환
            log.info("Sending message to Kafka as JSON: {}", jsonMessage);
            kafkaTemplate.send(CHAT_TOPIC, jsonMessage);

            jsonMessage = objectMapper.writeValueAsString(channelMessageDeleteRequest); // 객체 -> JSON 변환
            log.info("Sending message to Kafka as JSON: {}", jsonMessage);
            kafkaTemplate.send(HISTORY_TOPIC, jsonMessage);
        } catch (Exception e) {
            log.error("Failed to serialize message", e);
        }
    }
}
