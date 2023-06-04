import React, { useEffect } from 'react'
import style from './Profile.module.scss'

import UserProfile from './UserProfile/UserProfile'
import AdminProfile from './AdminProfile/AdminProfile'
import { UserStore } from '../../mobx'
import { observer } from 'mobx-react-lite'
import StudentProfile from './StudentProfile/StudentProfile'
import { fetchAccountData } from '../../util'
import TeacherProfile from './TeacherProfile/TeacherProfile'
import { useParams } from 'react-router-dom'

const Profile = () => {
  const { login } = useParams()

  useEffect(() => {
    fetchAccountData()
  }, [])

  if (UserStore.login !== login) {
    return (
      <div className={style.wrapper}>
        <UserProfile/>
      </div>
    )
  }

  return (
    <div className={style.wrapper}>
      {(UserStore.role === 'user' || UserStore.role === '') && <UserProfile/>}
      {(UserStore.role === 'student') && <StudentProfile/>}
      {(UserStore.role === 'teacher') && <TeacherProfile/>}
      {(UserStore.role === 'admin') && <AdminProfile/>}
    </div>
  )
}

export default observer(Profile)
