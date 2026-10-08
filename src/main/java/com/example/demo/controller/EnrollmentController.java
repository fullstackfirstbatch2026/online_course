package com.example.demo.controller;

import com.example.demo.service.EnrollmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "*")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    // JOIN
    @GetMapping
    public List<Map<String, Object>> getEnrolledStudents() {
        return enrollmentService.getEnrolledStudents();
    }

    // PROCEDURE / ENROLLMENT
    @PostMapping
    public ResponseEntity<String> enrollStudent(@RequestBody EnrollmentRequest request) {
        try {
            enrollmentService.enrollStudent(
                    request.studentId(),
                    request.courseId()
            );
            return ResponseEntity.ok("Student enrolled successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Enrollment failed: " + e.getMessage());
        }
    }

    // FUNCTION
    @GetMapping("/count/{courseId}")
    public Integer getEnrollmentCount(@PathVariable Integer courseId) {
        return enrollmentService.getEnrollmentCount(courseId);
    }

    public record EnrollmentRequest(
            Integer studentId,
            Integer courseId
    ) {
    }
}