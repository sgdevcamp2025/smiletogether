package com.smiletogether.notificationserver.infrastructure;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URI;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.*;


@Component
@Slf4j
@RequiredArgsConstructor
public class SpaceServerApiClient {
    @Autowired
    private RestTemplate restTemplate;

    @Value("${external-api.space-server}")
    private String spaceServerUrl;

    private final ObjectMapper objectMapper;

    public List<String> getChannelMembers(String token, String channelId) {
        List<String> channelMembers = new ArrayList<>();

        URI uri = UriComponentsBuilder
                .fromUriString(spaceServerUrl)
                .pathSegment( "channels", channelId)
                .build()
                .encode()
                .toUri();

        log.info("🔧 [REQUEST URI] {}", uri);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token); // ✅ 이렇게 붙었는지 재확인
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(List.of(MediaType.ALL)); // MediaType.ALL == */*
        log.info("🔧 [REQUEST HEADERS] Authorization={}, Content-Type={}, Accept={}",
                headers.getFirst("Authorization"),
                headers.getContentType(),
                headers.getAccept());

        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        try {
            ResponseEntity<JsonNode> response = restTemplate.exchange(
                    uri,
                    HttpMethod.GET,
                    requestEntity,
                    JsonNode.class
            );

            HttpStatus status = (HttpStatus) response.getStatusCode();
            log.info("📦 [RESPONSE STATUS] {}", status);

            if (status.is2xxSuccessful()) {
                JsonNode body = response.getBody();
                log.info("📦 [RESPONSE BODY] {}", body);

                JsonNode members = body.get("members");
                if (members == null) {
                    log.warn("⚠️ 'members' 필드가 응답 바디에 없음");
                } else if (!members.isArray()) {
                    log.warn("⚠️ 'members' 필드는 배열이 아님: {}", members);
                } else {
                    for (JsonNode member : members) {
                        String userId = member.get("userId").asText();
                        channelMembers.add(userId);
                    }
                }
            } else if (status.is4xxClientError()) {
                log.error("❌ 클라이언트 에러 발생: {} - {}", status, response.getBody());
            } else if (status.is5xxServerError()) {
                log.error("❌ 서버 에러 발생: {} - {}", status, response.getBody());
            } else {
                log.warn("⚠️ 예상치 못한 상태 코드: {}", status);
            }

        } catch (HttpServerErrorException e) {
            log.error("🔥 HttpServerErrorException 발생 - Status: {}, Body: {}", e.getStatusCode(), e.getResponseBodyAsString());
        } catch (HttpClientErrorException e) {
            log.error("🔥 HttpClientErrorException 발생 - Status: {}, Body: {}", e.getStatusCode(), e.getResponseBodyAsString());
        } catch (Exception e) {
            log.error("🔥 알 수 없는 예외 발생: {}", e.getMessage(), e);
        }

        return channelMembers;
    }


}