package com.smiletogether.chatserver.service;

import com.fasterxml.uuid.Generators;
import com.fasterxml.uuid.impl.TimeBasedGenerator;
import com.smiletogether.chatserver.dto.ChannelMessageDeleteDto;
import com.smiletogether.chatserver.dto.ChannelMessageDto;
import com.smiletogether.chatserver.dto.ChannelMessageUpdateDto;
import com.smiletogether.chatserver.dto.WorkspaceProfileDto;
import com.smiletogether.chatserver.dto.request.ChannelMessageDeleteRequest;
import com.smiletogether.chatserver.dto.request.ChannelMessageRequest;
import com.smiletogether.chatserver.dto.request.ChannelMessageUpdateKafkaRequest;
import com.smiletogether.chatserver.dto.request.ChannelMessageUpdateRequest;
import com.smiletogether.chatserver.infrastructure.ExternalProfileApiClient;
import com.smiletogether.chatserver.service.producer.MessageProducer;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatService {
    private final MessageProducer messageProducer;
    private final ExternalProfileApiClient externalProfileApiClient;

    public void sendChannelMessage(String token, String userId, String workspaceId, String channelId,
                                   ChannelMessageRequest message) {
        log.info("---------------------------------------------------------------");
        WorkspaceProfileDto senderProfile = initProfile(token, workspaceId, userId);
        ChannelMessageDto channelMessageDto = createChannelChat(workspaceId, channelId, senderProfile,
                message.content());
        messageProducer.sendMessage(channelMessageDto);
    }

    private WorkspaceProfileDto initProfile(String token, String workspaceId, String userId) {
        log.info("Initializing workspace profile");
        return externalProfileApiClient.getWorkspaceProfile(token, workspaceId, userId);
    }

    private ChannelMessageDto createChannelChat(String workspaceId, String channelId,
                                                WorkspaceProfileDto senderProfile, String content) {
        String messageId = uuidGenerator();
        return new ChannelMessageDto("SEND", messageId, workspaceId, channelId, senderProfile, content,
                LocalDateTime.now(),
                LocalDateTime.now(), false);
    }

    public void updateChannelMessage(String token, String memberId, String workspaceId,
                                     String channelId, ChannelMessageUpdateRequest channelMessageUpdateRequest) {
        WorkspaceProfileDto senderProfile = initProfile(token, workspaceId, memberId);
        LocalDateTime currentTime = LocalDateTime.now();
        log.info("채팅 업데이트 코드 실행");
        messageProducer.updateMessage(ChannelMessageUpdateKafkaRequest.of(channelMessageUpdateRequest, currentTime),
                ChannelMessageUpdateDto.of(senderProfile, workspaceId, channelId, channelMessageUpdateRequest,
                        currentTime));
    }

    public void deleteChannelMessage(String workspaceId, String channelId,
                                     ChannelMessageDeleteRequest channelMessageDeleteRequest) {
        log.info("채팅 삭제 코드 실행");

        ChannelMessageDeleteDto channelMessageDeleteDto = new ChannelMessageDeleteDto(
                channelMessageDeleteRequest.type(),
                workspaceId, channelId, channelMessageDeleteRequest.messageId(),
                "200", "메시지가 성공적으로 삭제되었습니다."
        );
        messageProducer.deleteMessage(channelMessageDeleteRequest, channelMessageDeleteDto);
    }

    private String uuidGenerator() {
        TimeBasedGenerator generator = Generators.timeBasedGenerator();
        return generator.generate().toString();
    }
}
