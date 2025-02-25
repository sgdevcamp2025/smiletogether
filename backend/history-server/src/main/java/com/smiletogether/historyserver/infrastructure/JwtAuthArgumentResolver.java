package com.smiletogether.historyserver.infrastructure;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@Component
public class JwtAuthArgumentResolver implements HandlerMethodArgumentResolver {

    private final JwtDecoder jwtDecoder;

    public JwtAuthArgumentResolver(JwtDecoder jwtDecoderService) {
        this.jwtDecoder = jwtDecoderService;
    }

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(JwtAuth.class) &&
                parameter.getParameterType().equals(String.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
            NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {

        HttpServletRequest request = (HttpServletRequest) webRequest.getNativeRequest();
        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new RuntimeException("JWT 토큰이 존재하지 않습니다.");
        }

        String token = authorizationHeader.substring(7); // "Bearer " 이후의 값 추출
        return jwtDecoder.decodeJwtToken(token); // 사용자 ID 반환
    }
}
