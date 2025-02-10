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
}
