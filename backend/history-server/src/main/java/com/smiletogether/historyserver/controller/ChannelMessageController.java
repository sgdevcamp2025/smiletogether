package com.smiletogether.historyserver.controller;

import com.smiletogether.historyserver.infrastructure.JwtAuth;
import com.smiletogether.historyserver.service.ChannelMessageService;
import com.smiletogether.historyserver.service.dto.ChannelMessageDeleteRequest;
import com.smiletogether.historyserver.service.dto.ChannelMessageDeleteResponse;
import com.smiletogether.historyserver.service.dto.ChannelMessageReaction;
import com.smiletogether.historyserver.service.dto.ChannelMessageResponse;
import com.smiletogether.historyserver.service.dto.ChannelMessageUpdateRequest;
import com.smiletogether.historyserver.service.dto.ChannelMessages;
import com.smiletogether.historyserver.service.dto.ChannelMessagesRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class ChannelMessageController {

    private final ChannelMessageService channelMessageService;

    @GetMapping("/api/workspaces/{workspaceId}/channels/{channelId}/messages")
    public ChannelMessages getMessages(
            @PathVariable String workspaceId,
            @PathVariable String channelId,
            ChannelMessagesRequest channelMessagesRequest) {
        return channelMessageService.getChannelMessages(channelMessagesRequest, workspaceId, channelId);
    }

    @GetMapping("/api/workspaces/{workspaceId}/channels/{channelId}/{messageId}")
    public ChannelMessageResponse getMessaage(
            @PathVariable String messageId
    ) {
        return channelMessageService.getChannelMessage(messageId);
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
