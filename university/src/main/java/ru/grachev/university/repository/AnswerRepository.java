package ru.grachev.university.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Repository;
import ru.grachev.university.model.Answer;

@Repository
@Transactional
public interface AnswerRepository extends JpaRepository<Answer, Long> {
}
