package com.smiletogether.chatserver.config;

import org.apache.kafka.clients.producer.Partitioner;
import org.apache.kafka.common.Cluster;

import java.util.Map;

public class PartitionConfig implements Partitioner {

  @Override
  public int partition(String topic, Object key, byte[] keyBytes, Object value, byte[] valueBytes, Cluster cluster) {
    int numPartitions = cluster.partitionCountForTopic(topic);

    // key가 null일 경우 0번 파티션으로 보냄
    if (key == null) {
      return 0;
    }

    // 채널 ID를 기반으로 특정 파티션을 고정 (음수 방지)
    int partition = Math.abs(key.hashCode()) % numPartitions;
    return partition;
  }

  @Override
  public void close() {}

  @Override
  public void configure(Map<String, ?> configs) {}
}
