package com.smiletogether.chatserver.service;

import com.smiletogether.chatserver.service.dto.MessageDto;
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

    // 💡 Kafka 메시지를 MessageDto 객체로 직접 받을 수 있도록 변경
    @KafkaListener(topics = "test-topic", groupId = "test-group")
    public void consume(MessageDto message) {
        log.info("Received Message from Kafka: {}", message);

        // WebSocket을 통해 클라이언트에게 메시지 전송
        messagingTemplate.convertAndSend("/topic/public", message);
    }
}
