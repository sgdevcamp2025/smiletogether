package com.smiletogether.historyserver.domain.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Builder
@Document(collection = "channel_message_Reaction")
@NoArgsConstructor
@AllArgsConstructor
public class ReactionDocument {
    private String messageId;
    private String emoji;
    private String memberId;
}
