package ru.grachev.university.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ru.grachev.university.model.Course;
import ru.grachev.university.model.Test;
import ru.grachev.university.service.CourseServices;

import java.util.HashMap;
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
    public List<Course> getCourseToProfile() {
        return courseServices.getAllCoursesWithoutTests();
    }

    @GetMapping("{id}")
    public Course getCourseById(
            Authentication auth,
            @PathVariable String id
    ) {
        return auth.getName() == null
                ? courseServices.getCourseWithAvailableTest(id)
                : courseServices.getCourseWithAvailableTestWithStudent(id, auth.getName());
    }

    @GetMapping("test/{id}")
    public Test getTestById(@PathVariable String id) {
        return courseServices.getTestById(id);
    }

    @PostMapping("test")
    public int getTestGrade(@RequestBody HashMap<String, List<String>> test, Authentication auth) {
        return courseServices.getTestGrade(test, auth.getName());
    }

    @GetMapping("fillcourses")
    public List<Course> fillCourses() {
        return courseServices.fillCourses();
    }
}
