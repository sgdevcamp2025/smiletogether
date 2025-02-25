package com.smiletogether.historyserver.service;

import com.smiletogether.historyserver.domain.document.ChannelMessageDocument;
import com.smiletogether.historyserver.domain.document.ReactionDocument;
import com.smiletogether.historyserver.domain.model.Reactions;
import com.smiletogether.historyserver.repository.ChannelMessageRepository;
import com.smiletogether.historyserver.repository.ReactionRepository;
import com.smiletogether.historyserver.service.dto.ChannelMessageDeleteRequest;
import com.smiletogether.historyserver.service.dto.ChannelMessageDeleteResponse;
import com.smiletogether.historyserver.service.dto.ChannelMessageReaction;
import com.smiletogether.historyserver.service.dto.ChannelMessageResponse;
import com.smiletogether.historyserver.service.dto.ChannelMessageSaveRequest;
import com.smiletogether.historyserver.service.dto.ChannelMessageUpdateRequest;
import com.smiletogether.historyserver.service.dto.ChannelMessages;
import com.smiletogether.historyserver.service.dto.ChannelMessagesRequest;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChannelMessageService {

    private final ChannelMessageRepository channelMessageRepository;
    private final ReactionRepository reactionRepository;
    private final static String SUCCESSES_DELETE_MESSAGE = "메세지를 성공적으로 삭제했습니다.";

    private ChannelMessageDocument findMessageById(String messageId) {
        ChannelMessageDocument channelMessageDocument = channelMessageRepository.findById(messageId)
                .orElseThrow(() -> new RuntimeException("메세지를 찾을 수 없습니다."));
        return channelMessageDocument;
    }

    private ReactionDocument findReactionById(String messageId, String emoji, String memberId) {
        ReactionDocument reactionDocument = reactionRepository.findByMessageIdAndEmojiAndMemberId(messageId, emoji, memberId)
                .orElseThrow(() -> new RuntimeException("리액션을 찾을 수 없습니다."));
        return reactionDocument;
    }

    public ChannelMessages getChannelMessages(ChannelMessagesRequest channelMessagesRequest, String workspaceId,
            String channelId) {
        log.info("📌 요청받은 afterTime: {}", channelMessagesRequest.lastTimeStamp());

        LocalDateTime afterTime = channelMessagesRequest.lastTimeStamp();
        log.info("📌 변환된 afterTime (LocalDateTime): {}", afterTime);

        List<ChannelMessageDocument> channelMessageDocuments = channelMessageRepository.findByWorkspaceIdAndChannelIdAndIsDeletedAndCreatedAtBefore(
                workspaceId, channelId, false, afterTime, PageRequest.of(0, 20, Sort.by(Direction.DESC, "createdAt"))
        );

        log.info("📌 검색된 메시지 개수: {}", channelMessageDocuments.size());

        if (channelMessageDocuments.isEmpty()) {
            log.warn("❌ 메시지를 찾을 수 없음.");
        }

        Map<String, List<ChannelMessageResponse>> groupedMessages = new LinkedHashMap<>();

        for (ChannelMessageDocument messageDoc : channelMessageDocuments) {
            ChannelMessageResponse messageResponse = ChannelMessageResponse.of(messageDoc);
            String dateKey = formatDate(messageResponse.createdAt());

            groupedMessages.computeIfAbsent(dateKey, k -> new ArrayList<>()).add(messageResponse);
        }

        return new ChannelMessages(channelId, groupedMessages);
    }

    public void saveMessage(ChannelMessageSaveRequest channelMessage) {
        ChannelMessageDocument newMessage = ChannelMessageDocument.builder()
                .channelId(channelMessage.channelId())
                .senderId("1")
                .content(channelMessage.content())
                .createdAt(channelMessage.createdAt())
                .build();

        channelMessageRepository.save(newMessage);
    }

    public ChannelMessageResponse getChannelMessage(String messageId) {
        ChannelMessageDocument channelMessageDocument = findMessageById(messageId);
        return ChannelMessageResponse.of(channelMessageDocument);
    }

    public ChannelMessageResponse updateChannelMessage(ChannelMessageUpdateRequest channelMessageUpdateRequest) {
        ChannelMessageDocument channelMessageDocument = findMessageById(channelMessageUpdateRequest.messageId());
        channelMessageDocument = ChannelMessageDocument.builder()
                .id(channelMessageDocument.getId())
                .senderId(channelMessageDocument.getSenderId())
                .workspaceId(channelMessageDocument.getWorkspaceId())
                .channelId(channelMessageDocument.getChannelId())
                .content(channelMessageUpdateRequest.content())
                .isDeleted(false)
                .isUpdated(channelMessageDocument.isUpdated())
                .createdAt(channelMessageDocument.getCreatedAt())
                .updatedAt(LocalDateTime.now())
                .reactions(channelMessageDocument.getReactions())
                .isHasThread(channelMessageDocument.isHasThread())
                .threadCount(channelMessageDocument.getThreadCount())
                .treads(channelMessageDocument.getTreads())
                .build();

        channelMessageRepository.save(channelMessageDocument);

        return  ChannelMessageResponse.of(channelMessageDocument);
    }

    public ChannelMessageDeleteResponse deleteChannelMessage(ChannelMessageDeleteRequest channelMessageDeleteRequest) {
        ChannelMessageDocument channelMessageDocument = findMessageById(channelMessageDeleteRequest.messageId());
        channelMessageDocument = ChannelMessageDocument.builder()
                .id(channelMessageDocument.getId())
                .senderId(channelMessageDocument.getSenderId())
                .workspaceId(channelMessageDocument.getWorkspaceId())
                .channelId(channelMessageDocument.getChannelId())
                .content(channelMessageDocument.getContent())
                .isDeleted(true)
                .isUpdated(channelMessageDocument.isUpdated())
                .createdAt(channelMessageDocument.getCreatedAt())
                .updatedAt(LocalDateTime.now())
                .reactions(channelMessageDocument.getReactions())
                .isHasThread(channelMessageDocument.isHasThread())
                .threadCount(channelMessageDocument.getThreadCount())
                .treads(channelMessageDocument.getTreads())
                .build();

        channelMessageRepository.save(channelMessageDocument);

        return new ChannelMessageDeleteResponse("200",SUCCESSES_DELETE_MESSAGE);
    }

    // "YYYY-MM-DD" 포맷으로 변환
    private String formatDate(LocalDateTime timestamp) {
        return timestamp.toLocalDate().toString();
    }

    public ChannelMessageResponse createChannelMessageReaction(ChannelMessageReaction channelMessageReaction) {
        ReactionDocument reactionDocument = ReactionDocument.builder()
                .messageId(channelMessageReaction.messageId())
                .memberId(channelMessageReaction.memberId())
                .emoji(channelMessageReaction.emoji())
                .build();

        reactionRepository.save(reactionDocument);

        List<ReactionDocument> messageOfReactions = reactionRepository.findAllByMessageId(channelMessageReaction.messageId());

        Map<String, List<String>> emojiToUsersMap = new HashMap<>();

        for (ReactionDocument reaction : messageOfReactions) {
            String reactionEmoji = reaction.getEmoji();
            String user = reaction.getMemberId();

            if (!emojiToUsersMap.containsKey(reactionEmoji)) {
                emojiToUsersMap.put(reactionEmoji, new ArrayList<>());
            }

            emojiToUsersMap.get(reactionEmoji).add(user);
        }

        List<Reactions> updatedReactions = new ArrayList<>();

        for (Map.Entry<String, List<String>> entry : emojiToUsersMap.entrySet()) {
            String reactionEmoji = entry.getKey();
            List<String> users = entry.getValue();
            int count = users.size();

            updatedReactions.add(new Reactions(reactionEmoji, count, users));
        }
        ChannelMessageDocument channelMessageDocument = findMessageById(channelMessageReaction.messageId());
        channelMessageDocument = ChannelMessageDocument.builder()
                .id(channelMessageDocument.getId())
                .senderId(channelMessageDocument.getSenderId())
                .workspaceId(channelMessageDocument.getWorkspaceId())
                .channelId(channelMessageDocument.getChannelId())
                .content(channelMessageDocument.getContent())
                .isDeleted(false)
                .isUpdated(channelMessageDocument.isUpdated())
                .createdAt(channelMessageDocument.getCreatedAt())
                .updatedAt(channelMessageDocument.getUpdatedAt())
                .reactions(updatedReactions)
                .isHasThread(channelMessageDocument.isHasThread())
                .threadCount(channelMessageDocument.getThreadCount())
                .treads(channelMessageDocument.getTreads())
                .build();

        channelMessageRepository.save(channelMessageDocument);

        return ChannelMessageResponse.of(channelMessageDocument);
    }

    public ChannelMessageResponse deleteChannelMessageReaction(ChannelMessageReaction channelMessageReaction) {

        ReactionDocument reactionDocument = findReactionById(channelMessageReaction.messageId(),channelMessageReaction.emoji(), channelMessageReaction.memberId());
        reactionRepository.delete(reactionDocument);

        ChannelMessageDocument channelMessageDocument = findMessageById(channelMessageReaction.messageId());

        List<Reactions> reactions = channelMessageDocument.getReactions();
        List<Reactions> deletedReactions = new ArrayList<>();

        for (Reactions reaction : reactions) {
            if (reaction.getEmoji().equals(channelMessageReaction.emoji())) {
                List<String> updatedUsers = new ArrayList<>(reaction.getUsers());
                updatedUsers.remove(channelMessageReaction.messageId());

                if (!updatedUsers.isEmpty()) {
                    deletedReactions.add(
                            new Reactions(reaction.getEmoji(), updatedUsers.size(), updatedUsers)
                    );
                }
            } else {
                deletedReactions.add(reaction);
            }
        }

        channelMessageDocument = ChannelMessageDocument.builder()
                .id(channelMessageDocument.getId())
                .senderId(channelMessageDocument.getSenderId())
                .workspaceId(channelMessageDocument.getWorkspaceId())
                .channelId(channelMessageDocument.getChannelId())
                .content(channelMessageDocument.getContent())
                .isDeleted(false)
                .isUpdated(channelMessageDocument.isUpdated())
                .createdAt(channelMessageDocument.getCreatedAt())
                .updatedAt(channelMessageDocument.getUpdatedAt())
                .reactions(deletedReactions)
                .isHasThread(channelMessageDocument.isHasThread())
                .threadCount(channelMessageDocument.getThreadCount())
                .treads(channelMessageDocument.getTreads())
                .build();

        channelMessageRepository.save(channelMessageDocument);

        return ChannelMessageResponse.of(channelMessageDocument);
    }
}
