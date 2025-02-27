package com.smiletoegether.memberserver.member.controller;

import com.smiletoegether.memberserver.member.service.MemberService;
import com.smiletoegether.memberserver.member.service.dto.CertificationEmailRequest;
import com.smiletoegether.memberserver.member.service.dto.CommonEmailCodeResponse;
import com.smiletoegether.memberserver.member.service.dto.SignUpRequest;
import com.smiletoegether.memberserver.member.service.dto.SignUpResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    // 이메일 중복 체크
    @GetMapping("/check-email")
    public ResponseEntity<String> verifyDuplication(
            @RequestParam String email
    ) {
        String responseMessage = memberService.verifyDuplication(email);
        return ResponseEntity.ok(responseMessage);
    }

    // 인증 코드 이메일 발송
    @PostMapping("/send-code")
    public ResponseEntity<String> sendCode(
            @RequestParam String email
    ) {
        String responseMessage = memberService.sendCode(email);
        return ResponseEntity.ok(responseMessage);
    }

    // 인증 코드 확인 (이메일 유효성 검사)
    @PostMapping("/certificate-email")
    public ResponseEntity<CommonEmailCodeResponse> certificateEmail(
            @RequestBody CertificationEmailRequest request
    ) {
        CommonEmailCodeResponse response = memberService.CertificateEmail(request);
        return ResponseEntity.ok(response);
    }

    // 회원가입
    @PostMapping("/sign-up")
    public ResponseEntity<SignUpResponse> signUp(@RequestBody SignUpRequest signUpRequest) {
        SignUpResponse response = memberService.SingUp(signUpRequest);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/check-memberId")
    public ResponseEntity<String> checkMemberId(
            @RequestParam String email
            ) {
        String response = memberService.checkMemberId(email);
        return ResponseEntity.ok(response);
    }
}
