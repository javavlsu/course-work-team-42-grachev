import React from 'react'
import style from './Course.module.scss'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useCoursesById } from '../../queries/Courses/coursesQueries'
import PATHS from '../../data/paths'
import { UserStore } from '../../mobx'
import { Box, Button } from '@mui/material'
import clsx from 'clsx'

const Course = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: course } = useCoursesById(id as string)

  React.useEffect(() => {
    if (UserStore.login === '') navigate('/')
  }, [])

  return (
    <div className={style.wrapper}>
      <div className={style.title}>
        <h1 className={style.title__title}>{course?.title}</h1>
        <p className={style.title__teacher}>{course?.teacher}</p>
      </div>
      <div className={style.main}>
        <ul className={style.testList}>
          {course?.tests.map((item) => {
              return UserStore.role === 'teacher'
                ? <Button>{item.theme}</Button>
                : (
                  <li className={clsx(style.testItem, 'greenCard')} key={item.id}>
                    <Link to={`${PATHS.TESTS}/${item.id}`} key={`test${item.id}${item.theme}`}>
                      {item.theme}
                    </Link>
                  </li>
                )
            }
          )}
          {
            UserStore.role === 'teacher' && (
              <Box margin={'0 auto'} width={'100%'}>
                <Link to={`${PATHS.TESTS}/new/${id as string}`}>
                  <Button
                    size="large"
                    variant="outlined"
                    sx={{
                      width: '100%',
                      fontSize: 32,
                      fontWeight: 600,
                      marginTop: 3,
                      border: 'dashed 1px'
                    }}
                  >
                    Добавить тест
                  </Button>
                </Link>
              </Box>
            )
          }
        </ul>
      </div>
    </div>
  )
}
export default Course
