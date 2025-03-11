package com.smiletogether.chatserver.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;

public record ChannelMessageDto(
        @JsonProperty("type") String type,
        @JsonProperty("messageId") String messageId,
        @JsonProperty("workspaceId") String workspaceId,
        @JsonProperty("channelId") String channelId,
        @JsonProperty("user") WorkspaceProfileDto user,
        @JsonProperty("content") String content,

        @JsonProperty("createdAt")
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSSSS")
        LocalDateTime createdAt,

        @JsonProperty("updatedAt")
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSSSS")
        LocalDateTime updatedAt,

        @JsonProperty("isUpdated") boolean isUpdated
) {

}
