package ru.grachev.university.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.grachev.university.model.viewModel.AdminTableUsersView;
import ru.grachev.university.model.viewModel.SetRoleModel;
import ru.grachev.university.service.AdminServices;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminServices adminServices;

    @GetMapping("userswithoutrole")
    public ResponseEntity<List<AdminTableUsersView>> getAllUsersWithoutRole() {
        return ResponseEntity.ok(adminServices.getUsersWithoutRole());
    }

    //TODO: привязывать студента для чела при смене роли
    @PostMapping("setuserrole")
    public ResponseEntity<?> setUserRoleByLogin(@RequestBody SetRoleModel model) {
        adminServices.setUserRole(model);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
