package com.example.demo.repository;


import com.example.demo.entity.Instructor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstructorRepository
        extends JpaRepository<Instructor, Integer> {
}
