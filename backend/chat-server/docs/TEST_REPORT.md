# 테스트 결과 보고서

## 개요

이 문서는 `com.smiletogether.chatserver` 프로젝트의 테스트 실행 결과를 정리한 문서입니다.. 실행된 테스트는 총 4개이며, 모든 테스트가 성공적으로 통과되었습니다.

---
Chat Server 테스트 리포트

테스트 날짜: 2025-02-11

테스트 환경
- 프레임워크: JUnit 5, Mockito
- 빌드 도구: Gradle 8.12.1
- Spring Boot 버전: 3.4.1
- Kafka 버전: 3.6.1
- Database: H2 (테스트용), MySQL (로컬)

---
## 테스트 실행 방법 
Gradle 테스트 실행
- ./gradlew test
---
## 테스트 결과 요약

| 테스트 스위트                    | 테스트 클래스                                                               | 테스트 수 | 실패 | 에러 | 소요 시간 (초) |
| -------------------------- | --------------------------------------------------------------------- | ----- | -- | -- | --------- |
| ChatServerApplicationTests | `com.smiletogether.chatserver.ChatServerApplicationTests`             | 1     | 0  | 0  | 0.68      |
| ChannelChatControllerTest  | `com.smiletogether.chatserver.controller.ChannelChatControllerTest`   | 1     | 0  | 0  | 1.114     |
| ChannelChatIntegrationTest | `com.smiletogether.chatserver.integration.ChannelChatIntegrationTest` | 1     | 0  | 0  | 1.239     |
| ChatServiceTest            | `com.smiletogether.chatserver.service.ChatServiceTest`                | 1     | 0  | 0  | 1.202     |

---

## 상세 테스트 결과

### 1. ChatServerApplicationTests

- **클래스명**: `com.smiletogether.chatserver.ChatServerApplicationTests`
- **테스트 메서드**: `contextLoads()`
- **결과**: 성공
- **소요 시간**: 0.68초
- **비고**: Spring Boot 애플리케이션 컨텍스트가 정상적으로 로드되었음을 검증하는 테스트

### 2. ChannelChatControllerTest

- **클래스명**: `com.smiletogether.chatserver.controller.ChannelChatControllerTest`
- **테스트 메서드**: `sendChannelMessage_호출시_ChatService_메서드가_호출된다()`
- **결과**: 성공
- **소요 시간**: 1.114초
- **비고**: 채널 메시지 전송 API가 정상적으로 `ChatService`의 메서드를 호출하는지 검증

### 3. ChannelChatIntegrationTest

- **클래스명**: `com.smiletogether.chatserver.integration.ChannelChatIntegrationTest`
- **테스트 메서드**: `WebSocket과_Kafka를_이용한_메시지_테스트()`
- **결과**: 성공
- **소요 시간**: 1.239초
- **비고**: WebSocket과 Kafka를 활용한 메시지 송수신이 정상적으로 작동하는지 검증

### 4. ChatServiceTest

- **클래스명**: `com.smiletogether.chatserver.service.ChatServiceTest`
- **테스트 메서드**: `sendChannelSendMessage_메시지_전송_테스트()`
- **결과**: 성공
- **소요 시간**: 1.202초
- **비고**: `ChatService`에서 채널 메시지 전송이 정상적으로 이루어지는지 검증

---

## 추가 분석

### 1. 경고 사항

- **Mockito 동적 에이전트 로딩 경고**
    - `Mockito`가 인라인 목킹을 위해 자동으로 에이전트를 로딩하고 있으며, 향후 JDK 업데이트에서 해당 기능이 차단될 가능성이 있음
    - 해결책: `Mockito`의 공식 문서에서 제공하는 방식으로 `Mockito`를 빌드 스크립트에 명시적으로 추가하는 것이 필요함

### 2. 데이터베이스 관련 경고

- `H2Database`에서 `InvalidPathException: Illegal char <:> at index 4: chat:testdb` 오류 발생
    - 현재는 테스트가 정상적으로 실행되었으나, 향후 데이터베이스 설정 확인 필요
    - 해결책: `application.yml` 또는 `application.properties`에서 데이터베이스 설정을 점검하여 올바른 URL을 사용하도록 수정 필요


### 3. 주요 로그 분석
Kafka Consumer 정상 실행

2025-02-11T05:53:39.740+09:00  INFO 49596 --- [smile-together-chat-server]
[ntainer#0-0-C-1] o.a.k.c.c.internals.ConsumerCoordinator  :
[Consumer clientId=consumer-chat-server-group-1, groupId=chat-server-group] Member consumer-chat-server-group-1
sending LeaveGroup request to coordinator localhost:9094 (id: 2147483647 rack: null) due to the consumer unsubscribed from all topics

Kafka Consumer가 그룹을 정상적으로 구독하고 해제함을 확인

Kafka Producer 정상 종료

2025-02-11T05:53:41.547+09:00  INFO 49596 --- [smile-together-chat-server]
[ionShutdownHook] o.a.k.clients.producer.KafkaProducer     :
[Producer clientId=smile-together-chat-server-producer-1] Closing the Kafka producer with timeoutMillis = 30000 ms.

Kafka Producer가 테스트 종료 후 정상적으로 종료됨을 확인

WebSocket 브로커 정상 작동

2025-02-11T05:53:41.547+09:00  INFO 49596 --- [smile-together-chat-server]
[ionShutdownHook] o.s.m.s.b.SimpleBrokerMessageHandler     : Stopping...

2025-02-11T05:53:41.547+09:00  INFO 49596 --- [smile-together-chat-server]
[ionShutdownHook] o.s.m.s.b.SimpleBrokerMessageHandler     : Stopped.

WebSocket 브로커(SimpleBrokerMessageHandler) 정상적으로 메시지 처리 후 종료됨을 확인
---

## 결론

- 모든 테스트가 성공적으로 실행되었으며, 기본적인 기능이 정상적으로 동작함을 확인함
- Gradle 테스트 실행 결과, 모든 단위 및 통합 테스트가 성공적으로 완료됨
- Kafka Producer, Consumer 및 WebSocket이 정상 동작함을 확인
- 테스트 결과를 Gradle HTML 리포트에서 확인 가능
- 향후 성능 최적화를 위해 부하 테스트 및 Kafka 메시지 전송 속도 개선 필요
- 일부 경고 사항이 존재하며, 추후 유지보수를 위해 해당 문제 해결 필요
---
## 개선 사항
Kafka 메시지 전송 속도 최적화
- 현재 Kafka 메시지가 Consumer에서 처리될 때 약간의 지연이 발생함.

WebSocket 메시지 유실 여부 추가 검증 필요
- 현재 WebSocket 메시지를 수신할 때, 일부 메시지가 정상적으로 구독되지 않을 가능성이 있음.

부하 테스트(Load Test) 진행 필요
- WebSocket & Kafka를 대량의 트래픽 환경에서 테스트할 필요가 있음.
---
## 향후 계획
- WebSocket 메시지 손실 방지를 위한 추가 로깅 도입
- Kafka 메시지 전송 성능 개선 
- 1000개 이상의 WebSocket 클라이언트를 동시에 연결하는 부하 테스트 진행
- CI/CD 파이프라인에서 자동으로 테스트 리포트 생성하도록 구성