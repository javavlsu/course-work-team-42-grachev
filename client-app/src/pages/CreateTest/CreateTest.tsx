import React, { type ChangeEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
  IconButton,
  Paper,
  TextField
} from '@mui/material'
import { TestStore } from '../../mobx'
import { Question } from './components'
import { observer } from 'mobx-react-lite'
import DeleteIcon from '@mui/icons-material/Delete'

const CreateTest = () => {
  const { courseid } = useParams()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (courseid && TestStore.courseId.toString() !== courseid) {
      TestStore.clear()
      TestStore.setCourseId(courseid)
    }
  }, [courseid])

  const createQuestion = () => {
    TestStore.createQuestion()
  }

  const changeQuestionText = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, questionIndex: number) => {
    TestStore.changeQuestionText(event.target.value, questionIndex)
  }

  const deleteQuestion = (questionIndex: number) => {
    if (window.confirm('Вы уверены, что хотите удалить вопрос?')) {
      TestStore.deleteQuestion(questionIndex)
    }
  }

  const toggleDialog = () => {
    setIsDialogOpen(prevState => !prevState)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  const onTestSubmit = () => {
    TestStore.saveTest()
    setIsDialogOpen(false)
    navigate('/')
  }

  const onDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    TestStore.setDate(event.target.value)
  }

  const onAvailableChange = () => {
    TestStore.toggleIsAvailable()
  }

  return (
    <>
      <Box
        sx={{
          margin: '0 auto',
          width: 900,
          padding: '20px 0'
        }}>

        {
          TestStore.questions.map((item, idx) => (
            <Paper
              elevation={4}
              key={idx}
              sx={{
                padding: '20px',
                marginBottom: 3
              }}
            >
              <Box component={'h3'} fontWeight={600} minHeight={23}>
                {item.question}
              </Box>
              <Box width={'100%'} mb={2}>
                <TextField
                  value={item.question}
                  size="small"
                  multiline
                  onChange={(event) => changeQuestionText(event, idx)}
                  sx={{ width: '95%' }}
                />
                <IconButton onClick={() => deleteQuestion(idx)}>
                  <DeleteIcon color="error"/>
                </IconButton>
              </Box>
              <Question question={item} questionIndex={idx}/>
            </Paper>
          ))
        }

        <Button
          size="large"
          variant="outlined"
          sx={{
            width: '100%',
            height: 100,
            fontSize: 32,
            fontWeight: 600,
            marginTop: 3,
            border: 'dashed 1px'
          }}
          onClick={createQuestion}
        >
          Добавить вопрос
        </Button>
        <Box mt={5} textAlign={'right'}>
          <Button
            size="large"
            variant="contained"
            color="success"
            onClick={toggleDialog}
          >
            Сохранить
          </Button>
        </Box>
      </Box>
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>Укажите данные для теста</DialogTitle>
        <DialogContent dividers>
          <FormGroup>
            <TextField
              label={'Название теста'}
              value={TestStore.testTitle}
              size="small"
              multiline
              onChange={(event) => TestStore.setTitle(event.target.value)}
              sx={{ marginBottom: 3 }}
            />
            <p>Дата окончания теста</p>
            <input
              type="date"
              value={TestStore.endDateString}
              onChange={(event) => onDateChange(event)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={TestStore.isAvailable}
                  color={'success'}
                  onChange={onAvailableChange}
                />
              }
              label={'Доступен ли тест?'}
              sx={{ marginTop: 2 }}
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>ЗАКРЫТЬ</Button>
          <Button onClick={onTestSubmit} variant="contained">СОХРАНИТЬ</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default observer(CreateTest)
