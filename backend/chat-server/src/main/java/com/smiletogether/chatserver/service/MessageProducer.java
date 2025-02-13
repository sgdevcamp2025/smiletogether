package com.smiletogether.chatserver.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.smiletogether.chatserver.service.dto.ChannelChatDto;
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
    private static final String TOPIC = "chat-topic";

    public void sendMessage(ChannelChatDto channelChatDto) {
        try {
            String jsonMessage = objectMapper.writeValueAsString(channelChatDto); // 객체 -> JSON 변환
            log.info("Sending message to Kafka as JSON: {}", jsonMessage);
            kafkaTemplate.send(TOPIC, jsonMessage); // JSON 문자열로 Kafka에 전송
        } catch (Exception e) {
            log.error("Failed to serialize message", e);
        }
    }
}
