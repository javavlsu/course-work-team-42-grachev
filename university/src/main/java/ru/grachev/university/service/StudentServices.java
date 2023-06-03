package ru.grachev.university.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ru.grachev.university.model.Group;
import ru.grachev.university.model.Student;
import ru.grachev.university.model.viewModel.StudentInfo;
import ru.grachev.university.model.viewModel.UpdateUserViewModel;
import ru.grachev.university.repository.GroupRepository;
import ru.grachev.university.repository.StudentRepository;

import java.util.Objects;

@Component
@RequiredArgsConstructor
public class StudentServices {

    private final StudentRepository studentRepository;
    private final GroupRepository groupRepository;
    private final PasswordEncoder encoder;

    public StudentInfo getStudentInfo(String login) {
        var student = studentRepository.findFirstByAccount_Login(login);

        return new StudentInfo(student.department, student.group.title);
    }

    public Student updateStudentInfo(UpdateUserViewModel model) {
        Student student = studentRepository.findFirstByAccount_Login(model.login);
        if (!Objects.equals(model.newPassword, "")) {
            student.account.password = encoder.encode(model.newPassword);
        }
        if (!Objects.equals(model.group, "")) {
            Group group = groupRepository.findFirstByTitle(model.group);
            if (group != null) {
                student.group = group;
            }
        }
        if (!Objects.equals(model.department, "")) {
            student.department = model.department;
        }
        if (!Objects.equals(model.name, "")) {
            student.account.name = model.name;
        }
        if (!Objects.equals(model.surname, "")) {
            student.account.surname = model.surname;
        }
        if (!Objects.equals(model.patronymic, "")) {
            student.account.patronymic = model.patronymic;
        }
        if (!Objects.equals(model.email, "")) {
            student.account.email = model.email;
        }

        return studentRepository.save(student);
    }
}
