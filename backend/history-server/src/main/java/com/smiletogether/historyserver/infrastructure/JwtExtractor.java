package com.smiletogether.historyserver.infrastructure;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class JwtExtractor {

    public String getToken(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader == null) {
            log.warn("Authorization header is missing.");
            return null; // 또는 예외 발생 가능
        }

        return authorizationHeader; // "Bearer " 포함하여 전체 반환
    }
}