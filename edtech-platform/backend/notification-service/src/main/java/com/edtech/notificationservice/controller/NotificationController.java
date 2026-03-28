package com.edtech.notificationservice.controller;

import com.edtech.notificationservice.service.EmailService;
import com.edtech.notificationservice.service.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private OtpService otpService;

    @PostMapping("/send-login-alert")
    public ResponseEntity<?> sendLoginAlert(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String name = request.get("name");
        
        String subject = "New Login Detected on Easy Hiring";
        String body = String.format("Hello %s,\n\nA new login was detected on your Easy Hiring account recently. If this was you, you don't need to do anything. If not, please change your password immediately!\n\nRegards,\nThe Easy Hiring Team", name != null ? name : "User");
        
        emailService.sendEmail(email, subject, body);
        return ResponseEntity.ok(Map.of("message", "Login alert sent."));
    }

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String action = request.get("action"); // e.g., "COURSE_ENROLLMENT" or "LOGIN_2FA"
        
        String otp = otpService.generateAndSaveOtp(email, action);
        
        String subject = "Your Easy Hiring Verification Code";
        String body = "Hello,\n\nYour One-Time Password (OTP) for " + action + " is: " + otp + "\n\nThis code will expire in 10 minutes.\n\nRegards,\nThe Easy Hiring Team";
        
        emailService.sendEmail(email, subject, body);
        
        return ResponseEntity.ok(Map.of("message", "OTP sent successfully."));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");
        String action = request.get("action");

        boolean isValid = otpService.verifyOtp(email, otp, action);

        if (isValid) {
            return ResponseEntity.ok(Map.of("valid", true, "message", "OTP Verified Successfully."));
        } else {
            // Return 400 Bad Request
            return ResponseEntity.badRequest().body(Map.of("valid", false, "message", "Invalid or Expired OTP."));
        }
    }
}
