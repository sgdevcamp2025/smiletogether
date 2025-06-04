package com.smiletogether.notificationserver.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // 모든 경로 허용
                        .allowedOrigins("http://localhost:3000", "http://localhost:5173", "http://localhost:8090", "http://localhost:8091") // React 앱 주소
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH" ,"OPTIONS")
                        .allowedHeaders("Authorization", "Content-Type")
                        .allowCredentials(true);
            }
        };
    }
}
