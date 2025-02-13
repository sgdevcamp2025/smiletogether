package com.smiletogether.chatserver.service;

import com.smiletogether.chatserver.service.dto.ChannelChatDto;
import com.smiletogether.chatserver.service.dto.MessageRequest;
import com.smiletogether.chatserver.service.dto.WorkspaceProfileDto;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatService {

  private final SimpMessagingTemplate simpMessagingTemplate;
  private final MessageProducer messageProducer;

  public void testMessage(MessageRequest message) {
    simpMessagingTemplate.convertAndSend("/topic/greeting", message);
  }

  public void sendChannelMessage(Long workspaceId, Long channelId, MessageRequest message) {
    WorkspaceProfileDto senderProfile = initProfile(message.userId());
    ChannelChatDto channelChatDto = createChannelChat(workspaceId, channelId, senderProfile,
        message.content());

    messageProducer.sendMessage(channelChatDto);
  }

  private WorkspaceProfileDto initProfile(Long userId) {
    return new WorkspaceProfileDto(userId, "temp Name", "temp Url");
  }

  private ChannelChatDto createChannelChat(Long workspaceId, Long channelId,
      WorkspaceProfileDto senderProfile, String content) {
    return new ChannelChatDto(workspaceId, channelId, senderProfile, content, LocalDateTime.now(),
        LocalDateTime.now());
  }
}
