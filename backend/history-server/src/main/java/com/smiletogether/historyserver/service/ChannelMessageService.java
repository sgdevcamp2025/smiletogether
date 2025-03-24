package com.smiletogether.historyserver.service;

import com.smiletogether.historyserver.domain.document.ChannelMessageDocument;
import com.smiletogether.historyserver.domain.document.ReactionDocument;
import com.smiletogether.historyserver.domain.model.Reactions;
import com.smiletogether.historyserver.infrastructure.ExternalProfileApiClient;
import com.smiletogether.historyserver.repository.ChannelMessageRepository;
import com.smiletogether.historyserver.repository.ReactionRepository;
import com.smiletogether.historyserver.service.dto.ChannelMessageReaction;
import com.smiletogether.historyserver.service.dto.ChannelMessages;
import com.smiletogether.historyserver.service.dto.WorkspaceProfileDto;
import com.smiletogether.historyserver.service.dto.request.ChannelMessageDeleteRequest;
import com.smiletogether.historyserver.service.dto.request.ChannelMessageSaveRequest;
import com.smiletogether.historyserver.service.dto.request.ChannelMessageUpdateRequest;
import com.smiletogether.historyserver.service.dto.request.ChannelMessagesRequest;
import com.smiletogether.historyserver.service.dto.response.ChannelMessageResponse;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
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
    private final ExternalProfileApiClient externalProfileApiClient;

    private ChannelMessageDocument findMessageById(String messageId) {
        ChannelMessageDocument channelMessageDocument = channelMessageRepository.findById(messageId)
                .orElseThrow(() -> new RuntimeException("메세지를 찾을 수 없습니다."));
        return channelMessageDocument;
    }

    private ReactionDocument findReactionById(String messageId, String emoji, String memberId) {
        ReactionDocument reactionDocument = reactionRepository.findByMessageIdAndEmojiAndMemberId(messageId, emoji,
                        memberId)
                .orElseThrow(() -> new RuntimeException("리액션을 찾을 수 없습니다."));
        return reactionDocument;
    }

    public ChannelMessages getChannelMessages(ChannelMessagesRequest channelMessagesRequest, String workspaceId,
                                              String channelId, String token) {
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
            ChannelMessageResponse messageResponse = ChannelMessageResponse.of(messageDoc,
                    getWorkspaceProfile(token, workspaceId, messageDoc.getSenderId()));
            String dateKey = formatDate(messageResponse.createdAt());

            groupedMessages.computeIfAbsent(dateKey, k -> new ArrayList<>()).add(messageResponse);
        }

        // 날짜 순서대로 그룹화된 메시지를 정렬 (날짜별로 오래된 순서 유지)
        Map<String, List<ChannelMessageResponse>> reversedGroupedMessages = new LinkedHashMap<>();
        groupedMessages.entrySet().stream()
                .sorted(Map.Entry.<String, List<ChannelMessageResponse>>comparingByKey()) // 날짜 오름차순 정렬
                .forEachOrdered(entry -> {
                    // 각 날짜별 메시지를 createdAt 기준으로 오름차순 정렬
                    List<ChannelMessageResponse> sortedMessages = entry.getValue().stream()
                            .sorted(Comparator.comparing(ChannelMessageResponse::createdAt)) // 오래된 순 정렬
                            .collect(Collectors.toList());

                    reversedGroupedMessages.put(entry.getKey(), sortedMessages);
                });

        return new ChannelMessages(channelId, reversedGroupedMessages);
    }

    public void saveMessage(ChannelMessageSaveRequest channelMessage) {
        ChannelMessageDocument newMessage = ChannelMessageDocument.builder()
                .id(channelMessage.messageId())
                .workspaceId(channelMessage.workspaceId())
                .channelId(channelMessage.channelId())
                .senderId(channelMessage.user().userId())
                .content(channelMessage.content())
                .createdAt(channelMessage.createdAt())
                .build();

        channelMessageRepository.save(newMessage);
    }

    public ChannelMessageResponse getChannelMessage(String messageId, String token) {
        ChannelMessageDocument channelMessageDocument = findMessageById(messageId);
        return ChannelMessageResponse.of(channelMessageDocument,
                getWorkspaceProfile(token, channelMessageDocument.getWorkspaceId(),
                        channelMessageDocument.getChannelId()));
    }

    public void updateChannelMessage(ChannelMessageUpdateRequest channelMessageUpdateRequest) {
        ChannelMessageDocument channelMessageDocument = findMessageById(channelMessageUpdateRequest.messageId());
        channelMessageDocument = ChannelMessageDocument.builder()
                .id(channelMessageDocument.getId())
                .senderId(channelMessageDocument.getSenderId())
                .workspaceId(channelMessageDocument.getWorkspaceId())
                .channelId(channelMessageDocument.getChannelId())
                .content(channelMessageUpdateRequest.content())
                .isDeleted(false)
                .isUpdated(true)
                .createdAt(channelMessageDocument.getCreatedAt())
                .updatedAt(channelMessageUpdateRequest.updatedAt())
                .reactions(channelMessageDocument.getReactions())
                .isHasThread(channelMessageDocument.isHasThread())
                .threadCount(channelMessageDocument.getThreadCount())
                .treads(channelMessageDocument.getTreads())
                .build();

        channelMessageRepository.save(channelMessageDocument);
    }

    public void deleteChannelMessage(ChannelMessageDeleteRequest channelMessageDeleteRequest) {
        ChannelMessageDocument channelMessageDocument = findMessageById(channelMessageDeleteRequest.messageId());

        ChannelMessageDocument updatedMessage = ChannelMessageDocument.builder()
                .id(channelMessageDocument.getId())  // 기존 ID 유지
                .senderId(channelMessageDocument.getSenderId())
                .workspaceId(channelMessageDocument.getWorkspaceId())
                .channelId(channelMessageDocument.getChannelId())
                .content(channelMessageDocument.getContent())
                .isDeleted(true)
                .isUpdated(channelMessageDocument.isUpdated())
                .createdAt(channelMessageDocument.getCreatedAt())
                .updatedAt(LocalDateTime.now())  // ✅ 업데이트 시간 반영
                .reactions(channelMessageDocument.getReactions())
                .isHasThread(channelMessageDocument.isHasThread())
                .threadCount(channelMessageDocument.getThreadCount())
                .treads(channelMessageDocument.getTreads())
                .build();

        // ✅ ID가 동일하기 때문에 MongoDB에서 기존 Document를 덮어쓰기 함
        channelMessageRepository.save(updatedMessage);
    }

    // "YYYY-MM-DD" 포맷으로 변환
    private String formatDate(LocalDateTime timestamp) {
        return timestamp.toLocalDate().toString();
    }

    public void createChannelMessageReaction(ChannelMessageReaction channelMessageReaction) {
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
    }

    public void deleteChannelMessageReaction(ChannelMessageReaction channelMessageReaction) {

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
    }

    private WorkspaceProfileDto getWorkspaceProfile(String token, String workspaceId, String memberId) {
        return externalProfileApiClient.getWorkspaceProfile(token, workspaceId, memberId);
    }
}
