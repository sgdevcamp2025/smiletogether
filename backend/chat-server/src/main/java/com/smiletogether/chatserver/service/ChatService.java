package com.smiletogether.chatserver.service;

import com.smiletogether.chatserver.service.dto.MessageDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatService {
    private final SimpMessagingTemplate simpMessagingTemplate;

    public void testMessage(MessageDto message) {
        log.info("Sending message: {}", MessageDto.of(message));
        simpMessagingTemplate.convertAndSend("/topic/greeting", message);
    }
}
