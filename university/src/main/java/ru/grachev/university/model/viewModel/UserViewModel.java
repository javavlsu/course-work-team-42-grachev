package ru.grachev.university.model.viewModel;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class UserViewModel {
    public String name;
    public String surname;
    public String patronomic;
    public String login;
    public String email;
    public String group;
    public String departament;
    public String role;
    public Integer score;
}

//TODO: исправить отчество и департамент(на фронте тоже)