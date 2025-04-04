package com.smiletoegether.memberserver.member.controller;

import com.smiletoegether.memberserver.common.dto.CommonCodeResponse;
import com.smiletoegether.memberserver.email.service.InviteEmailService;
import com.smiletoegether.memberserver.member.service.MemberService;
import com.smiletoegether.memberserver.member.service.dto.CertificationEmailRequest;
import com.smiletoegether.memberserver.member.service.dto.response.CheckMemberIdResponse;
import com.smiletoegether.memberserver.member.service.dto.response.IdentifyEmailResponse;
import com.smiletoegether.memberserver.member.service.dto.response.IdentifyUserNameResponse;
import com.smiletoegether.memberserver.member.service.dto.SignInRequest;
import com.smiletoegether.memberserver.member.service.dto.response.SignInResponse;
import com.smiletoegether.memberserver.member.service.dto.SignUpRequest;
import com.smiletoegether.memberserver.member.service.dto.response.SignUpResponse;
import com.smiletoegether.memberserver.member.service.dto.response.InviteUrlEmailResponse;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class MemberController {

    private final MemberService memberService;
    private final InviteEmailService inviteEmailService;

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
    public ResponseEntity<CommonCodeResponse> certificateEmail(
            @RequestBody CertificationEmailRequest request
    ) {
        CommonCodeResponse response = memberService.CertificateEmail(request);
        return ResponseEntity.ok(response);
    }

    // 회원가입
    @PostMapping("/sign-up")
    public ResponseEntity<SignUpResponse> signUp(
            @RequestBody SignUpRequest signUpRequest
    ) {
        return memberService.SingUp(signUpRequest);
    }

    @GetMapping("/check-memberId")
    public ResponseEntity<CheckMemberIdResponse> checkMemberId(
            @RequestParam String email
    ) {
        String response = memberService.checkMemberId(email);
        return ResponseEntity.ok(new CheckMemberIdResponse(response));
    }

    @GetMapping("/send-inviteUrl")
    public ResponseEntity<InviteUrlEmailResponse> sendInviteUrl(
            @RequestParam String email,
            @RequestParam String inviteUrl
    ) {
        inviteEmailService.sendInviteUrl(email, inviteUrl);
        return ResponseEntity.ok(new InviteUrlEmailResponse("200", "메일 발송 성공", inviteUrl));
    }

    @GetMapping("/identify-email")
    public ResponseEntity<IdentifyEmailResponse> identifyEmail(
            @RequestParam String userId
    ) {
        String response = memberService.identifyEmail(userId);
        return ResponseEntity.ok(new IdentifyEmailResponse(response));
    }

    @GetMapping("/identify-user-name")
    public ResponseEntity<IdentifyUserNameResponse> identifyUserName(
            @RequestParam String userId
    ) {
        String response = memberService.identifyUserName(userId);
        return ResponseEntity.ok(new IdentifyUserNameResponse(response));
    }

    @PostMapping("/sign-in")
    public ResponseEntity<SignInResponse> signIn(
            @RequestBody SignInRequest signInRequest,
            HttpServletResponse response
    ) {
        log.info("email:" ,signInRequest.email());
        return memberService.signIn(signInRequest.email(), response);
    }
}
