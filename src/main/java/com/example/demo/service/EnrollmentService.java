package com.example.demo.service;

import com.example.demo.repository.EnrollmentRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;

    @PersistenceContext
    private EntityManager entityManager;

    public EnrollmentService(
            EnrollmentRepository enrollmentRepository) {

        this.enrollmentRepository = enrollmentRepository;
    }

    // JOIN
    public List<Map<String, Object>> getEnrolledStudents() {

        List<Object[]> results =
                enrollmentRepository.findEnrolledStudents();

        List<Map<String, Object>> response = new ArrayList<>();

        for (Object[] row : results) {

            Map<String, Object> student = new HashMap<>();

            student.put("studentName", row[0]);
            student.put("email", row[1]);
            student.put("courseName", row[2]);
            student.put("instructorName", row[3]);
            student.put("enrollmentDate", row[4]);

            response.add(student);
        }

        return response;
    }

    // PROCEDURE
    @Transactional
    public void enrollStudent(
            Integer studentId,
            Integer courseId) {

        entityManager
                .createNativeQuery(
                        "CALL enroll_student(:studentId, :courseId)"
                )
                .setParameter("studentId", studentId)
                .setParameter("courseId", courseId)
                .executeUpdate();
    }

    // FUNCTION
    public Integer getEnrollmentCount(Integer courseId) {

        return enrollmentRepository.getEnrollmentCount(courseId);
    }
}