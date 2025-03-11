package com.smiletogether.historyserver.controller;

import com.smiletogether.historyserver.infrastructure.JwtExtractor;
import com.smiletogether.historyserver.service.ChannelMessageService;
import com.smiletogether.historyserver.service.dto.response.ChannelMessageResponse;
import com.smiletogether.historyserver.service.dto.ChannelMessages;
import com.smiletogether.historyserver.service.dto.request.ChannelMessagesRequest;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class ChannelMessageController {

    private final ChannelMessageService channelMessageService;
    private final JwtExtractor jwtExtractor;

    @GetMapping("/api/workspaces/{workspaceId}/channels/{channelId}/messages")
    public ChannelMessages getMessages(
            @PathVariable String workspaceId,
            @PathVariable String channelId,
            ChannelMessagesRequest channelMessagesRequest,
            HttpServletRequest httpServletRequest
    ) {
        String token = jwtExtractor.getToken(httpServletRequest);
        if (token == null) {
            throw new RuntimeException("Missing or invalid token");
        }
        log.info("Extracted token: {}", token);
        return channelMessageService.getChannelMessages(channelMessagesRequest, workspaceId, channelId, token);
    }

    @GetMapping("/api/workspaces/{workspaceId}/channels/{channelId}/{messageId}")
    public ChannelMessageResponse getMessage(
            @PathVariable String workspaceId,
            @PathVariable String channelId,
            @PathVariable String messageId,
            HttpServletRequest httpServletRequest
    ) {
        String token = jwtExtractor.getToken(httpServletRequest);
        if (token == null) {
            throw new RuntimeException("Missing or invalid token");
        }
        return channelMessageService.getChannelMessage(messageId, token);
    }

//    @PatchMapping("/api/workspaces/{workspaceId}/channels/{channelId}")
//    public ChannelMessageResponse updateMessage(
//            ChannelMessageUpdateRequest channelMessageUpdateRequest
//    ) {
//        return channelMessageService.updateChannelMessage(channelMessageUpdateRequest);
//    }
//
//    @DeleteMapping("/api/workspaces/{workspaceId}/channels/{channelId}")
//    public ChannelMessageDeleteResponse deleteChannelMessage(
//            ChannelMessageDeleteRequest channelMessageDeleteRequest
//    ) {
//        return channelMessageService.deleteChannelMessage(channelMessageDeleteRequest);
//    }
//
//    @PostMapping("/api/workspaces/{workspaceId}/channels/{channelId}/Reaction")
//    public ChannelMessageResponse createChannelMessageReaction(
//            @RequestBody ChannelMessageReaction channelMessageReaction
//    ) {
//        return channelMessageService.createChannelMessageReaction(channelMessageReaction);
//    }
//
//    @DeleteMapping("/api/workspaces/{workspaceId}/channels/{channelId}/Reaction")
//    public ChannelMessageResponse deleteChannelMessageReaction(
//            @RequestBody ChannelMessageReaction channelMessageReaction
//    ) {
//        return channelMessageService.deleteChannelMessageReaction(channelMessageReaction);
//    }
}
