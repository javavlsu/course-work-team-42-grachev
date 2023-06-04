import { makeAutoObservable } from 'mobx'
import { type Question } from './store.types'
import axios from 'axios'

class TestStore {
  questions: Question[] = []

  courseId: number = -1

  endDate: Date = new Date()
  endDateString: string = ''
  isAvailable: boolean = true
  testTitle: string = ''

  constructor () {
    makeAutoObservable(this)
    this.endDate.setDate(this.endDate.getDate() + 10)
  }

  clear () {
    this.questions = []
    this.courseId = -1
  }

  setCourseId (courseID: string) {
    this.courseId = parseInt(courseID)
  }

  changeAnswerText (text: string, questionIndex: number, answerIndex: number) {
    this.questions[questionIndex].answers[answerIndex].text = text
  }

  changeAnswerChecked (checked: boolean, questionIndex: number, answerIndex: number) {
    this.questions[questionIndex].answers[answerIndex].isCorrect = checked
  }

  deleteAnswer (questionIndex: number, answerIndex: number) {
    this.questions[questionIndex].answers = this.questions[questionIndex].answers
      .filter((_, idx) => idx !== answerIndex)
  }

  createAnswer (questionIndex: number) {
    this.questions[questionIndex].answers.push({
      text: '',
      isCorrect: false
    })
  }

  changeQuestionText (text: string, questionIndex: number) {
    this.questions[questionIndex].question = text
  }

  createQuestion () {
    this.questions.push({
      question: '',
      answers: []
    })
  }

  deleteQuestion (questionIndex: number) {
    this.questions = this.questions.filter((_, idx) => idx !== questionIndex)
  }

  setDate (date: string) {
    this.endDate = new Date(date)
    this.endDateString = date
  }

  toggleIsAvailable () {
    this.isAvailable = !this.isAvailable
  }

  setTitle (title: string) {
    this.testTitle = title
  }

  saveTest () {
    axios.post('/api/courses/addtesttocourse', {
      questions: this.questions,
      courseId: this.courseId,
      isAvailable: this.isAvailable,
      endDate: this.endDate,
      testTitle: this.testTitle
    })
  }
}

export default new TestStore()
