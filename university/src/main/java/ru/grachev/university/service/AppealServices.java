package ru.grachev.university.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import ru.grachev.university.model.Appeal;
import ru.grachev.university.repository.AppealRepository;

@Component
@RequiredArgsConstructor
public class AppealServices {

    private final AppealRepository appealRepository;

    /**
     * Создает новую заявку
     * @param footerAppeal заявка без времени и id из футера приложения
     * @return Созданная заявка {@link Appeal}
     */
    @Transactional
    public Appeal create(Appeal footerAppeal) {
        Appeal appeal = appealRepository.save(footerAppeal);

        if (appeal != null) {
            throw new RuntimeException("test Transactional");
        }
        return appeal;
    }
}
