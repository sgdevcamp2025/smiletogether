package com.smiletogether.chatserver.config;

import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.KafkaAdmin;

import java.util.Map;

@Configuration
public class KafkaConfig {

    @Value("${spring.kafka.bootstrap-servers}")
    private String bootstrapServers;

    @Value("${spring.kafka.topics.chat.partitions}")
    private int chatPartitions;

    @Value("${spring.kafka.topics.chat.replication-factor}")
    private short chatReplicationFactor;

    @Value("${spring.kafka.topics.history.partitions}")
    private int historyPartitions;

    @Value("${spring.kafka.topics.history.replication-factor}")
    private short historyReplicationFactor;



    @Bean
    public KafkaAdmin kafkaAdmin() {
        System.out.println("✅ Kafka Bootstrap Servers: " + bootstrapServers);  // 디버깅 로그 추가
        return new KafkaAdmin(Map.of(
                AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers
        ));
    }

    @Bean
    public NewTopic chatTopic() {
        return new NewTopic("chat-topic", chatPartitions, chatReplicationFactor);
    }

    @Bean
    public NewTopic historyTopic() {
        return new NewTopic("history-topic", historyPartitions, historyReplicationFactor);
    }
}