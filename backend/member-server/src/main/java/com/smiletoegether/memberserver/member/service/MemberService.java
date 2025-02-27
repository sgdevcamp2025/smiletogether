package com.smiletoegether.memberserver.member.service;

import com.smiletoegether.memberserver.email.service.EmailService;
import com.smiletoegether.memberserver.member.domain.Member;
import com.smiletoegether.memberserver.member.repository.MemberRepository;
import com.smiletoegether.memberserver.member.service.dto.CertificationEmailRequest;
import com.smiletoegether.memberserver.member.service.dto.CommonEmailCodeResponse;
import com.smiletoegether.memberserver.member.service.dto.SignUpRequest;
import com.smiletoegether.memberserver.member.service.dto.SignUpResponse;
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

    private String findIdByEmail(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 이메일입니다."));
        return member.getId();
    }

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

    // 회원가입
    @Transactional
    public SignUpResponse SingUp(SignUpRequest signUpRequest) {

        Member member = initMember(signUpRequest);

        return new SignUpResponse("201", "회원가입 완료", member);
    }

    private Member initMember(SignUpRequest signUpRequest) {
        Member member = Member.builder()
                .email(signUpRequest.email())
                .username(signUpRequest.username())
                .build();

        memberRepository.save(member);
        return member;
    }

    public String checkMemberId(String email) {
        return findIdByEmail(email);
    }
}
