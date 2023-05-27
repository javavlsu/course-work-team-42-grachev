package ru.grachev.university.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.grachev.university.model.Student;
import ru.grachev.university.model.viewModel.UpdateUserViewModel;
import ru.grachev.university.model.viewModel.UserViewModel;
import ru.grachev.university.service.UserServices;

//TODO: исправильно путь на api/student(фронт)
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserServices userServices;

    @GetMapping("getStudentByLogin/{login}")
    public ResponseEntity<UserViewModel> getStudentByLogin(@PathVariable String login) {
        return ResponseEntity.ok(userServices.getStudentByLogin(login));
    }

    @GetMapping("getname/{login}")
    public ResponseEntity<String> getNameByLogin(@PathVariable String login) {
        return ResponseEntity.ok(userServices.getNameByLogin(login));
    }

    @PostMapping("updatestudentinfo")
    public ResponseEntity<Student> updateUserInfo(@RequestBody UpdateUserViewModel model) {
        return ResponseEntity.ok(userServices.updateStudentInfo(model));
    }
}
