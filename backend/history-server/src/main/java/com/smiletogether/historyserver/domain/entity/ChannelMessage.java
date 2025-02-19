package com.smiletogether.historyserver.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Builder
@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Slf4j
public class ChannelMessage {
    @Id
    private String id;

    @Column
    private String channelId;

    @Column
    private String senderId;

    @Column
    private String content;

    @Column
    private LocalDateTime createdAt;

    @Column
    private boolean isDeleted;
}
