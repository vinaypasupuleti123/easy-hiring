package com.edtech.assessmentservice.controller;

import com.edtech.assessmentservice.dto.QuizRequest;
import com.edtech.assessmentservice.entity.Question;
import com.edtech.assessmentservice.entity.Quiz;
import com.edtech.assessmentservice.entity.Submission;
import com.edtech.assessmentservice.service.AssessmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assessments")
public class AssessmentController {

    @Autowired
    private AssessmentService assessmentService;

    @PostMapping("/quizzes")
    public ResponseEntity<Quiz> createQuiz(@RequestBody @Valid QuizRequest request) {
        return ResponseEntity.ok(assessmentService.createQuiz(request));
    }

    @GetMapping("/quizzes/course/{courseId}")
    public ResponseEntity<List<Quiz>> getCourseQuizzes(@PathVariable Long courseId) {
        return ResponseEntity.ok(assessmentService.getCourseQuizzes(courseId));
    }

    @GetMapping("/quizzes/{quizId}/questions")
    public ResponseEntity<List<Question>> getQuizQuestions(@PathVariable Long quizId) {
        return ResponseEntity.ok(assessmentService.getQuizQuestions(quizId));
    }

    @PostMapping("/submissions")
    public ResponseEntity<Submission> submitQuiz(@RequestParam Long quizId,
            @RequestParam Long studentId,
            @RequestParam Integer score) {
        return ResponseEntity.ok(assessmentService.submitQuiz(quizId, studentId, score));
    }

    @GetMapping("/submissions/student/{studentId}")
    public ResponseEntity<List<Submission>> getStudentSubmissions(@PathVariable Long studentId) {
        return ResponseEntity.ok(assessmentService.getStudentSubmissions(studentId));
    }
}
