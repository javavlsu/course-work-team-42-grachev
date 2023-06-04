export type Account = {
  login: string
  email: string
  role: string
  name: string
  surname: string
  patronymic: string
  score: number
  group?: string
  department?: string
}

export type Question = {
  testId: number
  question: string
  answers: Answer[]
}

export type Answer = {
  questionId: number
  text: string
  isCorrect: boolean
}
