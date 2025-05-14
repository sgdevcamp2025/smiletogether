package com.smiletogether.notificationserver.service.fcm;

import com.google.auth.oauth2.GoogleCredentials;
import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FirebaseTokenService {

    @Value("${firebase.key-path}")
    private String keyPath;

    private static final String MESSAGING_SCOPE = "https://www.googleapis.com/auth/firebase.messaging";
    private static final List<String> SCOPES = List.of(MESSAGING_SCOPE);

    private GoogleCredentials credentials;

    @PostConstruct
    public void init() {
        try (InputStream serviceAccount =
                new ClassPathResource(keyPath.replace("classpath:", "")).getInputStream()) {
            credentials = GoogleCredentials
                    .fromStream(serviceAccount)
                    .createScoped(SCOPES);
            credentials.refreshIfExpired();
        } catch (IOException e) {
            throw new IllegalStateException("Firebase 인증 키 파일 로딩 실패", e);
        }
    }

    public String getAccessToken() throws IOException {
        credentials.refreshIfExpired();
        return credentials.getAccessToken().getTokenValue();
    }
}

