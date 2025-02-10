package com.smiletoegether.memberserver.email.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class EmailService {
    private static final String ERROR_MESSAGE = "인증코드 생성 실패";
    private static final String EMAIL_TITLE_OF_VERIFICATION = "[ Smile Together ] 본인 인증을 위한 코드가 도착했어요! \uD83D\uDE0E";
    private static final String EMAIL_SUCCESS_OF_VERIFICATION = "이메일로 인증코드를 전송했습니다.";

    private final JavaMailSender emailSender;

    // 인증 코드를 저장할 ConcurrentHashMap (이메일 -> 코드)
    private final ConcurrentHashMap<String, String> verificationCodes = new ConcurrentHashMap<>();

    // ScheduledExecutorService를 사용하여 일정 시간이 지나면 코드 삭제
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    @Value("${spring.mail.auth-code-expiration-millis}")
    private long authCodeExpirationMillis;

    // 인증 코드 생성
    private String createCode() {
        int length = 6;
        try {
            Random random = SecureRandom.getInstanceStrong();
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < length; i++) {
                sb.append(random.nextInt(10));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(ERROR_MESSAGE);
        }
    }

    // 이메일 전송 폼 생성
    private SimpleMailMessage createEmailForm(String email, String title, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject(title);
        message.setText(text);
        return message;
    }

    // 이메일 발송 메서드
    private void sendEmail(String email, String title, String text) {
        SimpleMailMessage emailForm = createEmailForm(email, title, text);
        try {
            emailSender.send(emailForm);
        } catch (RuntimeException e) {
            throw new RuntimeException("메일을 보낼 수 없습니다.");
        }
    }
}
