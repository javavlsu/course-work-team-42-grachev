package ru.grachev.university.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ru.grachev.university.model.Student;
import ru.grachev.university.model.viewModel.StudentInfo;
import ru.grachev.university.model.viewModel.UpdateUserViewModel;
import ru.grachev.university.service.StudentServices;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
public class StudentController {

    private final StudentServices studentServices;

    @GetMapping("getstudentinfo")
    public StudentInfo getStudentInfo(Authentication auth) {
        return studentServices.getStudentInfo(auth.getName());
    }

    @PostMapping("updatestudentinfo")
    public Student updateUserInfo(@RequestBody UpdateUserViewModel model) {
        return studentServices.updateStudentInfo(model);
    }
}
