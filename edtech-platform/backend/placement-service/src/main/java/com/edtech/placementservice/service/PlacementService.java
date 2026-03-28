package com.edtech.placementservice.service;

import com.edtech.placementservice.dto.ApplicationRequest;
import com.edtech.placementservice.dto.JobRequest;
import com.edtech.placementservice.entity.Job;
import com.edtech.placementservice.entity.JobApplication;
import com.edtech.placementservice.repository.ApplicationRepository;
import com.edtech.placementservice.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlacementService {

    @Autowired
    private JobRepository jobRepository;
    @Autowired
    private ApplicationRepository applicationRepository;

    public Job createJob(JobRequest request) {
        Job job = new Job();
        job.setTitle(request.getTitle());
        job.setCompany(request.getCompany());
        job.setDescription(request.getDescription());
        job.setSalary(request.getSalary());
        return jobRepository.save(job);
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Job getJobById(Long id) {
        return jobRepository.findById(id).orElseThrow(() -> new RuntimeException("Job not found"));
    }

    public JobApplication applyForJob(ApplicationRequest request) {
        if (applicationRepository.findByStudentIdAndJobId(request.getStudentId(), request.getJobId()).isPresent()) {
            throw new RuntimeException("You have already applied for this job");
        }
        JobApplication app = new JobApplication();
        app.setJobId(request.getJobId());
        app.setStudentId(request.getStudentId());
        return applicationRepository.save(app);
    }

    public List<JobApplication> getStudentApplications(Long studentId) {
        return applicationRepository.findByStudentId(studentId);
    }

    public List<JobApplication> getJobApplications(Long jobId) {
        return applicationRepository.findByJobId(jobId);
    }

    public JobApplication updateApplicationStatus(Long applicationId, String status) {
        JobApplication app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        app.setStatus(status);
        return applicationRepository.save(app);
    }
}
