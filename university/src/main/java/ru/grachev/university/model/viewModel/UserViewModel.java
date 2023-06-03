package ru.grachev.university.model.viewModel;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserViewModel {
    public String login;
    public String email;
    public String role;
    public String name;
    public String surname;
    public String patronymic;
    public Integer score;
    public String group;
    public String department;
}
