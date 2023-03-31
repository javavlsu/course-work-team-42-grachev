package ru.grachev.university.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.grachev.university.model.Course;

import java.util.List;

@Repository
@Transactional
public interface CourseRepository extends JpaRepository<Course, Long> {
    Course findFirstById(String id);

}
