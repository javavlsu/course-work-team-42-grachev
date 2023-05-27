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

    public List<AdminTableUsersView> getUsersWithoutRole() {
        List<Account> usersWithoutRole = accountRepository.findAccountsByRoleIsNull();

        List<AdminTableUsersView> adminViewUsers = new ArrayList<>();
        for (Account user : usersWithoutRole) {
            adminViewUsers.add(new AdminTableUsersView(user.login, user.registerDate));
        }
        return adminViewUsers;
    }

    public void setUserRole(SetRoleModel model) {
        Account account = accountRepository.findFirstByLogin(model.login);
        account.role = model.role;
        accountRepository.save(account);
    }
}
