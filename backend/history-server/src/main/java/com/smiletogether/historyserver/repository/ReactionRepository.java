package com.smiletogether.historyserver.repository;

import com.smiletogether.historyserver.domain.document.ReactionDocument;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReactionRepository extends MongoRepository<ReactionDocument, String> {
    List<ReactionDocument> findAllByMessageId(String messageId);
    Optional<ReactionDocument> findByMessageIdAndEmojiAndMemberId(String messageId, String Emoji, String MemberId);
}
