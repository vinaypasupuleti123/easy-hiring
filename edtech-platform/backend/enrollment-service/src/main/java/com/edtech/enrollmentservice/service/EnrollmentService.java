package com.edtech.enrollmentservice.service;

import com.edtech.enrollmentservice.dto.EnrollmentRequest;
import com.edtech.enrollmentservice.entity.Enrollment;
import com.edtech.enrollmentservice.repository.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    public Enrollment enrollStudent(EnrollmentRequest request) {
        if (enrollmentRepository.findByStudentIdAndCourseId(request.getStudentId(), request.getCourseId())
                .isPresent()) {
            throw new RuntimeException("Student is already enrolled in this course");
        }
        Enrollment enrollment = new Enrollment(request.getStudentId(), request.getCourseId());
        return enrollmentRepository.save(enrollment);
    }

    public List<Enrollment> getStudentEnrollments(Long studentId) {
        return enrollmentRepository.findByStudentId(studentId);
    }

    public List<Enrollment> getCourseEnrollments(Long courseId) {
        return enrollmentRepository.findByCourseId(courseId);
    }

    public Enrollment updateProgress(Long enrollmentId, Integer progress) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));
        enrollment.setProgressPercentage(progress);
        return enrollmentRepository.save(enrollment);
    }
}
