package ru.grachev.university.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.grachev.university.model.Account;
import ru.grachev.university.service.AccountServices;

@RestController
@RequestMapping("/api/account")
@RequiredArgsConstructor
public class AccountController {

    private final AccountServices accountServices;

    @PostMapping("register")
    public ResponseEntity<Account> register(@RequestBody Account regAccount) {
        Account createdAccount = accountServices.create(new Account(regAccount));
        return ResponseEntity.ok(createdAccount);
    }

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody Account logAccount) {
        String role = accountServices.getRole(logAccount.login, logAccount.password);
        if (role != null) {
            return ResponseEntity.accepted().body(role);
        }
        return ResponseEntity.ok("err");
    }

    @GetMapping("rolebylogin")
    public ResponseEntity<String> getRoleByLogin(@RequestParam("login") String login) {
        String role = accountServices.getRole(login);
        return role != null ? ResponseEntity.ok(role) : ResponseEntity.ok("err");
    }

    @GetMapping("existslogin")
    public ResponseEntity<Boolean> isLoginExist(@RequestParam("login") String login) {
        return ResponseEntity.ok(accountServices.isLoginExists(login));
    }

    @GetMapping("existsemail")
    public ResponseEntity<Boolean> isEmailExist(@RequestParam("email") String email) {
        return ResponseEntity.ok(accountServices.isEmailExists(email));
    }
}
