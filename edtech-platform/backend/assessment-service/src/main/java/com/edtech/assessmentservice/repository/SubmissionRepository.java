package com.edtech.assessmentservice.repository;

import com.edtech.assessmentservice.entity.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByStudentId(Long studentId);

    List<Submission> findByQuizId(Long quizId);
}
