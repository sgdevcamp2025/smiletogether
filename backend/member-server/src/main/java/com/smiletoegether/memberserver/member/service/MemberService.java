package com.smiletoegether.memberserver.member.service;

import com.smiletoegether.memberserver.email.service.EmailService;
import com.smiletoegether.memberserver.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    private final EmailService emailService;

    private static final String SIGN_UP_VALID_EMAIL = "사용 가능한 이메일입니다.";

    // 이메일 중복 확인
    @Transactional
    public String verifyDuplication(String email) {
        if (memberRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("중복 이메일");
        }
        return SIGN_UP_VALID_EMAIL;
    }

    // 인증 코드 발송
    @Transactional
    public String sendCode(String email) {
        if (memberRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("중복 이메일");
        }
        return emailService.sendCode(email);
    }
}
