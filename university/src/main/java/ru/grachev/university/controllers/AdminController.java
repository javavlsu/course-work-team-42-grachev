package ru.grachev.university.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ru.grachev.university.model.Account;
import ru.grachev.university.model.viewModel.AdminTableUsersView;
import ru.grachev.university.model.viewModel.SetRoleModel;
import ru.grachev.university.service.AdminServices;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
//@PreAuthorize("hasAuthority('admin')")
public class AdminController {

    private final AdminServices adminServices;

    @GetMapping("getallusers")
    public List<Account> getAllUsers() {
        return adminServices.getAllUsers();
    }

    //TODO: привязывать студента для чела при смене роли
    @PostMapping("setuserrole")
    public void setUserRoleByLogin(@RequestBody SetRoleModel model) {
        adminServices.setUserRole(model);
    }
}
