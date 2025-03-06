package com.smiletoegether.memberserver.email.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class InviteEmailService {
    private static final String EMAIL_TITLE_OF_VERIFICATION = "[ Smile Together ] 워크 스페이스 초대 이메일이 도착했습니다. \uD83D\uDE0E";
    private final JavaMailSender emailSender;

    // 인증 코드 발송 및 메모리 저장
    public void sendInviteUrl(String email, String inviteUrl) {
        sendEmail(email, inviteUrl);
    }

    // 이메일 전송 폼 생성
    private SimpleMailMessage createEmailForm(String email, String inviteUrl) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject(EMAIL_TITLE_OF_VERIFICATION);
        message.setText(
                "다음 워크스페이스로부터 초대되었습니다. \n"
                + "다음 링크에 접속하면 워크스페이스에 가입할 수 있습니다."
                + inviteUrl
        );
        return message;
    }

    // 이메일 발송 메서드
    private void sendEmail(String email, String inviteUrl) {
        SimpleMailMessage emailForm = createEmailForm(email, inviteUrl);
        try {
            emailSender.send(emailForm);
        } catch (RuntimeException e) {
            throw new RuntimeException("메일을 보낼 수 없습니다.");
        }
    }
}
