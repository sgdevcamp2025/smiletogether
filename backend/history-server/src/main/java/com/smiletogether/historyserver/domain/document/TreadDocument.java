package com.smiletogether.historyserver.domain.document;

import com.fasterxml.uuid.Generators;
import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Builder
@Document(collection = "threads")
public class TreadDocument {
    @Id
    private String id;
    String authorId;
    String content;

    @Builder.Default
    private List<ReactionDocument> reactionDocuments = new ArrayList<>();
}
