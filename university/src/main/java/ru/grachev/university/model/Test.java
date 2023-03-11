package ru.grachev.university.model;

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
    public String theme;
    @OneToMany
    public List<Question> questions;
    @ManyToMany
    public List<Student> passedStudents;
    public LocalDate endDate;
    public Boolean isAvailable;
}
