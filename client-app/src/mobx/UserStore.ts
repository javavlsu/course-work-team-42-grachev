import { makeAutoObservable } from 'mobx'
import { type Account } from './store.types'

class UserStore {
  login: string = ''
  email: string = ''
  role: string = ''
  name: string = ''
  surname: string = ''
  patronymic: string = ''
  score: number = 0
  group: string = 'Не указано'
  department: string = 'Не указано'

  constructor () {
    makeAutoObservable(this)
  }

  fillStore (info: Account) {
    this.login = info.login
    this.email = info.email
    this.role = info.role
    this.name = info.name
    this.surname = info.surname
    this.patronymic = info.patronymic
    this.score = info.score
  }

  setStudentInfo (group: string, department: string) {
    this.group = group
    this.department = department
  }

  clear () {
    this.login = ''
    this.email = ''
    this.role = ''
    this.name = ''
    this.surname = ''
    this.patronymic = ''
    this.score = 0
  }
}

export default new UserStore()
