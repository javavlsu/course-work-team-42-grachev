package ru.grachev.university.model.viewModel;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class UpdateUserViewModel {
    public String name;
    public String surname;
    public String patronomic;
    public String login;
    public String newPassword;
    public String email;
    public String group;
    public String departament;
}
