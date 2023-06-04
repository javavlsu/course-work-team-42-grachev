import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  Paper,
  TextField
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import React, { type ChangeEvent, type FC, Fragment } from 'react'
import { type QuestionProps } from './Question.types'
import { TestStore } from '../../../../mobx'
import { observer } from 'mobx-react-lite'

const Question: FC<QuestionProps> = ({
  question,
  questionIndex
}) => {
  const changeAnswerText = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, answerIndex: number) => {
    TestStore.changeAnswerText(event.target.value, questionIndex, answerIndex)
  }

  const changeAnswerCorrect = (isChecked: boolean, answerIndex: number) => {
    TestStore.changeAnswerChecked(isChecked, questionIndex, answerIndex)
  }

  const deleteAnswer = (answerIndex: number) => {
    if (window.confirm('Вы уверены, что хотите удалить ответ?')) {
      TestStore.deleteAnswer(questionIndex, answerIndex)
    }
  }

  const createAnswer = () => {
    TestStore.createAnswer(questionIndex)
  }

  return (
    <Paper
      sx={{
        padding: '10px 20px',
        minHeight: 100
      }}
      elevation={4}
    >
      <Box>
        <FormGroup>
          {
            question.answers.map((item, idx) => (
              <Fragment key={idx}>
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked={item.isCorrect}
                      color={'success'}
                      onChange={(_, checked) => changeAnswerCorrect(checked, idx)}
                    />
                  }
                  label={item.text}
                  key={item.text}
                />
                <Box width={'100%'}>
                  <TextField
                    value={item.text}
                    size="small"
                    multiline
                    onChange={(event) => changeAnswerText(event, idx)}
                    sx={{ width: '95%' }}
                  />
                  <IconButton onClick={() => deleteAnswer(idx)}>
                    <DeleteIcon color="error"/>
                  </IconButton>
                </Box>
                <Box mt={2}>
                  <Divider/>
                </Box>
              </Fragment>
            ))
          }
        </FormGroup>
        <Button
          size="large"
          variant="outlined"
          sx={{
            width: '100%',
            height: 50,
            fontSize: 24,
            marginTop: 3,
            border: 'dashed 1px'
          }}
          onClick={createAnswer}
        >
          Добавить ответ
        </Button>
      </Box>
    </Paper>
  )
}

export default observer(Question)
