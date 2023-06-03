package ru.grachev.university.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.grachev.university.model.viewModel.UpdateAccount;

import java.time.LocalDate;
import java.util.Objects;

@Data
@Entity
@Table(name = "account")
@AllArgsConstructor
@NoArgsConstructor
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    public String login;
    public String password;
    public String email;
    public String role;
    public LocalDate registerDate;
    public String name;
    public String surname;
    public String patronymic;
    public Integer score;

    public Account(Account account) {
        this.login = account.login;
        this.password = account.password;
        this.email = account.email;
        this.registerDate = LocalDate.now();
        this.name = account.name;
        this.surname = account.surname;
        this.patronymic = account.patronymic;
        this.score = 0;
        this.role = "user";
    }

    public void updateInfo(UpdateAccount model) {
        this.name = model.name;
        this.surname = model.surname;
        this.patronymic = model.patronymic;
        if (!Objects.equals(model.newPassword, "")) {
            this.password = model.newPassword;
        }
        this.email = model.email;
    }
}
