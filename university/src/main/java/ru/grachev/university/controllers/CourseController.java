package ru.grachev.university.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.grachev.university.model.Course;
import ru.grachev.university.service.CourseServices;

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

    @GetMapping("fillcourses")
    public List<Course> fillCourses() {
        return courseServices.fillCourses();
    }
}
