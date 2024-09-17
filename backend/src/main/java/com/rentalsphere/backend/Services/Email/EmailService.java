package com.rentalsphere.backend.Services.Email;

import com.rentalsphere.backend.Enums.EmailType;
import com.rentalsphere.backend.Services.Email.IService.IEmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.nio.charset.StandardCharsets;

/**
 * Email service class
 */
@Service
@RequiredArgsConstructor
public class EmailService implements IEmailService {
    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;

    private final static String URL = "http://localhost:5173";

    @Async
    @Override
    public void sendEmailTemplate(EmailType emailType, String to, String subject, String name, String emailMessage, String token) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();

        // setting up variables in mail template
        Context context = new Context();
        context.setVariable("name", name);
        context.setVariable("message", emailMessage);
        context.setVariable("logo", "logo");

        // check for template to use
        String process = null;
        if (emailType.equals(EmailType.ADMIN_DECISION)) {
            process = templateEngine.process("AdminDecision.html", context);
        }
        else if(emailType.equals(EmailType.PASSWORD_RESET)){
            context.setVariable("url",URL + "/reset-password/" + token);
            process = templateEngine.process("PasswordReset.html", context);
        }

        MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());

        // setting details for mail transfer
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(process, true);
        helper.addInline("logo", new ClassPathResource("static/images/logo.png"));

        // send mail
        mailSender.send(message);
    }
}
