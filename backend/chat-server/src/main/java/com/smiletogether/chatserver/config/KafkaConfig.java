package com.smiletogether.chatserver.config;

import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.admin.NewTopic;
import org.apache.kafka.common.KafkaFuture;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import java.util.Map;
import java.util.concurrent.ExecutionException;

@Configuration
public class KafkaConfig {

    private static final String TOPIC_NAME = "test-topic";

    @Bean
    public NewTopic chatTopic(Environment env) {
        String bootstrapServers = env.getProperty("spring.kafka.bootstrap-servers", "localhost:9094");

        Map<String, Object> config = Map.of(
                AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers
        );

        try (AdminClient adminClient = AdminClient.create(config)) {
            KafkaFuture<Boolean> topicExists = adminClient.listTopics()
                    .names()
                    .thenApply(names -> names.contains(TOPIC_NAME));

            if (topicExists.get()) {
                return null; // 이미 존재하는 경우 새로 생성하지 않음
            }
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Failed to check Kafka topic existence", e);
        }

        return new NewTopic(TOPIC_NAME, 1, (short) 1);
    }
}
