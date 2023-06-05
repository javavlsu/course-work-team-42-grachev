import React, { useState } from 'react'
import style from './Course.module.scss'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useCoursesById } from '../../queries/Courses/coursesQueries'
import PATHS from '../../data/paths'
import { UserStore } from '../../mobx'
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  TextField
} from '@mui/material'
import clsx from 'clsx'
import axios from 'axios'

const Course = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: course } = useCoursesById(id as string)

  const [idTest, setIdTest] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [theme, setTheme] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isAvailable, setIsAvailable] = useState(true)

  React.useEffect(() => {
    if (UserStore.login === '') navigate('/')
  }, [])

  const toggleDialog = () => {
    setIsDialogOpen(prevState => !prevState)
  }

  const openDialog = (testIndex: number, testid: number) => {
    setIsDialogOpen(true)
    setIdTest(testid)
    const test = course?.tests[testIndex]
    if (test) {
      setTheme(test.theme)
      setEndDate(test.endDate)
      setIsAvailable(test.isAvailable)
    }
  }

  const onTestChangeSubmit = () => {
    axios.post('/api/courses/changetestinfo', {
      testId: idTest,
      theme,
      endDate: new Date(endDate),
      isAvailable
    })
    setIsDialogOpen(false)
  }

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.title}>
          <h1 className={style.title__title}>{course?.title}</h1>
          <p className={style.title__teacher}>{course?.teacher}</p>
        </div>
        <div className={style.main}>
          <ul className={style.testList}>
            {course?.tests.map((item, idx) => {
              return UserStore.role === 'teacher'
                ? (
                    <li className={clsx(style.testItem, 'greenCard')} key={item.id}>
                      <Button onClick={() => openDialog(idx, item.id)}>
                        {item.theme}
                      </Button>
                    </li>
                  )
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
      <Dialog open={isDialogOpen} onClose={toggleDialog}>
        <DialogTitle>Укажите данные для теста</DialogTitle>
        <DialogContent dividers>
          <FormGroup>
            <TextField
              label={'Название теста'}
              value={theme}
              size="small"
              multiline
              onChange={(event) => setTheme(event.target.value)}
              sx={{ marginBottom: 3 }}
            />
            <p>Дата окончания теста</p>
            <input
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isAvailable}
                  color={'success'}
                  onChange={() => setIsAvailable(prev => !prev)}
                />
              }
              label={'Доступен ли тест?'}
              sx={{ marginTop: 2 }}
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDialog}>ЗАКРЫТЬ</Button>
          <Button onClick={onTestChangeSubmit} variant="contained">СОХРАНИТЬ</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default Course
