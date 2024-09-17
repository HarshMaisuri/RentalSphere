package com.rentalsphere.backend.Services.Email.IService;

import com.rentalsphere.backend.Enums.EmailType;
import jakarta.mail.MessagingException;

/**
 * Email service interface
 */
public interface IEmailService {
    public void sendEmailTemplate(EmailType emailType, String to, String subject, String name, String emailMessage, String token) throws MessagingException;
}
