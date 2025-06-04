package com.smiletogether.notificationserver.infrastructure;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@Component
@Slf4j
@RequiredArgsConstructor
public class SpaceServerApiClient {

    private final RestTemplate restTemplate;

    @Value("${external-api.space-server}")
    private String spaceServerUrl;

    public List<String> getChannelMembers(String token, String channelId) {
        List<String> channelMembers = new ArrayList<>();

        URI uri = UriComponentsBuilder
                .fromUriString(spaceServerUrl)
                .pathSegment("channels", channelId)
                .build()
                .encode()
                .toUri();

        log.info("🔧 [REQUEST URI] {}", uri);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));

        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        try {
            ResponseEntity<ChannelResponse> response = restTemplate.exchange(
                    uri,
                    HttpMethod.GET,
                    requestEntity,
                    ChannelResponse.class
            );

            HttpStatus status = HttpStatus.valueOf(response.getStatusCode().value());
            log.info("📦 [RESPONSE STATUS] {}", status);

            if (status.is2xxSuccessful()) {
                ChannelResponse body = response.getBody();
                if (body != null && body.getMembers() != null) {
                    for (ChannelResponse.UserInfo member : body.getMembers()) {
                        channelMembers.add(member.getUserId());
                    }
                    log.info("✅ [채널 멤버 수] {}", channelMembers.size());
                } else {
                    log.warn("⚠️ 응답에 멤버 정보가 없습니다.");
                }
            } else {
                log.warn("⚠️ 비정상 응답 상태: {}", status);
            }

        } catch (HttpClientErrorException | HttpServerErrorException e) {
            log.error("🔥 HTTP 에러 발생 - Status: {}, Body: {}", e.getStatusCode(), e.getResponseBodyAsString());
        } catch (Exception e) {
            log.error("🔥 알 수 없는 예외 발생: {}", e.getMessage(), e);
        }

        return channelMembers;
    }
}
