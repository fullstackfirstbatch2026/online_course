package com.example.demo.service;

import com.example.demo.entity.Instructor;
import com.example.demo.repository.InstructorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstructorService {

    private final InstructorRepository instructorRepository;

    public InstructorService(InstructorRepository instructorRepository) {
        this.instructorRepository = instructorRepository;
    }

    public List<Instructor> getAllInstructors() {
        return instructorRepository.findAll();
    }

    public Instructor getInstructorById(Integer id) {
        return instructorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Instructor not found"));
    }

    public Instructor addInstructor(Instructor instructor) {
        return instructorRepository.save(instructor);
    }

    public Instructor updateInstructor(Integer id, Instructor updatedInstructor) {
        Instructor instructor = getInstructorById(id);
        instructor.setInstructorName(updatedInstructor.getInstructorName());
        instructor.setEmail(updatedInstructor.getEmail());
        return instructorRepository.save(instructor);
    }

    public void deleteInstructor(Integer id) {
        if (!instructorRepository.existsById(id)) {
            throw new RuntimeException("Instructor not found");
        }
        instructorRepository.deleteById(id);
    }
}
