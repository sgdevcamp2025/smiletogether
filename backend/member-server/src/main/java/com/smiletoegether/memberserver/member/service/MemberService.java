package com.smiletoegether.memberserver.member.service;

import com.smiletoegether.memberserver.email.service.EmailCodeService;
import com.smiletoegether.memberserver.member.domain.Member;
import com.smiletoegether.memberserver.member.infrastructure.ExternalAuthApiServer;
import com.smiletoegether.memberserver.member.repository.MemberRepository;
import com.smiletoegether.memberserver.member.service.dto.CertificationEmailRequest;
import com.smiletoegether.memberserver.common.dto.CommonCodeResponse;
import com.smiletoegether.memberserver.member.service.dto.response.SignInResponse;
import com.smiletoegether.memberserver.member.service.dto.SignUpRequest;
import com.smiletoegether.memberserver.member.service.dto.response.SignUpResponse;
import com.smiletoegether.memberserver.member.service.dto.TokenResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final EmailCodeService emailCodeService;
    private final ExternalAuthApiServer externalAuthApiServer;

    private static final String SIGN_UP_VALID_EMAIL = "사용 가능한 이메일입니다.";

    private String findIdByEmail(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 이메일입니다."));
        return member.getId();
    }

    private String findEmailById(String userId) {
        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 유저입니다."));
        return member.getEmail();
    }

    private String findUserNameById(String userId) {
        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 유저입니다."));
        return member.getUsername();
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
        return emailCodeService.sendCode(email);
    }

    // 인증코드 확인
    @Transactional
    public CommonCodeResponse CertificateEmail(CertificationEmailRequest certificationEmailRequest) {
        boolean isVerified = emailCodeService.verifyCode(certificationEmailRequest.email(), certificationEmailRequest.code());

        if (!isVerified) {
            return new CommonCodeResponse("400", "이메일 인증 코드가 일치하지 않습니다.");
        }

        return new CommonCodeResponse("200", "이메일 인증 코드 확인이 완료되었습니다.");
    }

    // 회원가입
    @Transactional
    public ResponseEntity<SignUpResponse> SingUp(SignUpRequest signUpRequest) {

        Member member = initMember(signUpRequest);

        return ResponseEntity.ok(new SignUpResponse("201", "회원가입 완료", member));
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

    public ResponseEntity<SignInResponse> signIn(String email, HttpServletResponse response) {
        String userId = findIdByEmail(email);
        TokenResponse tokenResponse = externalAuthApiServer.getToken(userId);

        setRefreshToken(response, tokenResponse.refreshToken());

        // 응답 바디 생성
        SignInResponse signInResponse = new SignInResponse(tokenResponse.accessToken(), new CommonCodeResponse("200", "로그인 성공"));

        return ResponseEntity.ok()
                .body(signInResponse);
    }

    private void setRefreshToken(HttpServletResponse response, String refreshToken) {
        // Refresh Token을 HttpOnly 쿠키에 저장
        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setHttpOnly(true);  // JavaScript에서 접근 방지 (XSS 공격 방지)
        refreshTokenCookie.setSecure(true);    // HTTPS에서만 전송
        refreshTokenCookie.setPath("/");       // 모든 경로에서 접근 가능
        refreshTokenCookie.setMaxAge(604800);  // 7일 동안 유지 (604800초)

        response.addCookie(refreshTokenCookie); // ✅ 쿠키를 응답에 추가
    }

    public String identifyEmail(String userId) {
        String email = findEmailById(userId);
        return email;
    }

    public String identifyUserName(String userId) {
        String userName = findUserNameById(userId);
        return userName;
    }
}
