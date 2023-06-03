import React from 'react'
import style from './StudentProfile.module.scss'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PATHS from '../../../data/paths'
import clsx from 'clsx'
import toRURoles from '../../../data/roles'
import { type SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import { randomCardColor } from '../../../util/randomCardColor'
import { useCoursesInProfile } from '../../../queries/Courses/coursesQueries'
import { UserStore } from '../../../mobx'
import { observer } from 'mobx-react-lite'
import { fetchAccountData } from '../../../util'

type UpdateFormTypes = {
  name: string
  surname: string
  patronymic: string
  email: string
  newPassword: string
  group: string
  department: string
}

const StudentProfile = () => {
  const navigate = useNavigate()
  const { login } = useParams()
  const isShowByLogin = login === UserStore.login
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
      <h1>{isShowByLogin ? 'Мой профиль' : 'Профиль'}</h1>
      <div className={style.main}>
        <div className={style.leftBlock}>
          <img src="/img/Profile/notIcon.webp" alt="лого" className={style.logo}/>
          <h3 className={style.name}>{UserStore.surname} {UserStore.name}</h3>
          <p className={style.email}>{UserStore.email}</p>
          <div className={style.score}>
            <div className={style.score__left}>
              <p className={style.score__title}>Очки</p>
              <p className={style.score__count}>{UserStore.score}</p>
            </div>
            <Link to={PATHS.SCORE_INFO} className={style.score__link}>Подробнее</Link>
          </div>
          {isShowByLogin &&
            <>
              <div className={style.pages}>
                <input type="radio" name="pages" id={style.desktop} className={style.pages__radio}
                       defaultChecked={true}/>
                <label htmlFor={style.desktop} className={style.pages__label} id={style.desktop_label}>Рабочий
                  стол</label>
                {(UserStore.role !== '' && UserStore.role !== 'user') &&
                  <>
                    <input type="radio" name="pages" id={style.course} className={style.pages__radio}/>
                    <label htmlFor={style.course} className={style.pages__label}
                           id={style.course_label}>Курсы</label>
                  </>
                }

                {UserStore.role !== '' &&
                  <><input type="radio" name="pages" id={style.settings}
                           className={style.pages__radio}/>
                    <label htmlFor={style.settings} className={style.pages__label}
                           id={style.settings_label}>Настройки</label>
                  </>}
              </div>
              <button className={style.exitButton} onClick={
                () => {
                  UserStore.clear()
                  navigate('/')
                }
              }>Выйти
              </button>
            </>
          }
        </div>
        <div className={style.rightBlock}>
          <div id={clsx(style.desktopTab, !isShowByLogin ? style.tabActive : '')}>
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
                  <td className={style.table__opr}>Группа:</td>
                  <td className={style.table__znach}>{UserStore.group}</td>
                </tr>
                <tr>
                  <td className={style.table__opr}>Кафедра:</td>
                  <td className={style.table__znach}>{UserStore.department}</td>
                </tr>
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
          {isShowByLogin && <>
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
                <h6>Информация о студенте</h6>
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
                      <td><label htmlFor="updateGroup">Группа</label></td>
                      <td>
                        <input type="text"
                               id="updateGroup"
                               className={style.input}
                               {...updateRegister('group')}
                               placeholder={'Группа'}
                               autoComplete={'off'}
                               defaultValue={UserStore.group !== 'Не указано'
                                 ? UserStore.group
                                 : undefined}/>
                      </td>
                    </tr>
                    <tr>
                      <td><label htmlFor="updateDepartment">Кафедра</label></td>
                      <td>
                        <input type="text"
                               id="updateDepartment"
                               className={style.input}
                               {...updateRegister('department')}
                               placeholder={'Кафедра'}
                               autoComplete={'off'}
                               defaultValue={UserStore.department !== 'Не указано'
                                 ? UserStore.department
                                 : undefined}/>
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
          </>}
        </div>
      </div>
    </>
  )
}

export default observer(StudentProfile)
