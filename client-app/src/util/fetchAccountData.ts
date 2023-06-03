import axios from 'axios'
import { type Account, UserStore } from '../mobx'

const fetchAccountData = () => {
  axios.get<Account>('/api/account')
    .then(({ data }) => {
      UserStore.fillStore(data)
      if (UserStore.role === 'student') {
        axios.get<{ department: string, group: string }>('/api/student/getstudentinfo')
          .then(({ data }) => {
            UserStore.setStudentInfo(data.group, data.department)
          })
      }
    }).catch(() => {
      UserStore.clear()
    })
}

export default fetchAccountData
