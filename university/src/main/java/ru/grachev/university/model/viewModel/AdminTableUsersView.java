package ru.grachev.university.model.viewModel;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class AdminTableUsersView {

    public String login;
    public LocalDate registerDate;
}
