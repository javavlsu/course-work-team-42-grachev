package ru.grachev.university.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.grachev.university.model.Question;

@Repository
@Transactional
public interface QuestionRepository extends JpaRepository<Question, Long> {
}
