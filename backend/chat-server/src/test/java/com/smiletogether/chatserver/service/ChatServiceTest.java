package com.smiletogether.chatserver.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import com.smiletogether.chatserver.service.dto.ChannelChatDto;
import com.smiletogether.chatserver.service.dto.MessageRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.messaging.simp.SimpMessagingTemplate;

@ExtendWith(MockitoExtension.class)
class ChatServiceTest {

  @Mock
  private SimpMessagingTemplate simpMessagingTemplate;

  @Mock
  private MessageProducer messageProducer;

  @InjectMocks
  private ChatService chatService;

  private MessageRequest messageRequest;

  @BeforeEach
  void setUp() {
    messageRequest = new MessageRequest(1L, "테스트 메시지입니다.");
  }

  @Test
  void sendChannelSendMessage_메시지_전송_테스트() {
    // Given
    Long workspaceId = 1L;
    Long channelId = 2L;

    // When
    chatService.sendChannelMessage(workspaceId, channelId, messageRequest);

    // Then
    verify(messageProducer, times(1)).sendMessage(any(ChannelChatDto.class));
  }
}
