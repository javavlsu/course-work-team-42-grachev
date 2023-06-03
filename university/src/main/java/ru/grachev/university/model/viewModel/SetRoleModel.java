package ru.grachev.university.model.viewModel;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SetRoleModel {
    public String login;
    public String role;
    public String group;
    public String department;
}
