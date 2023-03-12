package ru.grachev.university.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.grachev.university.model.Student;

@Repository
@Transactional
public interface StudentRepository extends JpaRepository<Student, Long> {
    Student findFirstByAccount_Login(String login);
}
