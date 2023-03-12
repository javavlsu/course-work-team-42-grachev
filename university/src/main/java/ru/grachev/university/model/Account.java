package ru.grachev.university.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

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
    }
}
