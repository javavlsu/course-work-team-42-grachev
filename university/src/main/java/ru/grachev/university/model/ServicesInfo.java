package ru.grachev.university.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "services-info")
@AllArgsConstructor
@NoArgsConstructor
public class ServicesInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    public LocalDate openDoorsDate;
    public int programsCount;
    public int teachersCount;
    public int graduatesCount;
}
