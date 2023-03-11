package ru.grachev.university.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.grachev.university.model.Account;
import ru.grachev.university.service.AccountServices;

import java.util.Objects;

@AllArgsConstructor
@RestController
@RequestMapping("/api/account")
public class AccountController {

    private final AccountServices accountServices;

    @PostMapping("register")
    public ResponseEntity<Account> register(@RequestBody Account regAccount) {
        Account createdAccount = accountServices.create(new Account(regAccount));
        return ResponseEntity.ok(createdAccount);
    }

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody Account logAccount) {
        String role = accountServices.getRoleByLoginAndPassword(logAccount.login,logAccount.password);
        return !Objects.equals(role, "err")
                ? ResponseEntity.accepted().body(role)
                : ResponseEntity.ok(role);
    }

}
