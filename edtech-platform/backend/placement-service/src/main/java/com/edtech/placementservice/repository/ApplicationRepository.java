package com.edtech.placementservice.repository;

import com.edtech.placementservice.entity.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findByStudentId(Long studentId);

    List<JobApplication> findByJobId(Long jobId);

    Optional<JobApplication> findByStudentIdAndJobId(Long studentId, Long jobId);
}
