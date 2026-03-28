package com.edtech.notificationservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String senderEmail;

    public void sendEmail(String to, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(senderEmail);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);
            System.out.println("Email effectively sent to " + to);
        } catch (Exception e) {
            // Log output instead of crashing if SMTP is not properly setup for local dev
            System.err.println("Failed to send email to " + to + " via SMTP. Error: " + e.getMessage());
            System.out.println("--- DUMMY EMAIL OUTPUT FOR DEV ---\nTo: " + to + "\nSubject: " + subject + "\nBody:\n" + body + "\n-----------------------------------");
        }
    }
}
