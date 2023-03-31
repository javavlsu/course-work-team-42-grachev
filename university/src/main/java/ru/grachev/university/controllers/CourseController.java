package ru.grachev.university.controllers;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.grachev.university.model.Course;
import ru.grachev.university.service.CourseServices;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseServices courseServices;

    @GetMapping
    public ResponseEntity<List<Course>> getCourse() {
        return ResponseEntity.ok(courseServices.getAllCourses());
    }

    @GetMapping("toprofilepage")
    public ResponseEntity<List<Course>> getCourseToProfile(HttpServletRequest request) {
        return ResponseEntity.ok(courseServices.getAllCoursesWithoutTests());
    }

    @GetMapping("{id}")
    public ResponseEntity<Course> getCourseById(
            @CookieValue(name = "login", required = false) String login,
            @PathVariable String id
    ) {
        if (login == null) {
            return ResponseEntity.ok(courseServices.getCourseWithAvailableTest(id));
        }
        return ResponseEntity.ok(courseServices.getCourseWithAvailableTestWithStudent(id, login));
    }
}
