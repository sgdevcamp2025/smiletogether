package com.smiletogether.historyserver.domain.document;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.uuid.Generators;
import com.smiletogether.historyserver.domain.model.Reactions;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Builder
@Document(collection = "channel_messages")
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class ChannelMessageDocument {
    @Id
    private String id;

    private String senderId;
    private String workspaceId;
    private String channelId;
    private String content;  // 메시지 내용

    @Builder.Default
    private boolean isDeleted = false;

    @Builder.Default
    private boolean isUpdated = false;

    @JsonProperty("createdAt")
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private LocalDateTime createdAt;  // 메시지 생성 시간

    private LocalDateTime updatedAt;  // 수정 시간 (nullable)

    @Builder.Default
    private List<Reactions> reactions = new ArrayList<>();  // 메시지 반응 리스트

    @Builder.Default
    private boolean isHasThread = false;  // 스레드 여부

    @Builder.Default
    private int threadCount = 0;  // 스레드 개수

    @Builder.Default
    private List<TreadDocument> treads = new ArrayList<>();
}
