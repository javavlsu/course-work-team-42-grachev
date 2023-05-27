package ru.grachev.university.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.grachev.university.model.Group;

@Repository
@Transactional
public interface GroupRepository extends JpaRepository<Group, Long> {
    Group findFirstByTitle(String title);
}
