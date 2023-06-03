import React from 'react'
import style from './Profile.module.scss'

import UserProfile from './UserProfile/UserProfile'
import AdminProfile from './AdminProfile/AdminProfile'
import { UserStore } from '../../mobx'
import { observer } from 'mobx-react-lite'
import StudentProfile from './StudentProfile/StudentProfile'

const Profile = () => {
  return (
    <div className={style.wrapper}>
      {(UserStore.role === 'user') && <UserProfile/>}
      {(UserStore.role === 'student') && <StudentProfile/>}
      {(UserStore.role === 'admin') && <AdminProfile/>}
    </div>
  )
}

export default observer(Profile)
