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
    public ResponseEntity<?> getServicesInfo() {
        final ServicesInfo lastInfo = servicesInfoService.getLastInfo();
        return lastInfo != null
                ? ResponseEntity.ok(lastInfo)
                : ResponseEntity.ok().body(HttpStatus.NOT_FOUND);
    }

    @PostMapping("appeal")
    public ResponseEntity<Appeal> postAppeal(@RequestBody Appeal footerAppeal) {
        Appeal newAppeal = appealServices.create(footerAppeal);
        return ResponseEntity.ok(newAppeal);
    }

}
