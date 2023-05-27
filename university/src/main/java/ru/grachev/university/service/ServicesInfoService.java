package ru.grachev.university.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.grachev.university.model.ServicesInfo;
import ru.grachev.university.repository.ServicesInfoRepository;

@Component
@RequiredArgsConstructor
public class ServicesInfoService {

    private final ServicesInfoRepository servicesInfoRepository;

    /**
     * Ищет последнюю запись сервисной информации сортируя по id
     * @return {@link ru.grachev.university.model.ServicesInfo}
     */
    public ServicesInfo getLastInfo() {
        return servicesInfoRepository.findFirstByOrderByIdDesc();
    }
}
