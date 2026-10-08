package com.example.demo.repository;

import com.example.demo.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EnrollmentRepository
        extends JpaRepository<Enrollment, Integer> {

    // JOIN query
    @Query(value = """
        SELECT
            s.student_name,
            s.email,
            c.course_name,
            i.instructor_name,
            e.enrollment_date
        FROM enrollments e
        JOIN students s
            ON e.student_id = s.student_id
        JOIN courses c
            ON e.course_id = c.course_id
        JOIN instructors i
            ON c.instructor_id = i.instructor_id
        """, nativeQuery = true)
    List<Object[]> findEnrolledStudents();



    // Stored function / Native query
    @Query(value = "SELECT get_enrollment_count(:courseId)",
            nativeQuery = true)
    Integer getEnrollmentCount(
            @Param("courseId") Integer courseId
    );
}
