package ru.grachev.university.model.viewModel;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UpdateAccount {
    public String name;
    public String surname;
    public String patronymic;
    public String newPassword;
    public String email;
}
