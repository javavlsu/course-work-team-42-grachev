package ru.grachev.university.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ru.grachev.university.model.Account;
import ru.grachev.university.model.viewModel.UpdateAccount;
import ru.grachev.university.repository.AccountRepository;

@Component
@RequiredArgsConstructor
public class AccountServices {

    private final AccountRepository accountRepository;
    private final PasswordEncoder encoder;

    public Account create(Account account) {
        account.setPassword(encoder.encode(account.password));
        return accountRepository.save(account);
    }

    public Account getUserInfo(String login) {
        return accountRepository.findFirstByLogin(login);
    }

    public Account updateAccountInfo(UpdateAccount model, String login) {
        var account = accountRepository.findFirstByLogin(login);

        model.newPassword = encoder.encode(model.newPassword);
        account.updateInfo(model);

        return accountRepository.save(account);
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
