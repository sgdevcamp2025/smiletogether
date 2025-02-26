package com.smiletogether.chatserver.service;

import com.fasterxml.uuid.Generators;
import com.fasterxml.uuid.impl.TimeBasedGenerator;
import com.smiletogether.chatserver.service.dto.ChannelChatDto;
import com.smiletogether.chatserver.service.dto.ChannelMessageDeleteRequest;
import com.smiletogether.chatserver.service.dto.ChannelMessageDeleteResponse;
import com.smiletogether.chatserver.service.dto.ChannelMessageUpdateRequest;
import com.smiletogether.chatserver.service.dto.ChannelMessageUpdateResponse;
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

    public void sendChannelMessage(String userId, String workspaceId, String channelId, MessageRequest message) {
        WorkspaceProfileDto senderProfile = initProfile(userId);
        ChannelChatDto channelChatDto = createChannelChat(workspaceId, channelId, senderProfile,
                message.content());

        messageProducer.sendMessage(channelChatDto);
    }

    private WorkspaceProfileDto initProfile(String userId) {
        return new WorkspaceProfileDto(userId, "temp Name", "temp Url");
    }

    private ChannelChatDto createChannelChat(String workspaceId, String channelId,
                                             WorkspaceProfileDto senderProfile, String content) {
        String messageId = uuidGenerator();
        return new ChannelChatDto("SEND", messageId, workspaceId, channelId, senderProfile, content, LocalDateTime.now(),
                LocalDateTime.now(), false);
    }

    public void updateChannelMessage(String memberId, String workspaceId,
                                     String channelId, ChannelMessageUpdateRequest channelMessageUpdateRequest) {
        WorkspaceProfileDto senderProfile = initProfile(memberId);
        log.info("서비스 코드 실행");
        messageProducer.updateMessage(channelMessageUpdateRequest,
                ChannelMessageUpdateResponse.of(senderProfile, workspaceId, channelId, channelMessageUpdateRequest));
    }

    public void deleteChannelMessage(String workspaceId, String channelId,
                                     ChannelMessageDeleteRequest channelMessageDeleteRequest) {
        log.info("서비스 코드 실행");
        ChannelMessageDeleteResponse channelMessageDeleteResponse = new ChannelMessageDeleteResponse(
                channelMessageDeleteRequest.type(),
                workspaceId, channelId, channelMessageDeleteRequest.messageId(),
                "200", "메시지가 성공적으로 삭제되었습니다."
        );
        messageProducer.deleteMessage(channelMessageDeleteRequest, channelMessageDeleteResponse);
    }

    private String uuidGenerator() {
        TimeBasedGenerator generator = Generators.timeBasedGenerator();
        return generator.generate().toString();
    }
}
