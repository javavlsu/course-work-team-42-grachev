package ru.grachev.university.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.grachev.university.model.Appeal;
import ru.grachev.university.model.ServicesInfo;
import ru.grachev.university.model.viewModel.FooterAppeal;
import ru.grachev.university.service.AppealServices;
import ru.grachev.university.service.ServicesInfoService;

import java.time.LocalDate;

@AllArgsConstructor
@RestController
@RequestMapping("/api")
public class ServiceController {
    private final ServicesInfoService servicesInfoService;
    private final AppealServices appealServices;

    @GetMapping("/servicesinfo")
    public ResponseEntity<ServicesInfo> getServicesInfo()
    {
        final ServicesInfo lastInfo = servicesInfoService.getLastInfo();
        return lastInfo != null
                ? new ResponseEntity<>(lastInfo, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/appeal")
    public ResponseEntity<Appeal> postAppeal(@RequestBody FooterAppeal footerAppeal)
    {
        Appeal newAppeal = appealServices.create(footerAppeal);
        return new ResponseEntity<Appeal>(newAppeal ,HttpStatus.CREATED);
    }

}
