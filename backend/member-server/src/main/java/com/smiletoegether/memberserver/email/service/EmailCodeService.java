package com.smiletoegether.memberserver.email.service;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Random;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class EmailCodeService {
    private static final String ERROR_MESSAGE = "인증코드 생성 실패";
    private static final String EMAIL_TITLE_OF_VERIFICATION = "[ Smile Together ] 본인 인증을 위한 코드가 도착했어요! \uD83D\uDE0E";
    private static final String EMAIL_SUCCESS_OF_VERIFICATION = "이메일로 인증코드를 전송했습니다.";

    private final JavaMailSender emailSender;
    private final RedisTemplate<String, String> redisTemplate;


    @Value("${spring.mail.auth-code-expiration-millis}")
    private long authCodeExpirationMillis;
    
    // 인증 코드 발송 및 메모리 저장
    public String sendCode(String email) {
        String code = createCode();
        sendEmail(email, EMAIL_TITLE_OF_VERIFICATION, code);

        redisTemplate.opsForValue().set(email, code, 300, TimeUnit.SECONDS);

        return EMAIL_SUCCESS_OF_VERIFICATION;
    }

    // 인증 코드 확인
    public boolean verifyCode(String email, String codeInput) {
        Boolean hasKey = redisTemplate.hasKey(email);

        if (Boolean.FALSE.equals(hasKey)) {
            throw new RuntimeException("잘못된 이메일이거나 인증 코드가 만료되었습니다.");
        }

        String storedCode = redisTemplate.opsForValue().get(email);
        return storedCode.equals(codeInput);
    }

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
