package com.smiletogether.chatserver.service;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.smiletogether.chatserver.service.dto.ChannelMessageReaction;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmojiConsumer {
    private final SimpMessagingTemplate messagingTemplate;
    private final ObjectMapper objectMapper;

    @KafkaListener(topics = "chat-topic", groupId = "chat-server-group")
    public void consume(String message) {
        try {
            ChannelMessageReaction channelMessageReaction = objectMapper.readValue(message,
                    ChannelMessageReaction.class);
            String formattedJson = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(channelMessageReaction);

            if (channelMessageReaction.type().equals("CREATE")) {
                messagingTemplate.convertAndSend(
                        "/sub/workspaces/" + channelMessageReaction.workspaceId() + "/channels/"
                        + channelMessageReaction.channelId(), formattedJson);
            }
            if (channelMessageReaction.type().equals("DELETE")) {
                messagingTemplate.convertAndSend(
                        "/sub/workspaces/" + channelMessageReaction.workspaceId() + "/channels/"
                        + channelMessageReaction.channelId(), formattedJson);
            }
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }

}
