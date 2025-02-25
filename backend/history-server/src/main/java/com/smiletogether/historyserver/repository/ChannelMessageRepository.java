package com.smiletogether.historyserver.repository;

import com.smiletogether.historyserver.domain.document.ChannelMessageDocument;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChannelMessageRepository extends MongoRepository<ChannelMessageDocument, String> {
    List<ChannelMessageDocument> findByWorkspaceIdAndChannelIdAndIsDeletedAndCreatedAtBefore(
            String workspaceId, String channelId, boolean isDeleted, LocalDateTime createdAt, Pageable pageable);

    Optional<ChannelMessageDocument> findById(String messageId);
}
