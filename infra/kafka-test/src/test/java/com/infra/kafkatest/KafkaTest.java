package com.infra.kafkatest;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class KafkaTest {
    @Autowired
    private KafkaProducerService kafkaProducerService;

    @Test
    void testKafka() {
        kafkaProducerService.sendMessage("Hello, Kafka!");
    }
}