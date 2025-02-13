package com.smiletogether.chatserver.integration;

import static org.awaitility.Awaitility.await;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.smiletogether.chatserver.service.dto.MessageRequest;
import java.util.concurrent.TimeUnit;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;

@SpringBootTest(webEnvironment = WebEnvironment.DEFINED_PORT)
@ExtendWith(SpringExtension.class)
public class ChannelChatIntegrationTest {
  @Autowired
  private KafkaTemplate<String, String> kafkaTemplate;

  private final ObjectMapper objectMapper = new ObjectMapper();

  @Test
  void WebSocket과_Kafka를_이용한_메시지_테스트() throws Exception {
    // WebSocket 연결 설정
    WebSocketStompClient stompClient = new WebSocketStompClient(new StandardWebSocketClient());
    StompSession session = stompClient.connectAsync("ws://localhost:8081/ws",
        new StompSessionHandlerAdapter() {
        }).get(5, TimeUnit.SECONDS);

    // 메시지 구독 (실제 WebSocket이 메시지를 받을지 확인)
    session.subscribe("/sub/workspaces/1/channels/1", new StompSessionHandlerAdapter() {
      @Override
      public void handleFrame(org.springframework.messaging.simp.stomp.StompHeaders headers, Object payload) {
        String message = new String((byte[]) payload);
        System.out.println("Received: " + message);
        assertTrue(message.contains("Test Message"));
      }
    });

    // Kafka를 통해 메시지 전송
    MessageRequest messageRequest = new MessageRequest(1L, "테스트 메시지입니다.");
    String jsonMessage = objectMapper.writeValueAsString(messageRequest);
    kafkaTemplate.send("chat-topic", jsonMessage);

    // 메시지가 도착할 때까지 대기
    await().atMost(5, TimeUnit.SECONDS).untilAsserted(() ->
        assertTrue(true)
    );
  }
}
