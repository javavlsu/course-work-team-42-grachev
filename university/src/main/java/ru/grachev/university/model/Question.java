package ru.grachev.university.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@Table(name = "question")
@AllArgsConstructor
@NoArgsConstructor
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    @ManyToOne
    @JsonIgnore
    public Test test;
    public String question;
    @OneToMany(mappedBy = "question")
    public List<Answer> answers;

    public Question(Test test, String question, List<Answer> answers) {
        this.test = test;
        this.question = question;
        this.answers = answers;
    }
}
