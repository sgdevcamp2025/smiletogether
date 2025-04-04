package com.smiletogether.chatserver.controller;

import com.smiletogether.chatserver.dto.ChannelMessageReactionDto;
import com.smiletogether.chatserver.dto.request.ChannelMessageDeleteRequest;
import com.smiletogether.chatserver.dto.request.ChannelMessageRequest;
import com.smiletogether.chatserver.dto.request.ChannelMessageUpdateRequest;
import com.smiletogether.chatserver.infrastructure.JwtExtractor;
import com.smiletogether.chatserver.service.ChatService;
import com.smiletogether.chatserver.service.EmojiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class ChannelChatController {

    private final ChatService chatService;
    private final EmojiService emojiService;

    @MessageMapping("/workspaces/{workspaceId}/channels/{channelId}")
    public void sendChannelMessage(
            @DestinationVariable("workspaceId") String workspaceId,
            @DestinationVariable("channelId") String channelId,
            StompHeaderAccessor headerAccessor,
            ChannelMessageRequest message) {
        JwtExtractor jwtExtractor = new JwtExtractor();
        String userId = jwtExtractor.extractMemberId(headerAccessor);
        String token = jwtExtractor.getToken(headerAccessor);
        chatService.sendChannelMessage(token, userId, workspaceId, channelId, message);
    }

    @MessageMapping("/workspaces/{workspaceId}/channels/{channelId}/update")
    public void updateChannelMessage(
            @DestinationVariable("workspaceId") String workspaceId,
            @DestinationVariable("channelId") String channelId,
            StompHeaderAccessor headerAccessor,
            ChannelMessageUpdateRequest channelMessageUpdateRequest) {
        JwtExtractor jwtExtractor = new JwtExtractor();
        String memberId = jwtExtractor.extractMemberId(headerAccessor);
        String token = jwtExtractor.getToken(headerAccessor);
        log.info("update controller 실행");
        chatService.updateChannelMessage(token, memberId, workspaceId, channelId, channelMessageUpdateRequest);
    }

    @MessageMapping("/workspaces/{workspaceId}/channels/{channelId}/delete")
    public void deleteChannelMessage(
            @DestinationVariable("workspaceId") String workspaceId,
            @DestinationVariable("channelId") String channelId,
            StompHeaderAccessor headerAccessor,
            ChannelMessageDeleteRequest channelMessageDeleteRequest
    ) {
        JwtExtractor jwtExtractor = new JwtExtractor();
        String memberId = jwtExtractor.extractMemberId(headerAccessor);
        log.info("delete controller 실행");
        chatService.deleteChannelMessage(workspaceId, channelId, channelMessageDeleteRequest);
    }

    @MessageMapping("/channels/{channelId}/reaction")
    public void channelMessageReaction(
            @DestinationVariable("channelId") String channelId,
            StompHeaderAccessor headerAccessor,
            ChannelMessageReactionDto channelMessageReactionDto
    ) {
        emojiService.sendEmoji(channelMessageReactionDto);
    }
}
