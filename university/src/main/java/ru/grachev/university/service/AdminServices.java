package ru.grachev.university.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.grachev.university.model.Account;
import ru.grachev.university.model.viewModel.AdminTableUsersView;
import ru.grachev.university.model.viewModel.SetRoleModel;
import ru.grachev.university.repository.AccountRepository;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class AdminServices {

    private final AccountRepository accountRepository;

    public void setUserRole(SetRoleModel model) {
        Account account = accountRepository.findFirstByLogin(model.login);
        account.role = model.role;
        accountRepository.save(account);
    }

    public List<Account> getAllUsers() {
        return accountRepository.findAll();
    }
}
