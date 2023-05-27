package ru.grachev.university.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.grachev.university.model.Account;
import ru.grachev.university.model.Group;
import ru.grachev.university.model.Student;
import ru.grachev.university.model.viewModel.UpdateUserViewModel;
import ru.grachev.university.model.viewModel.UserViewModel;
import ru.grachev.university.repository.AccountRepository;
import ru.grachev.university.repository.GroupRepository;
import ru.grachev.university.repository.StudentRepository;

import java.util.Objects;

@Component
@RequiredArgsConstructor
public class UserServices {

    private final StudentRepository studentRepository;
    private final AccountRepository accountRepository;
    private final GroupRepository groupRepository;

    public UserViewModel getStudentByLogin(String login) {
        Student student = studentRepository.findFirstByAccount_Login(login);
        if (student == null) {
            Account account = accountRepository.findFirstByLogin(login);
            return new UserViewModel(
                    account.name,
                    account.surname,
                    account.patronymic,
                    account.login,
                    account.email,
                    "Не указано",
                    "Не указано",
                    !(account.role == null) ? account.role : "Не указано",
                    account.score
            );
        } else {
            return new UserViewModel(
                    student.account.name,
                    student.account.surname,
                    student.account.patronymic,
                    student.account.login,
                    student.account.email,
                    student.group.title,
                    student.department,
                    student.account.role,
                    student.account.score
            );
        }
    }

    public String getNameByLogin(String login) {
        return accountRepository.findFirstByLogin(login).name;
    }

    public Student updateStudentInfo(UpdateUserViewModel model) {
        Student student = studentRepository.findFirstByAccount_Login(model.login);
        if (!Objects.equals(model.newPassword, "")) {
            student.account.password = model.newPassword;
        }
        if (!Objects.equals(model.group, "")) {
            Group group = groupRepository.findFirstByTitle(model.group);
            if (group != null) {
                student.group = group;
            }
        }
        if (!Objects.equals(model.departament, "")) {
            student.department = model.departament;
        }
        if (!Objects.equals(model.name, "")) {
            student.account.name = model.name;
        }
        if (!Objects.equals(model.surname, "")) {
            student.account.surname = model.surname;
        }
        if (!Objects.equals(model.patronomic, "")) {
            student.account.patronymic = model.patronomic;
        }
        if (!Objects.equals(model.email, "")) {
            student.account.email = model.email;
        }

        return studentRepository.save(student);
    }
}
