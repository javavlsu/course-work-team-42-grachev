package ru.grachev.university.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.grachev.university.model.Account;
import ru.grachev.university.model.viewModel.UpdateAccount;
import ru.grachev.university.service.AccountServices;

@RestController
@RequestMapping("/api/account")
@RequiredArgsConstructor
public class AccountController {

    private final AccountServices accountServices;


    @PostMapping("register")
    public Account register(@RequestBody Account regAccount) {
        return accountServices.create(new Account(regAccount));
    }

    @GetMapping
    public Account getUserInfo(Authentication auth) {
        return accountServices.getUserInfo(auth.getName());
    }

    @PostMapping("updateinfo")
    public Account updateAccountInfo(@RequestBody UpdateAccount model, Authentication auth) {
        return accountServices.updateAccountInfo(model, auth.getName());
    }

    @GetMapping("getrole")
    public String getRoleByLogin(Authentication auth) {
        return accountServices.getRole(auth.getName());
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
