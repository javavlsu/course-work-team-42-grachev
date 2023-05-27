package ru.grachev.university.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.grachev.university.model.Account;

import java.util.List;

@Repository
@Transactional
public interface AccountRepository extends JpaRepository<Account, Long> {
    Account findFirstByLoginAndPassword(String login, String password);

    Account findFirstByLogin(String login);

    Integer countByLogin(String login);

    Integer countByEmail(String email);

    List<Account> findAccountsByRoleIsNull();

}
