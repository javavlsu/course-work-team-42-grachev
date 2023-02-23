package ru.grachev.university.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.grachev.university.model.Appeal;
import ru.grachev.university.model.viewModel.FooterAppeal;
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
    public Appeal create(FooterAppeal footerAppeal) {
        Appeal newAppeal = new Appeal(footerAppeal.name, footerAppeal.phoneNumber, footerAppeal.email);
        appealRepository.save(newAppeal);
        return newAppeal;
    }
}
