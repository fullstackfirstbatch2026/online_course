package com.example.demo.repository;

import com.example.demo.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CourseRepository
        extends JpaRepository<Course, Integer> {

    @Query(value = """
        SELECT
            c.course_id,
            c.course_name,
            COUNT(e.enrollment_id) AS enrollment_count
        FROM courses c
        LEFT JOIN enrollments e
            ON c.course_id = e.course_id
        GROUP BY c.course_id, c.course_name
        HAVING COUNT(e.enrollment_id) >
        (
            SELECT AVG(course_count)
            FROM
            (
                SELECT COUNT(*) AS course_count
                FROM enrollments
                GROUP BY course_id
            ) AS counts
        )
        """, nativeQuery = true)
    List<Object[]> findCoursesAboveAverage();
}
