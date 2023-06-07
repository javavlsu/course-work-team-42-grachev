package ru.grachev.university.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@Table(name = "course")
@AllArgsConstructor
@NoArgsConstructor
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    public String title;
    public String teacher;
    @OneToMany(mappedBy = "course")
    public List<Test> tests;

    public Course(String title, String teacher, List<Test> tests) {
        this.title = title;
        this.teacher = teacher;
        this.tests = tests;
    }
}
