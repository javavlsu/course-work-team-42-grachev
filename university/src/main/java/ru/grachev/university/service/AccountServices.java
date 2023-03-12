package ru.grachev.university.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.grachev.university.model.Account;
import ru.grachev.university.repository.AccountRepository;

@Component
@RequiredArgsConstructor
public class AccountServices {

    private final AccountRepository accountRepository;

    public Account create(Account account) {
        return accountRepository.save(account);
    }

    public String getRole(String login, String password) {
        Account account = accountRepository.findFirstByLoginAndPassword(login, password);
        return account != null ? account.role : null;
    }

    public String getRole(String login) {
        Account account = accountRepository.findFirstByLogin(login);
        return account != null ? account.role : null;
    }

    public Boolean isLoginExists(String login) {
        Integer count = accountRepository.countByLogin(login);
        return count == 0;
    }

    public Boolean isEmailExists(String email) {
        Integer count = accountRepository.countByEmail(email);
        return count == 0;
    }
}
