package com.smiletogether.chatserver.controller;

import com.smiletogether.chatserver.service.ChatService;
import com.smiletogether.chatserver.service.MessageProducer;
import com.smiletogether.chatserver.service.dto.MessageRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class ChannelChatController {

    private final ChatService chatService;
    private final MessageProducer messageProducer;

    @MessageMapping("/hello")
    @SendTo("/topic/greeting")
    public void test(MessageRequest message) {
        chatService.testMessage(message);
    }

    @MessageMapping("/workspaces/{workspaceId}/channels/{channelId}")
    public void sendChannelMessage(
            @DestinationVariable("workspaceId") Long workspaceId,
            @DestinationVariable("channelId") Long channelId,
            MessageRequest message) {
        chatService.sendChannelMessage(workspaceId, channelId, message);
    }
}
