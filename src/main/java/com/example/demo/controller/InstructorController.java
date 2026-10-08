package com.example.demo.controller;

import com.example.demo.entity.Instructor;
import com.example.demo.service.InstructorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/instructors")
@CrossOrigin(origins = "*")
public class InstructorController {

    private final InstructorService instructorService;

    public InstructorController(InstructorService instructorService) {
        this.instructorService = instructorService;
    }

    @GetMapping
    public List<Instructor> getAllInstructors() {
        return instructorService.getAllInstructors();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Instructor> getInstructorById(@PathVariable Integer id) {
        return ResponseEntity.ok(instructorService.getInstructorById(id));
    }

    @PostMapping
    public ResponseEntity<Instructor> addInstructor(@RequestBody Instructor instructor) {
        return ResponseEntity.ok(instructorService.addInstructor(instructor));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Instructor> updateInstructor(@PathVariable Integer id, @RequestBody Instructor instructor) {
        return ResponseEntity.ok(instructorService.updateInstructor(id, instructor));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInstructor(@PathVariable Integer id) {
        instructorService.deleteInstructor(id);
        return ResponseEntity.noContent().build();
    }
}
