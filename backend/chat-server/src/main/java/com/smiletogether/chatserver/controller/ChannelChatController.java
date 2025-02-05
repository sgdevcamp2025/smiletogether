package com.smiletogether.chatserver.controller;

import com.smiletogether.chatserver.service.dto.MessageDto;
import com.smiletogether.chatserver.service.ChatService;
import com.smiletogether.chatserver.service.MessageProducer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class ChannelChatController {

    private final ChatService chatService;
    private final MessageProducer messageProducer;

    @MessageMapping("/hello")
    @SendTo("/topic/greeting")
    public void test(MessageDto message) {
        log.info("Received message: {}", MessageDto.of(message));
        chatService.testMessage(message);
    }

    @MessageMapping("/kafka-broad")
    public void sendMessage(@RequestBody MessageDto message) {
        log.info("Received WebSocket Message: {}", message);
        messageProducer.sendMessage(message);
    }
}
