package com.edtech.notificationservice.repository;

import com.edtech.notificationservice.entity.OtpRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface OtpRepository extends JpaRepository<OtpRecord, Long> {
    Optional<OtpRecord> findTopByEmailAndActionAndExpirationTimeAfterOrderByExpirationTimeDesc(String email, String action, LocalDateTime currentTime);
}
