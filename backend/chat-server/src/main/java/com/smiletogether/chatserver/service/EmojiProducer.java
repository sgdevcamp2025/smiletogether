package com.smiletogether.chatserver.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.smiletogether.chatserver.service.dto.ChannelMessageReaction;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmojiProducer {
    private final KafkaTemplate<String, String> kafkaTemplate; // JSON을 문자열로 전송
    private final ObjectMapper objectMapper; // 주입받도록 변경
    private static final String CHAT_TOPIC = "chat-topic";
    private static final String HISTORY_TOPIC = "channel-message";


    public void createEmoji(ChannelMessageReaction reaction) {
        try {
            String jsonMessage = objectMapper.writeValueAsString(reaction);
            kafkaTemplate.send(CHAT_TOPIC, jsonMessage);
            kafkaTemplate.send(HISTORY_TOPIC, jsonMessage);
        } catch (Exception e) {
            log.error("serialize에 실패했습니다.", e);
        }
    }

    public void deleteEmoji(ChannelMessageReaction reaction) {
        try {
            String jsonMessage = objectMapper.writeValueAsString(reaction);
            kafkaTemplate.send(CHAT_TOPIC, jsonMessage);
            kafkaTemplate.send(HISTORY_TOPIC, jsonMessage);
        } catch (Exception e) {
            log.error("serialize에 실패했습니다.", e);
        }
    }
}
