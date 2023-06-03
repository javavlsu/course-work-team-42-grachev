package ru.grachev.university.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.grachev.university.model.*;
import ru.grachev.university.repository.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class CourseServices {

  private final StudentRepository studentRepository;
  private final CourseRepository courseRepository;
  private final TestRepository testRepository;
  private final QuestionRepository questionRepository;
  private final AnswerRepository answerRepository;

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

  public List<Course> fillCourses() {
    List<Course> courses = new ArrayList<Course>(
      Arrays.asList(
        new Course(
          "Java",
          "Грачев",
          new ArrayList<Test>()
        ),
        new Course(
          "Case-технологии",
          "Грачевский",
          new ArrayList<Test>()
        )
      )
    );

    var tests = Arrays.asList(
      new Test(
        courses.get(0),
        "Типы данных",
        new ArrayList<>(),
        new ArrayList<>(),
        LocalDate.of(2023, 6, 5),
        true
      ),
      new Test(
        courses.get(1),
        "IDEF",
        new ArrayList<>(),
        new ArrayList<>(),
        LocalDate.of(2023, 7, 6),
        true
      )
    );

    var questions = Arrays.asList(
      new Question(
        tests.get(0),
        "Какие есть типы данных в Java?",
        new ArrayList<>()
      ),
      new Question(
        tests.get(0),
        "Какие есть фреймворки в Java?",
        new ArrayList<>()
      ),
      new Question(
        tests.get(1),
        "Какие типы стрелок есть на IDEF0?",
        new ArrayList<>()
      ),
      new Question(
        tests.get(1),
        "Какие типы IDEF существуют?",
        new ArrayList<>()
      )
    );

    var answers = Arrays.asList(
      new Answer(questions.get(0), "String", true),
      new Answer(questions.get(0), "Number", false),
      new Answer(questions.get(0), "ArrayList", true),
      new Answer(questions.get(0), "undefined", false),

      new Answer(questions.get(1), "Spring", true),
      new Answer(questions.get(1), "React", false),
      new Answer(questions.get(1), "Java EE", true),
      new Answer(questions.get(1), "ASP", false),

      new Answer(questions.get(2), "Управление", true),
      new Answer(questions.get(2), "Механизм", true),
      new Answer(questions.get(2), "Ассоциация", false),

      new Answer(questions.get(3), "IDEF0", true),
      new Answer(questions.get(3), "IDEF3", true),
      new Answer(questions.get(3), "IDEF98", false)
    );

    courseRepository.saveAll(courses);
    testRepository.saveAll(tests);
    questionRepository.saveAll(questions);
    answerRepository.saveAll(answers);

    return courseRepository.findAll();
  }
}
