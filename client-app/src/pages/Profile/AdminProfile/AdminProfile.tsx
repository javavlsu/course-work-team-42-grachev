import React from 'react'
import style from './AdminProfile.module.scss'
import { useNavigate } from 'react-router-dom'
import { AccountGrid } from './components'
import { UserStore } from '../../../mobx'

const AdminProfile = () => {
  const navigate = useNavigate()

  const exit = () => {
    UserStore.clear()
    navigate('/')
  }

  return (
    <div>
      <button className={style.exitButton} onClick={exit}>Выйти</button>
      <AccountGrid/>
    </div>
  )
}

export default AdminProfile
