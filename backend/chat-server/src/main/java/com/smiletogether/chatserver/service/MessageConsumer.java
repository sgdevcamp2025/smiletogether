package com.smiletogether.chatserver.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.smiletogether.chatserver.service.dto.ChannelChatDto;
import com.smiletogether.chatserver.service.dto.MessageResponse;
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
  private final ObjectMapper objectMapper; // JSON 변환 객체 추가

  @KafkaListener(topics = "chat-topic", groupId = "chat-server-group", containerFactory = "kafkaListenerContainerFactory")
  public void consume(String messageJson) {
    try {
      // JSON 문자열을 ChannelChatDto 객체로 변환
      ChannelChatDto channelChatDto = objectMapper.readValue(messageJson, ChannelChatDto.class);
      log.info("Received Message from Kafka: {}", channelChatDto);

      MessageResponse message = new MessageResponse(
          channelChatDto.user(),
          channelChatDto.content(),
          channelChatDto.createdAt(),
          channelChatDto.updatedAt()
      );

      // WebSocket을 통해 클라이언트에게 메시지 전송
      // JSON을 직접 변환하여 WebSocket으로 전송
      String formattedJson = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(message);

      messagingTemplate.convertAndSend(
          "/sub/workspaces/" + channelChatDto.workspaceId() + "/channels/" + channelChatDto.channelId(),
          formattedJson
      );

    } catch (Exception e) {
      log.error("Failed to deserialize Kafka message", e);
    }
  }
}
