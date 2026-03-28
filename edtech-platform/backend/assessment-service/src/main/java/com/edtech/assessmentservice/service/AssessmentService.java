package com.edtech.assessmentservice.service;

import com.edtech.assessmentservice.dto.QuestionRequest;
import com.edtech.assessmentservice.dto.QuizRequest;
import com.edtech.assessmentservice.entity.Question;
import com.edtech.assessmentservice.entity.Quiz;
import com.edtech.assessmentservice.entity.Submission;
import com.edtech.assessmentservice.repository.QuestionRepository;
import com.edtech.assessmentservice.repository.QuizRepository;
import com.edtech.assessmentservice.repository.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssessmentService {
    @Autowired
    private QuizRepository quizRepository;
    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private SubmissionRepository submissionRepository;

    public Quiz createQuiz(QuizRequest request) {
        Quiz quiz = new Quiz();
        quiz.setCourseId(request.getCourseId());
        quiz.setTitle(request.getTitle());

        int marks = request.getQuestions() != null ? request.getQuestions().size() : 0;
        quiz.setTotalMarks(marks);

        Quiz savedQuiz = quizRepository.save(quiz);

        if (request.getQuestions() != null) {
            for (QuestionRequest qReq : request.getQuestions()) {
                Question q = new Question();
                q.setQuizId(savedQuiz.getId());
                q.setText(qReq.getText());
                q.setOptionA(qReq.getOptionA());
                q.setOptionB(qReq.getOptionB());
                q.setOptionC(qReq.getOptionC());
                q.setOptionD(qReq.getOptionD());
                q.setCorrectOption(qReq.getCorrectOption());
                questionRepository.save(q);
            }
        }
        return savedQuiz;
    }

    public List<Quiz> getCourseQuizzes(Long courseId) {
        return quizRepository.findByCourseId(courseId);
    }

    public List<Question> getQuizQuestions(Long quizId) {
        return questionRepository.findByQuizId(quizId);
    }

    public Submission submitQuiz(Long quizId, Long studentId, Integer score) {
        Submission submission = new Submission();
        submission.setQuizId(quizId);
        submission.setStudentId(studentId);
        submission.setScore(score);
        return submissionRepository.save(submission);
    }

    public List<Submission> getStudentSubmissions(Long studentId) {
        return submissionRepository.findByStudentId(studentId);
    }
}
