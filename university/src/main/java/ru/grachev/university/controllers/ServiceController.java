package ru.grachev.university.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.grachev.university.model.Appeal;
import ru.grachev.university.model.ServicesInfo;
import ru.grachev.university.service.AppealServices;
import ru.grachev.university.service.ServicesInfoService;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ServiceController {
    private final ServicesInfoService servicesInfoService;
    private final AppealServices appealServices;

    @GetMapping("servicesinfo")
    public ServicesInfo getServicesInfo() {
        return servicesInfoService.getLastInfo();
    }

    @PostMapping("appeal")
    public Appeal postAppeal(@RequestBody Appeal footerAppeal) {
        return appealServices.create(footerAppeal);
    }

}
