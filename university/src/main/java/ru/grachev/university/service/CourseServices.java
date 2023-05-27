package ru.grachev.university.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.grachev.university.model.Course;
import ru.grachev.university.model.Student;
import ru.grachev.university.model.Test;
import ru.grachev.university.repository.CourseRepository;
import ru.grachev.university.repository.StudentRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class CourseServices {

    private final CourseRepository courseRepository;
    private final StudentRepository studentRepository;

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public List<Course> getAllCoursesWithoutTests() {
        return courseRepository.findAll().stream().peek(course -> course.tests = null).toList();
    }

    public Course getCourseWithAvailableTest(String id) {
        Course course = courseRepository.findFirstById(id);
        course.tests = course.tests.stream().filter(test -> test.endDate.isAfter(LocalDate.now()) && test.isAvailable).toList();
        return course;
    }

    public Course getCourseWithAvailableTestWithStudent(String id, String login) {
        Student student = studentRepository.findFirstByAccount_Login(login);
        Course course = courseRepository.findFirstById(id);
        course.tests = course.tests
                .stream()
                .filter(test -> test.endDate.isAfter(LocalDate.now())
                        && test.isAvailable
                        && test.passedStudents.stream().noneMatch(s -> Objects.equals(s.id, student.id))
                ).toList();
        return course;
    }
}
