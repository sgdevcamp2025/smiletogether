package com.smiletogether.chatserver.infrastructure;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Map;

@Component
@Slf4j
public class JwtExtractor {

    private final ObjectMapper objectMapper = new ObjectMapper();

    public String extractMemberId(StompHeaderAccessor headerAccessor) {
        String authorizationHeader = headerAccessor.getFirstNativeHeader("Authorization");
        log.info("Authorization header: {}", authorizationHeader);

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Invalid Authorization header");
        }

        String token = authorizationHeader.substring(7); // "Bearer " 제거
        log.info("Extracting member ID from token: {}", token);

        try {
            // 🔥 JWT의 Payload 부분만 Base64 디코딩
            String payload = new String(Base64.getUrlDecoder().decode(token.split("\\.")[1]), StandardCharsets.UTF_8);
            log.info("Decoded Payload: {}", payload);

            // 🔥 JSON 파싱
            Map<String, Object> claims = objectMapper.readValue(payload, Map.class);

            // 🔥 "userId" 클레임 가져오기
            String userId = (String) claims.get("userId");
            log.info("Extracted userId: {}", userId);
            return userId;
        } catch (Exception e) {
            log.error("❌ Failed to decode JWT token", e);
            throw new RuntimeException("Failed to extract memberId from token");
        }
    }

    public String getToken(StompHeaderAccessor headerAccessor) {
        String authorizationHeader = headerAccessor.getFirstNativeHeader("Authorization");
        log.info("Authorization header: {}", authorizationHeader);

        return authorizationHeader;
    }
}