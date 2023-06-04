import { makeAutoObservable } from 'mobx'
import { type Question } from './store.types'

class TestStore {
  questions: Question[] = []

  constructor () {
    makeAutoObservable(this)
  }
}

export default new TestStore()
