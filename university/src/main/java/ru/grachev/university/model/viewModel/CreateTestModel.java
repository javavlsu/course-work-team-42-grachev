package ru.grachev.university.model.viewModel;

import java.time.LocalDate;

public class CreateTestModel {
    public CreateQuestion[] questions;
    public Long courseId;
    public boolean isAvailable;
    public LocalDate endDate;
    public String testTitle;
}

