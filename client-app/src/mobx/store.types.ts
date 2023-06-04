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
  question: string
  answers: Answer[]
}

export type Answer = {
  text: string
  isCorrect: boolean
}
