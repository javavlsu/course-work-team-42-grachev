package ru.grachev.university.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.grachev.university.model.Account;
import ru.grachev.university.model.viewModel.SetRoleModel;
import ru.grachev.university.service.AdminServices;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminServices adminServices;

    @GetMapping("getallusers")
    public List<Account> getAllUsers() {
        return adminServices.getAllUsers();
    }

    @PostMapping("setuserrole")
    public void setUserRoleByLogin(@RequestBody SetRoleModel model) {
        adminServices.setUserRole(model);
    }
}
