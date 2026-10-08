package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "instructors")
public class Instructor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer instructorId;

    private String instructorName;

    @Column(unique = true)
    private String email;

    public Instructor() {
    }

    public Instructor(Integer instructorId, String instructorName, String email) {
        this.instructorId = instructorId;
        this.instructorName = instructorName;
        this.email = email;
    }

    public Integer getInstructorId() {
        return instructorId;
    }

    public void setInstructorId(Integer instructorId) {
        this.instructorId = instructorId;
    }

    public String getInstructorName() {
        return instructorName;
    }

    public void setInstructorName(String instructorName) {
        this.instructorName = instructorName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}