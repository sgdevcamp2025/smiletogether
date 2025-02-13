package com.smiletogether.chatserver.controller;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import com.smiletogether.chatserver.service.ChatService;
import com.smiletogether.chatserver.service.dto.MessageRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class ChannelChatControllerTest {

  @Mock
  private ChatService chatService;

  @InjectMocks
  private ChannelChatController channelChatController;

  private MessageRequest messageRequest;

  @BeforeEach
  void setUp() {
    messageRequest = new MessageRequest(1L, "test 메시지 입니다.");
  }

  @Test
  void sendChannelMessage_호출시_ChatService_메서드가_호출된다() {
    Long workspaceId = 1L;
    Long channelId = 2L;

    channelChatController.sendChannelMessage(workspaceId, channelId, messageRequest);

    verify(chatService, times(1)).sendChannelMessage(workspaceId, channelId, messageRequest);
  }
}
