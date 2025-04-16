package com.smiletogether.chatserver.config;

import java.util.HashMap;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.admin.NewTopic;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaAdmin;

import java.util.Map;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;

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
    public ProducerFactory<String, String> producerFactory() {
        Map<String, Object> config = new HashMap<>();
        config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        config.put(ProducerConfig.PARTITIONER_CLASS_CONFIG, PartitionConfig.class); // ✅ custom partitioner

        return new DefaultKafkaProducerFactory<>(config);
    }


    @Bean
    public KafkaTemplate<String, String> kafkaTemplate() {
        return new KafkaTemplate<>(producerFactory());
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