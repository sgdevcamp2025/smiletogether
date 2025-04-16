package com.smiletogether.historyserver.util;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.Consumer;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.stereotype.Component;
import org.apache.kafka.common.TopicPartition;

@Component
@RequiredArgsConstructor
@Slf4j
public class KafkaLagChecker {

    private final ConsumerFactory<String, String> consumerFactory;

    public boolean isPartitionUpToDate(String topic, String groupId, String channelId) {
        try (Consumer<String, String> consumer = consumerFactory.createConsumer(groupId)) {

            int partition = calculatePartition(topic, channelId, consumer);
            TopicPartition topicPartition = new TopicPartition(topic, partition);

            consumer.assign(List.of(topicPartition));
            consumer.seekToEnd(List.of(topicPartition));  // 최신 오프셋 위치로 이동

            long latestOffset = consumer.position(topicPartition);

            consumer.seekToBeginning(List.of(topicPartition)); // 커밋된 위치 확인
            long committedOffset = consumer.committed(topicPartition).offset();

            log.info("[KafkaLag] channelId={}, partition={}, committed={}, latest={}",
                    channelId, partition, committedOffset, latestOffset);

            return committedOffset >= latestOffset;
        } catch (Exception e) {
            log.error("Kafka lag 확인 중 오류", e);
            return false;
        }
    }

    private int calculatePartition(String topic, String channelId, Consumer<String, String> consumer) {
        int partitionCount = consumer.partitionsFor(topic).size();
        return Math.abs(channelId.hashCode()) % partitionCount;
    }

    public boolean waitUntilPartitionSynced(String topic, String groupId, String channelId, int maxRetry, long delayMillis) {
        for (int i = 0; i < maxRetry; i++) {
            if (isPartitionUpToDate(topic, groupId, channelId)) return true;
            try {
                Thread.sleep(delayMillis);
            } catch (InterruptedException ignored) {}
        }
        return false;
    }
}