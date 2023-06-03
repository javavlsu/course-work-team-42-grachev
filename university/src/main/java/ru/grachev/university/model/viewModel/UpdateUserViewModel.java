package ru.grachev.university.model.viewModel;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UpdateUserViewModel {
    public String name;
    public String surname;
    public String patronymic;
    public String login;
    public String newPassword;
    public String email;
    public String group;
    public String department;
}
