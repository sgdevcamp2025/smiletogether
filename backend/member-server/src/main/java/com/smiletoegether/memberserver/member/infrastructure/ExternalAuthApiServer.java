package com.smiletoegether.memberserver.member.infrastructure;

import com.smiletoegether.memberserver.member.service.dto.TokenResponse;
import java.net.URI;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Component
public class ExternalAuthApiServer {
    @Autowired
    private RestTemplate restTemplate;

    public TokenResponse getToken(String userId) {
        URI uri = UriComponentsBuilder
                .fromUriString("http://localhost:8091/api/auth/login")
                .build()
                .toUri();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<ExternalTokenRequest> requestEntity = new HttpEntity<>(headers);

        ResponseEntity<ExternalTokenResponse> response = restTemplate.exchange(
                uri,
                HttpMethod.POST,
                requestEntity,
                ExternalTokenResponse.class
        );


        HttpHeaders responseHeaders = response.getHeaders();
        List<String> cookies = responseHeaders.get(HttpHeaders.SET_COOKIE);
        String refreshToken = null;

        if (cookies != null) {
            for (String cookie : cookies) {
                if (cookie.startsWith("refreshToken=")) {  // 🔥 `refresh_token` 쿠키 찾기
                    refreshToken = cookie.split(";")[0].split("=")[1];  // `refresh_token=value` 형태에서 값 추출
                    break;
                }
            }
        }

        // 🔹 로그 출력 (디버깅용)
        System.out.println("🔹 응답 본문: " + response.getBody());
        System.out.println("🔹 Refresh Token: " + refreshToken);

        return new TokenResponse(response.getBody().accessToken(), refreshToken);
    }
}
