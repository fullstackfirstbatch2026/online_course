package com.example.demo.service;

import com.example.demo.entity.Course;
import com.example.demo.repository.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourseById(Integer id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
    }

    public Course addCourse(Course course) {
        if (course.getAvailableSeats() == null) {
            course.setAvailableSeats(course.getTotalSeats());
        }
        return courseRepository.save(course);
    }

    public Course updateCourse(Integer id, Course updatedCourse) {
        Course course = getCourseById(id);
        course.setCourseName(updatedCourse.getCourseName());
        course.setTotalSeats(updatedCourse.getTotalSeats());
        if (updatedCourse.getAvailableSeats() != null) {
            course.setAvailableSeats(updatedCourse.getAvailableSeats());
        }
        if (updatedCourse.getInstructor() != null) {
            course.setInstructor(updatedCourse.getInstructor());
        }
        return courseRepository.save(course);
    }

    public void deleteCourse(Integer id) {
        if (!courseRepository.existsById(id)) {
            throw new RuntimeException("Course not found");
        }
        courseRepository.deleteById(id);
    }

    public List<Map<String, Object>> getCoursesAboveAverage() {
        List<Object[]> results = courseRepository.findCoursesAboveAverage();
        List<Map<String, Object>> response = new ArrayList<>();

        for (Object[] row : results) {
            Map<String, Object> course = new HashMap<>();
            course.put("courseId", row[0]);
            course.put("courseName", row[1]);
            course.put("enrollmentCount", row[2]);
            response.add(course);
        }

        return response;
    }
}
