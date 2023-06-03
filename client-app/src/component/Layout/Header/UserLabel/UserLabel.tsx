import React from 'react'
import style from './UserLabel.module.scss'
import PATHS from '../../../../data/paths'
import ProfileIcon from '../../../SvgIcons/ProfileIcon'
import { Link } from 'react-router-dom'
import { UserStore } from '../../../../mobx'
import { observer } from 'mobx-react-lite'

const UserLabel = () => {
  const [userStyle, setUserStyle] = React.useState<string>('')

  React.useEffect(() => {
    switch (UserStore.role) {
      case 'student':
        setUserStyle(style.student)
        break
      case 'teacher':
        setUserStyle(style.teacher)
        break
      case 'admin':
        setUserStyle(style.admin)
        break
      default:
        setUserStyle('')
        break
    }
  }, [UserStore.role])

  return (
    <>
      {(UserStore.name !== '')
        ? <Link to={`${PATHS.PROFILE}/${UserStore.login}`} className={style.user}>
          <ProfileIcon className={style.icon}/>
          <span className={userStyle}>{
            UserStore.role === 'admin'
              ? 'ADMIN'.split('').map((item, idx) => <span key={idx}>{item}</span>)
              : UserStore.name
          }</span>
        </Link>
        : <Link to={PATHS.LOGIN}>
          <ProfileIcon className={style.icon}/>
          <span>Войти</span>
        </Link>
      }

    </>
  )
}

export default observer(UserLabel)
