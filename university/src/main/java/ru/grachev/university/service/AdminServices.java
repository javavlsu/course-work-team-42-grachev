package ru.grachev.university.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.grachev.university.model.Account;
import ru.grachev.university.model.Student;
import ru.grachev.university.model.viewModel.SetRoleModel;
import ru.grachev.university.repository.AccountRepository;
import ru.grachev.university.repository.GroupRepository;
import ru.grachev.university.repository.StudentRepository;

import java.util.List;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class AdminServices {

    private final AccountRepository accountRepository;
    private final StudentRepository studentRepository;
    private final GroupRepository groupRepository;

    public void setUserRole(SetRoleModel model) {
        Account account = accountRepository.findFirstByLogin(model.login);
        if (Objects.equals(model.role, "student")) {
            var student = new Student();
            student.account = account;
            student.account.role = model.role;
            student.department = model.department;
            student.group = groupRepository.findFirstByTitle(model.group);
            studentRepository.save(student);
        } else {
            account.role = model.role;
            accountRepository.save(account);
        }
    }

    public List<Account> getAllUsers() {
        return accountRepository.findAll();
    }
}
