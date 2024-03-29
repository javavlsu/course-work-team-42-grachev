package ru.grachev.university.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@Table(name = "test")
@AllArgsConstructor
@NoArgsConstructor
public class Test {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    @ManyToOne
    @JsonIgnore
    public Course course;
    public String theme;
    @OneToMany(mappedBy = "test")
    public List<Question> questions;
    @ManyToMany
    public List<Student> passedStudents;
    public LocalDate endDate;
    public Boolean isAvailable;

    public Test(Course course, String theme, List<Question> questions, List<Student> passedStudents, LocalDate endDate, Boolean isAvailable) {
        this.course = course;
        this.theme = theme;
        this.questions = questions;
        this.passedStudents = passedStudents;
        this.endDate = endDate;
        this.isAvailable = isAvailable;
    }
}
