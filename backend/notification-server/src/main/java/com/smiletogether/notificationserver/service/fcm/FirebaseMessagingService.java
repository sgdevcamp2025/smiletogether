package com.smiletogether.notificationserver.service.fcm;

import com.smiletogether.notificationserver.service.dto.FirebaseMessageDto;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
@Slf4j
public class FirebaseMessagingService {

    @Autowired
    private final RestTemplate restTemplate;
    private static final String PROJECT_ID = "smiletogether-1fe9a";
    private static final String FCM_ENDPOINT = "https://fcm.googleapis.com/v1/projects/" + PROJECT_ID + "/messages:send";

    public void sendMessage(String accessToken, String targetToken, String title, String body, Map<String, String> data) {
        // Header 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(accessToken);

        // 메시지 구성
        FirebaseMessageDto dto = FirebaseMessageDto.builder()
                .validateOnly(false)
                .message(
                        FirebaseMessageDto.Message.builder()
                                .token(targetToken)
                                .notification(FirebaseMessageDto.Notification.builder()
                                        .title(title)
                                        .body(body)
                                        .build())
                                .data(data)
                                .build()
                )
                .build();

        HttpEntity<FirebaseMessageDto> request = new HttpEntity<>(dto, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(FCM_ENDPOINT, request, String.class);
        log.info("FCM 응답: {}", response.getBody());
    }
}
