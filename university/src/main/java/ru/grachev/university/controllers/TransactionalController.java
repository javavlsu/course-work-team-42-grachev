package ru.grachev.university.controllers;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.grachev.university.service.TransactionalService;

@RestController
@RequestMapping("/api/transactional")
@RequiredArgsConstructor
public class TransactionalController {

    private final TransactionalService transactionalService;

    @Transactional
    @GetMapping("pass1pass2")
    public String pass1pass2() {

        String str = transactionalService.createAppealForPass();
        transactionalService.createServiceInfoForPass2();
        if (str != null) throw new RuntimeException("test");

        return "klass";
    }

    @Transactional
    @GetMapping("fail1fail2")
    public String fail1fail2() {

        String str = transactionalService.createAppealForFail();
        transactionalService.createServicesInfoForFail2();
        if (str != null) throw new RuntimeException("test");

        return "klass";
    }

    @Transactional
    @GetMapping("pass1fail2")
    public String pass1fail2() {

        transactionalService.createAppealForFail3();
        String str = transactionalService.createServicesInfoForPass3();

        return "klass";
    }

    @Transactional
    @GetMapping("fail1pass2")
    public String fail1pass2() {

        String str = transactionalService.createServicesInfoForPass4();
        transactionalService.createAppealForFail4();

        if (str != null) throw new RuntimeException("test");

        return "klass";
    }
}
