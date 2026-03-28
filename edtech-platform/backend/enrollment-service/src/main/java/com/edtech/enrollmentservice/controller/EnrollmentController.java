package com.edtech.enrollmentservice.controller;

import com.edtech.enrollmentservice.dto.EnrollmentRequest;
import com.edtech.enrollmentservice.entity.Enrollment;
import com.edtech.enrollmentservice.service.EnrollmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    @PostMapping
    public ResponseEntity<Enrollment> enrollStudent(@RequestBody @Valid EnrollmentRequest request) {
        return ResponseEntity.ok(enrollmentService.enrollStudent(request));
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Enrollment>> getStudentEnrollments(@PathVariable Long studentId) {
        return ResponseEntity.ok(enrollmentService.getStudentEnrollments(studentId));
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Enrollment>> getCourseEnrollments(@PathVariable Long courseId) {
        return ResponseEntity.ok(enrollmentService.getCourseEnrollments(courseId));
    }

    @PutMapping("/{id}/progress")
    public ResponseEntity<Enrollment> updateProgress(@PathVariable Long id, @RequestParam Integer progress) {
        return ResponseEntity.ok(enrollmentService.updateProgress(id, progress));
    }
}
