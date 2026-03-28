package com.edtech.notificationservice.service;

import com.edtech.notificationservice.entity.OtpRecord;
import com.edtech.notificationservice.repository.OtpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class OtpService {

    @Autowired
    private OtpRepository otpRepository;

    public String generateAndSaveOtp(String email, String action) {
        String otpCode = String.format("%06d", new Random().nextInt(999999));
        
        OtpRecord record = new OtpRecord(email, otpCode, action, LocalDateTime.now().plusMinutes(10));
        otpRepository.save(record);
        
        return otpCode;
    }

    public boolean verifyOtp(String email, String otpCode, String action) {
        Optional<OtpRecord> recordOpt = otpRepository.findTopByEmailAndActionAndExpirationTimeAfterOrderByExpirationTimeDesc(
                email, action, LocalDateTime.now()
        );
        
        if (recordOpt.isPresent()) {
            OtpRecord record = recordOpt.get();
            if (record.getOtpCode().equals(otpCode)) {
                // OTP used, delete it or mark used. Deleting for simplicity
                otpRepository.delete(record);
                return true;
            }
        }
        return false;
    }
}
