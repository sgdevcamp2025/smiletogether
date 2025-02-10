package com.smiletoegether.memberserver.member.service;

import com.smiletoegether.memberserver.email.service.EmailService;
import com.smiletoegether.memberserver.member.repository.MemberRepository;
import com.smiletoegether.memberserver.member.service.dto.CertificationEmailRequest;
import com.smiletoegether.memberserver.member.service.dto.CommonEmailCodeResponse;
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

    // 인증코드 확인
    @Transactional
    public CommonEmailCodeResponse CertificateEmail(CertificationEmailRequest certificationEmailRequest) {
        boolean isVerified = emailService.verifyCode(certificationEmailRequest.email(), certificationEmailRequest.code());

        if (!isVerified) {
            return new CommonEmailCodeResponse("400", "이메일 인증 코드가 일치하지 않습니다.");
        }

        return new CommonEmailCodeResponse("200", "이메일 인증 코드 확인이 완료되었습니다.");
    }
}
