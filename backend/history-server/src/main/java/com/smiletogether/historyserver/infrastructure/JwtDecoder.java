//package com.smiletogether.historyserver.infrastructure;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jws;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.security.Keys;
//import java.nio.charset.StandardCharsets;
//import java.security.Key;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//
//@Service
//public class JwtDecoder {
//
//    private final Key secretKey;
//
//    public JwtDecoder(@Value("${jwt.secret}") String secret) {
//        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
//    }
//
//    public String decodeJwtToken(String jwt) {
//        try {
//            Jws<Claims> claimsJws = Jwts.parserBuilder()
//                    .setSigningKey(secretKey)
//                    .build()
//                    .parseClaimsJws(jwt);
//
//            return claimsJws.getBody().getSubject();
//        } catch (Exception e) {
//            throw new RuntimeException("JWT 파싱 오류: " + e.getMessage());
//        }
//    }
//}
