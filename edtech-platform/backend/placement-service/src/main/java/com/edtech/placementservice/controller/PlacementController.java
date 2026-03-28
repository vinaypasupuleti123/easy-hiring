package com.edtech.placementservice.controller;

import com.edtech.placementservice.dto.ApplicationRequest;
import com.edtech.placementservice.dto.JobRequest;
import com.edtech.placementservice.entity.Job;
import com.edtech.placementservice.entity.JobApplication;
import com.edtech.placementservice.service.PlacementService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/placements")
public class PlacementController {

    @Autowired
    private PlacementService placementService;

    @PostMapping("/jobs")
    public ResponseEntity<Job> createJob(@RequestBody @Valid JobRequest request) {
        return ResponseEntity.ok(placementService.createJob(request));
    }

    @GetMapping("/jobs")
    public ResponseEntity<List<Job>> getAllJobs() {
        return ResponseEntity.ok(placementService.getAllJobs());
    }

    @PostMapping("/applications")
    public ResponseEntity<JobApplication> applyForJob(@RequestBody @Valid ApplicationRequest request) {
        return ResponseEntity.ok(placementService.applyForJob(request));
    }

    @GetMapping("/applications/student/{studentId}")
    public ResponseEntity<List<JobApplication>> getStudentApplications(@PathVariable Long studentId) {
        return ResponseEntity.ok(placementService.getStudentApplications(studentId));
    }

    @GetMapping("/applications/job/{jobId}")
    public ResponseEntity<List<JobApplication>> getJobApplications(@PathVariable Long jobId) {
        return ResponseEntity.ok(placementService.getJobApplications(jobId));
    }

    @PutMapping("/applications/{id}/status")
    public ResponseEntity<JobApplication> updateApplicationStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(placementService.updateApplicationStatus(id, status));
    }
}
