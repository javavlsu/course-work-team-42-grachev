package ru.grachev.university.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ru.grachev.university.model.Student;
import ru.grachev.university.model.viewModel.UpdateUserViewModel;
import ru.grachev.university.model.viewModel.UserViewModel;
import ru.grachev.university.service.UserServices;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
public class StudentController {

    private final UserServices userServices;

    @GetMapping("getStudentByLogin")
    public UserViewModel getStudentByLogin(Authentication auth) {
        return userServices.getStudentByLogin(auth.getName());
    }

    @GetMapping("getname")
    public String getNameByLogin(Authentication auth) {
        return userServices.getNameByLogin(auth.getName());
    }

    @PostMapping("updatestudentinfo")
    public Student updateUserInfo(@RequestBody UpdateUserViewModel model) {
        return userServices.updateStudentInfo(model);
    }
}
