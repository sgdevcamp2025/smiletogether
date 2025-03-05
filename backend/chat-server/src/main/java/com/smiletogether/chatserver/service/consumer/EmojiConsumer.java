package com.smiletogether.chatserver.service.consumer;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.smiletogether.chatserver.dto.ChannelMessageReactionDto;
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
            ChannelMessageReactionDto channelMessageReactionDto = objectMapper.readValue(message,
                    ChannelMessageReactionDto.class);
            String formattedJson = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(
                    channelMessageReactionDto);

            if (channelMessageReactionDto.type().equals("CREATE")) {
                messagingTemplate.convertAndSend(
                        "/sub/workspaces/" + channelMessageReactionDto.workspaceId() + "/channels/"
                        + channelMessageReactionDto.channelId(), formattedJson);
            }
            if (channelMessageReactionDto.type().equals("DELETE")) {
                messagingTemplate.convertAndSend(
                        "/sub/workspaces/" + channelMessageReactionDto.workspaceId() + "/channels/"
                        + channelMessageReactionDto.channelId(), formattedJson);
            }
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }

}
