package com.smiletogether.notificationserver.domain;

import com.fasterxml.uuid.Generators;
import com.fasterxml.uuid.impl.TimeBasedGenerator;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Document(collection = "notifications")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class NotificationDocument {

    @Id
    private String id;

    @Field(value = "workspace_id", write = Field.Write.NON_NULL)
    private String workspaceId;

    @Field(value = "channel_id", write = Field.Write.NON_NULL)
    private String channelId;

    @Field("receiver_id")
    private String receiverId;

    @Field(value = "sender_id", write = Field.Write.NON_NULL)
    private String senderId;

    @Field("type")
    private NotificationType type;

    @Field("content")
    private String content;

    @Field("created_at")
    private LocalDateTime createdAt;

    public static NotificationDocument ofSystem(String receiverId, String content) {
        return new NotificationDocument(
                generateUUID(),
                null,
                null,
                receiverId,
                null,
                NotificationType.SYSTEM_ALERT,
                content,
                LocalDateTime.now()
        );
    }

    public static NotificationDocument ofMessage(String workspaceId, String channelId, String receiverId,
            String senderId, String content) {
        return new NotificationDocument(
                generateUUID(),
                workspaceId,
                channelId,
                receiverId,
                senderId,
                NotificationType.MESSAGE,
                content,
                LocalDateTime.now()
        );
    }

    private static String generateUUID() {
        TimeBasedGenerator generator = Generators.timeBasedGenerator();
        return generator.generate().toString();
    }
}
