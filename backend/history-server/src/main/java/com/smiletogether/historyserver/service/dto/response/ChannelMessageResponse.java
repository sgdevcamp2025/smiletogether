package com.smiletogether.historyserver.service.dto.response;

import com.smiletogether.historyserver.domain.document.ChannelMessageDocument;
import com.smiletogether.historyserver.domain.model.Reactions;
import com.smiletogether.historyserver.infrastructure.ExternalProfileResponse;
import com.smiletogether.historyserver.service.dto.WorkspaceProfileDto;
import java.time.LocalDateTime;
import java.util.List;

public record ChannelMessageResponse(
        String messageId,
        WorkspaceProfileDto user,
        String content,
        boolean isUpdated,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        List<Reactions> reactions,
        boolean hasThread,
        int threadCount
) {
    public static ChannelMessageResponse of(ChannelMessageDocument channelMessageDocument,
                                            WorkspaceProfileDto workspaceProfileDto) {
        return new ChannelMessageResponse(
                channelMessageDocument.getId(),
                workspaceProfileDto,
                channelMessageDocument.getContent(),
                channelMessageDocument.isUpdated(),
                channelMessageDocument.getCreatedAt(),
                channelMessageDocument.getUpdatedAt(),
                channelMessageDocument.getReactions(),
                channelMessageDocument.isHasThread(),
                channelMessageDocument.getThreadCount()
        );
    }
}
