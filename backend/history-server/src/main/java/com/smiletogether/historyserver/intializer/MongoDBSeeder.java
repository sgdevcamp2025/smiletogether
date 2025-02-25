package com.smiletogether.historyserver.intializer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.smiletogether.historyserver.domain.document.ChannelMessageDocument;
import com.smiletogether.historyserver.repository.ChannelMessageRepository;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;
import org.springframework.boot.CommandLineRunner;
import java.io.File;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class MongoDBSeeder implements CommandLineRunner {

    private final ChannelMessageRepository channelMessageRepository;
    private final MongoTemplate mongoTemplate;

    public MongoDBSeeder(ChannelMessageRepository channelMessageRepository, MongoTemplate mongoTemplate) {
        this.channelMessageRepository = channelMessageRepository;
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public void run(String... args) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        // JSON 파일 로드
        File jsonFile = new ClassPathResource("dummy_messages.json").getFile();

        // JSON → Java 객체 변환
        List<ChannelMessageDocument> rawMessages = objectMapper.readValue(jsonFile, new TypeReference<>() {});

        System.out.println("📌 JSON 파일에서 읽은 데이터 개수: " + rawMessages.size());

        // ✅ DateTimeFormatter 단순화 (밀리초 항상 포함됨)
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS");

        List<ChannelMessageDocument> convertedMessages = rawMessages.stream()
                .map(message -> ChannelMessageDocument.builder()
                        .id(message.getId())
                        .senderId(message.getSenderId())
                        .workspaceId(message.getWorkspaceId())
                        .channelId(message.getChannelId())
                        .content(message.getContent())
                        .isDeleted(message.isDeleted())
                        .isUpdated(message.isUpdated())
                        .createdAt(message.getCreatedAt())
                        .updatedAt(message.getUpdatedAt() != null ? message.getUpdatedAt() : null)
                        .reactions(message.getReactions())
                        .isHasThread(message.isHasThread())
                        .threadCount(message.getThreadCount())
                        .treads(message.getTreads())
                        .build()
                ).collect(Collectors.toList());

        // 기존 데이터 삭제 후 새 데이터 삽입
        channelMessageRepository.deleteAll();
        channelMessageRepository.saveAll(convertedMessages);

        System.out.println("✅ MongoDB 데이터 삽입 완료! " + convertedMessages.size() + "개 메시지 저장됨.");

        // MongoDB에서 직접 데이터 개수 확인
        long count = mongoTemplate.getCollection("channel_messages").countDocuments();
        System.out.println("📌 MongoDB에 저장된 데이터 개수: " + count);
    }

}
