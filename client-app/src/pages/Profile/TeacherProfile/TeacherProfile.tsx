import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserStore } from '../../../mobx'
import { useCoursesInProfile } from '../../../queries/Courses/coursesQueries'
import { type SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import { fetchAccountData } from '../../../util'
import style from './TeacherProfile.module.scss'
import PATHS from '../../../data/paths'
import clsx from 'clsx'
import toRURoles from '../../../data/roles'
import { randomCardColor } from '../../../util/randomCardColor'

type UpdateFormTypes = {
  name: string
  surname: string
  patronymic: string
  email: string
  newPassword: string
}

const TeacherProfile = () => {
  const navigate = useNavigate()
  const { data: coursesList } = useCoursesInProfile()

  const {
    register: updateRegister,
    handleSubmit: updateHandleSubmit
  } = useForm<UpdateFormTypes>()

  const onUpdateSubmit: SubmitHandler<UpdateFormTypes> = async (data) => {
    axios.post('/api/student/updatestudentinfo', { login: UserStore.login, ...data }).then(() => {
      fetchAccountData()
    })
  }

  return (
    <>
      <h1>Мой профиль</h1>
      <div className={style.main}>
        <div className={style.leftBlock}>
          <img src="/img/Profile/notIcon.webp" alt="лого" className={style.logo}/>
          <h3 className={style.name}>{UserStore.surname} {UserStore.name}</h3>
          <p className={style.email}>{UserStore.email}</p>

          <div className={style.pages}>
            <input type="radio" name="pages" id={style.desktop} className={style.pages__radio}
                   defaultChecked={true}/>
            <label
              htmlFor={style.desktop}
              className={style.pages__label}
              id={style.desktop_label}
            >
              Рабочий стол
            </label>

            <input type="radio" name="pages" id={style.course} className={style.pages__radio}/>
            <label htmlFor={style.course} className={style.pages__label}
                   id={style.course_label}>Курсы</label>

            <input type="radio" name="pages" id={style.settings}
                   className={style.pages__radio}/>
            <label htmlFor={style.settings} className={style.pages__label}
                   id={style.settings_label}>Настройки</label>
          </div>
          <button className={style.exitButton} onClick={
            () => {
              UserStore.clear()
              navigate('/')
            }
          }>Выйти
          </button>

        </div>
        <div className={style.rightBlock}>
          <div id={clsx(style.desktopTab)}>
            <p className={style.tab__title}>Общие сведения</p>
            <div className={style.tab__block}>
              <h4 className={style.tab__username}>
                {UserStore.surname} {UserStore.name} {UserStore.patronymic}
              </h4>
              <hr/>
              <h6>Основная информация</h6>
              {UserStore && <table>
                  <tbody>
                  <tr>
                      <td className={style.table__opr}>Почта:</td>
                      <td className={style.table__znach}>{UserStore.email}</td>
                  </tr>
                  <tr>
                      <td className={style.table__opr}>Роль:</td>
                      <td className={style.table__znach}>{toRURoles(UserStore.role)}</td>
                  </tr>
                  </tbody>
              </table>}
            </div>
          </div>
          <div id={style.courseTab}>
            {
              coursesList?.map((item) =>
                <Link to={`${PATHS.COURSE}/${item.id}`} key={`course${item.id}${item.title}`}>
                  <div className={clsx(randomCardColor(), style.courseCard)}>
                    <h3>{item.title}</h3>
                    <p>Преподаватель: {item.teacher}</p>
                  </div>
                </Link>)
            }
          </div>
          <div id={style.settingsTab}>
            <p className={style.tab__title}>Настройки</p>
            <div className={style.tab__block}>
              <h4 className={style.tab__username}>
                {UserStore.surname} {UserStore.name} {UserStore.patronymic}
              </h4>
              <hr/>
              <h6>Информация о преподавателе</h6>
              <form onSubmit={updateHandleSubmit(onUpdateSubmit)}>
                <table>
                  <tbody>
                  <tr>
                    <td><label htmlFor="updateName">Имя</label></td>
                    <td>
                      <input type="text"
                             id="updateName"
                             className={style.input}
                             {...updateRegister('name')}
                             placeholder={'Имя'}
                             autoComplete={'off'}
                             defaultValue={UserStore.name}/>
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor="updateSurname">Фамилия</label></td>
                    <td>
                      <input type="text"
                             id="updateSurname"
                             className={style.input}
                             {...updateRegister('surname')}
                             placeholder={'Фамилия'}
                             autoComplete={'off'}
                             defaultValue={UserStore.surname}/>
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor="updatePatronymic">Отчество</label></td>
                    <td>
                      <input type="text"
                             id="updatePatronymic"
                             className={style.input}
                             {...updateRegister('patronymic')}
                             placeholder={'Отчество'}
                             autoComplete={'off'}
                             defaultValue={UserStore.patronymic}/>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <hr/>
                      <h6>Информация об аккаунте</h6>
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor="updateEmail">Почта</label></td>
                    <td>
                      <input type="text"
                             id="updateEmail"
                             className={style.input}
                             {...updateRegister('email')}
                             placeholder={'Почта'}
                             autoComplete={'off'}
                             defaultValue={UserStore.email}/>
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor="updatePassword">Новый пароль</label></td>
                    <td>
                      <input type="text"
                             id="updatePassword"
                             className={style.input}
                             {...updateRegister('newPassword')}
                             placeholder={'Пароль'}
                             autoComplete={'off'}
                      />
                    </td>
                  </tr>

                  </tbody>
                </table>
                <button type="submit" className={style.submit}>Сохранить</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TeacherProfile
