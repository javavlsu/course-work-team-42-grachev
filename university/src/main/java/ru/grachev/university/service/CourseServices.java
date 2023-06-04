package ru.grachev.university.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.grachev.university.model.*;
import ru.grachev.university.model.viewModel.CreateTestModel;
import ru.grachev.university.repository.*;

import java.time.LocalDate;
import java.util.*;

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

    public Test getTestById(String id) {
        return testRepository.findById(Long.valueOf(id)).get();
    }

    public int getTestGrade(HashMap<String, List<String>> test, String login) {
        var testId = test.get("testId").get(0);

        var DBTest = testRepository.findById(Long.valueOf(testId)).get();
        var student = studentRepository.findFirstByAccount_Login(login);

        var correctTest = new HashMap<String, List<String>>();

        int correctQuestionCount = 0;

        for (var question : DBTest.questions) {
            correctTest.put(question.id.toString(), new ArrayList<>());

            for (var answer : question.answers) {
                if (answer.isCorrect) {
                    correctTest.get(question.id.toString()).add(answer.id.toString());
                } else {
                    correctTest.get(question.id.toString()).add("");
                }
            }
            if (correctTest.get(question.id.toString()).equals(test.get(question.id.toString()))) {
                correctQuestionCount++;
            }
        }

        student.account.score += Math.round((float) correctQuestionCount / correctTest.size() * 100);
        DBTest.passedStudents.add(student);

        studentRepository.save(student);
        testRepository.save(DBTest);

        return student.account.score;

    }

    public Test addTestToCourse(CreateTestModel model) {
        var course = courseRepository.findById(model.courseId).get();

        var test = new Test(
                course,
                model.testTitle,
                new ArrayList<>(),
                new ArrayList<>(),
                model.endDate,
                model.isAvailable
        );

        var questions = new ArrayList<Question>();
        var answers = new ArrayList<Answer>();

        for (var question : model.questions) {
            var newQuestion = new Question(
                    test,
                    question.question,
                    new ArrayList<>()
            );

            questions.add(newQuestion);

            for (var answer : question.answers) {
                answers.add(new Answer(
                        newQuestion,
                        answer.text,
                        answer.isCorrect
                ));
            }
        }

        var newTest = testRepository.save(test);
        questionRepository.saveAll(questions);
        answerRepository.saveAll(answers);

        return testRepository.findById(newTest.id).get();

    }

    public List<Course> fillCourses() {
        List<Course> courses = Arrays.asList(
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
                ),
                new Test(
                        courses.get(1),
                        "Тестовый тест",
                        new ArrayList<>(),
                        new ArrayList<>(),
                        LocalDate.of(2023, 8, 7),
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
                ),
                new Question(
                        tests.get(2),
                        "Первый тестовый вопрос",
                        new ArrayList<>()
                ),
                new Question(
                        tests.get(2),
                        "Второй тестовый вопрос",
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
                new Answer(questions.get(3), "IDEF98", false),


                new Answer(questions.get(4), "Первый тестовый ответ", true),
                new Answer(questions.get(4), "Второй тестовый ответ", false),
                new Answer(questions.get(4), "Третий тестовый ответ", true),
                new Answer(questions.get(4), "Четвертый тестовый ответ", false),

                new Answer(questions.get(5), "Пятый тестовый ответ", true),
                new Answer(questions.get(5), "Шестой тестовый ответ", false),
                new Answer(questions.get(5), "Седьмой тестовый ответ", true),
                new Answer(questions.get(5), "Восьмой тестовый ответ", false)
        );

        courseRepository.saveAll(courses);
        testRepository.saveAll(tests);
        questionRepository.saveAll(questions);
        answerRepository.saveAll(answers);

        return courseRepository.findAll();
    }
}
