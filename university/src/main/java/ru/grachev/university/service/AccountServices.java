package ru.grachev.university.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.grachev.university.model.Account;
import ru.grachev.university.repository.AccountRepository;

@Component
@RequiredArgsConstructor
public class AccountServices {

    private final AccountRepository accountRepository;

    public Account create(Account account) { return accountRepository.save(account); }

    public String getRoleByLoginAndPassword(String login, String password) {
        Account account = accountRepository.findFirstByLoginAndPassword(login, password);
        return account != null ? account.role : "err";
    }
}
