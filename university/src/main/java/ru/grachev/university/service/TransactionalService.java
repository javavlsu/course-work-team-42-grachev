package ru.grachev.university.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.grachev.university.model.Appeal;
import ru.grachev.university.model.ServicesInfo;
import ru.grachev.university.repository.AppealRepository;
import ru.grachev.university.repository.ServicesInfoRepository;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class TransactionalService {

    private final AppealRepository appealRepository;
    private final ServicesInfoRepository servicesInfoRepository;

    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public String createAppealForPass() {
        appealRepository.save(new Appeal("daniel","phoneNumber", "email"));
        return "too klass";
    }

    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public String createServiceInfoForPass2() {
        servicesInfoRepository.save(new ServicesInfo(LocalDate.now(), 101, 102, 103));
        return "too klass";
    }

    @Transactional
    public String createAppealForFail() {
        appealRepository.save(new Appeal("danielF","phoneNumberF", "emailF"));
        return "too klass";
    }

    @Transactional
    public String createServicesInfoForFail2() {
        servicesInfoRepository.save(new ServicesInfo(LocalDate.now(), 201, 202, 203));
        return "too klass";
    }

    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public String createAppealForFail3() {
        Appeal appeal = appealRepository.save(new Appeal("danielFFF","phoneNumberFFF", "emailFFF"));
        if (appeal != null) throw new RuntimeException("from service");
        return "too klass";
    }

    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public String createServicesInfoForPass3() {
        servicesInfoRepository.save(new ServicesInfo(LocalDate.now(), 301, 302, 303));
        return "too klass";
    }

    @Transactional
    public String createAppealForFail4() {
        Appeal appeal = appealRepository.save(new Appeal("danielFFFFFF","phoneNumberFFFFFF", "emailFFFFFF"));
        return "too klass";
    }

    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public String createServicesInfoForPass4() {
        servicesInfoRepository.save(new ServicesInfo(LocalDate.now(), 401, 402, 403));
        return "too klass";
    }

}
